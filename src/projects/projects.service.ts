import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(data: any) {
    return this.prisma.project.create({ data });
  }

  async findAll() {
    return this.prisma.project.findMany();
  }

  async updateProject(params: {
    where: { id: string };
    data: any;
  }) {
    return this.prisma.project.update(params);
  }

  async deleteProject(where: { id: string }) {
    return this.prisma.project.delete({ where });
  }
}

