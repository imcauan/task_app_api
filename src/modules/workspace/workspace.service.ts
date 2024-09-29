import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/Prisma.service';
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
import { UpdateWorkspaceDto } from './dtos/update-workspace.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create({ name, userId }: CreateWorkspaceDto) {
    if (await this.exists(name)) {
      throw new ConflictException('This workspace already exists!');
    }

    try {
      await this.prisma.workspace.create({
        data: {
          name: name,
          owner_id: userId,
          members: {
            connect: [{ id: userId }],
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.workspace.findUnique({
        where: { id },
        include: {
          members: true,
          tasks: {
            where: {
              workspaceId: id,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUserWorkspaces(id: string) {
    await this.userService.exists(id);

    try {
      await this.prisma.workspace.findMany({
        where: {
          OR: [
            { owner_id: id },
            {
              members: {
                some: {
                  id,
                },
              },
            },
          ],
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.workspace.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, { name, ...rest }: UpdateWorkspaceDto) {
    if (!(await this.exists(name))) {
      return null;
    }

    try {
      await this.prisma.workspace.update({
        where: { id },
        data: {
          ...rest,
          name: name,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: string) {
    if (!(await this.exists(id))) {
      return null;
    }

    try {
      await this.prisma.workspace.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async exists(id: string) {
    if (
      (await this.prisma.workspace.count({
        where: {
          id,
        },
      })) > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
