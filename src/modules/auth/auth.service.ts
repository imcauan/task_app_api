import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '@/infra/prisma/Prisma.service';
import { AuthLoginDto } from '@/modules/auth/dtos/auth-login.dto';
import { JwtService } from '@/infra/jwt/Jwt.service';
import { CryptoService } from '@/infra/crypto/Crypto.service';
import { AuthRegisterDto } from '@/modules/auth/dtos/auth-register.dto';
import { AuthPayloadDto } from '@/infra/jwt/dtos/auth-payload.dto';
import { UserService } from '@/modules/user/user.service';
import { StripeService } from '@/modules/stripe/stripe.service';
import { config } from '@/modules/stripe/config';
import { ForgotPasswordDto } from '@/modules/auth/dtos/forgot-password.dto';
import { MailService } from '@/modules/mail/mail.service';
import { ResetPasswordDto } from '@/modules/auth/dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly PrismaClient: PrismaService,
    private readonly JWTService: JwtService,
    private readonly CryptoService: CryptoService,
    private readonly userService: UserService,
    private readonly stripeService: StripeService,
    private readonly mailService: MailService,
  ) {}

  async register(data: AuthRegisterDto) {
    if (await this.userService.exists(data.email))
      throw new ConflictException('An user with this email already exists!');

    await this.userService.create(data);

    const createdStripeCustomer = await this.stripeService.createStripeCustomer(
      {
        email: data.email,
      },
    );

    const customerSubscription =
      await this.stripeService.getCustomerSubscription(
        createdStripeCustomer.id,
      );

    await this.stripeService.updateStripeData({
      email: createdStripeCustomer.email,
      stripeCustomerId: createdStripeCustomer.id,
      stripeSubscriptionId: customerSubscription.data[0].id,
      stripePriceId: config.stripe.plans.free.priceId,
      stripeSubscriptionStatus: customerSubscription.data[0].status,
    });

    return this.login(data);
  }

  async registerUserByInvite(data: AuthRegisterDto) {
    const user = await this.userService.findByEmail(data.email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    await this.userService.createUserByInvite({
      email: data.email,
      name: data.name,
      password: data.password,
      workspaceId: data.workspaceId,
    });

    return this.login({ email: data.email, password: data.password });
  }

  async login(data: AuthLoginDto) {
    const user = await this.PrismaClient.user.findFirst({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('Email or password might be wrong');
    }

    const passwordMatches = await this.CryptoService.compare(
      data.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Email or password might be wrong');
    }

    const token = await this.JWTService.sign<AuthPayloadDto>(
      {
        id: user.id,
      },
      '1h',
    );

    return {
      token: token,
    };
  }

  async sendEmailForgetPassword(data: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = await this.JWTService.sign<AuthPayloadDto>(
      {
        id: user.id,
      },
      '1h',
    );

    await this.mailService.sendEmailForgotPassword({
      email: user.email,
      token: token,
    });
  }

  async reset(data: ResetPasswordDto) {
    try {
      const verifiedToken = await this.JWTService.verify<{ id: string }>(
        data.token,
      );

      const user = await this.userService.findOne(verifiedToken.id);

      await this.userService.updatePassword(user.id, data.password);

      return this.login({
        email: user.email,
        password: data.password,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  checkToken(token: string) {
    try {
      const data = this.JWTService.verify<AuthPayloadDto>(token);

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
