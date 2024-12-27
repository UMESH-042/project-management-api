import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: { email: string; password: string; name: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateUser(params: {
    where: { id: string };
    data: { name?: string; email?: string; password?: string };
  }) {
    return this.prisma.user.update(params);
  }

  async deleteUser(where: { id: string }) {
    return this.prisma.user.delete({
      where
    });
  }
}

