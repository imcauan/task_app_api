import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/Prisma.service';
import { CryptoService } from '@/infra/crypto/Crypto.service';
import { CreateUserDto } from '@/modules/user/dtos/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dtos/update-user.dto';
import { CreateUserByInviteDto } from '@/modules/user/dtos/create-user-by-invite.dto';
import { UpdateStripeDto } from '@/modules/user/dtos/update-stripe.dto';
import { WorkspaceService } from '../workspace/workspace.service';
import { WorkspacePriority } from '@/modules/workspace/enums/workspace-priority.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await this.cryptoService.hash(data.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword,
        },
      });

      await this.workspaceService.create({
        name: `${user.name} personal.`,
        priority: WorkspacePriority.LOW,
        userId: user.id,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createUserByInvite(data: CreateUserByInviteDto) {
    await this.exists(data.email);

    const hashedPassword = await this.cryptoService.hash(data.password);

    try {
      await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword,
          workspaces: {
            connect: {
              id: data.workspaceId,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          workspaces: {
            include: {
              members: true,
              columns: true,
            },
          },
          chats: {
            include: {
              members: true,
              messages: true,
            },
          },
          tasks: true,
          columns: {
            include: {
              tasks: {
                include: {
                  members: true,
                },
              },
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email },
        include: {
          tasks: true,
          workspaces: {
            include: {
              columns: true,
              members: true,
            },
          },
          chats: {
            include: {
              members: true,
              messages: true,
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      return user;
    } catch (error) {
      console.error(error);
      // throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async exists(email: string) {
    const userExists = await this.prisma.user.count({
      where: { email },
    });

    if (userExists > 0) {
      return true;
    }

    return false;
  }

  async update(id: string, { email, name, password }: UpdateUserDto) {
    const user = await this.findOne(id);
    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          email: email || user.email,
          name: name || user.name,
          password: password || user.password,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updatePassword(id: string, password: string) {
    const user = await this.findOne(id);
    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: await this.cryptoService.hash(password),
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateStripeData(data: UpdateStripeDto) {
    try {
      return this.prisma.user.update({
        where: { email: data.email },
        data: {
          stripeCustomerId: data.stripeCustomerId,
          stripeSubscriptionId: data.stripeSubscriptionId,
          stripePriceId: data.stripePriceId,
          stripeSubscriptionStatus: data.stripeSubscriptionStatus,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: string) {
    const user = await this.findOne(id);

    try {
      await this.prisma.user.delete({ where: { id: user.id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
