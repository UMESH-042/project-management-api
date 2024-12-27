import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: any) {
    return this.prisma.task.create({ data });
  }

  async updateTask(params: {
    where: { id: string };
    data: any;
  }) {
    return this.prisma.task.update(params);
  }

  async deleteTask(where: { id: string }) {
    return this.prisma.task.delete({ where });
  }

  async findAll(params: { status?: string; assignedUserId?: string }) {
    const where: any = {};
    if (params.status) where.status = params.status;
    if (params.assignedUserId) where.assignedUserId = params.assignedUserId;
    
    return this.prisma.task.findMany({
      where,
      include: {
        project: true,
        assignedUser: true
      }
    });
  }

  async findByProject(projectId: string, status?: string) {
    const where: any = { projectId };
    if (status) where.status = status;
    
    return this.prisma.task.findMany({
      where,
      include: {
        assignedUser: true
      }
    });
  }
}

