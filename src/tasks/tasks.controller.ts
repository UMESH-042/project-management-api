import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasks(
    @Query('status') status?: 'TODO' | 'IN_PROGRESS' | 'DONE',
    @Query('assignedUserId') assignedUserId?: string,
  ) {
    return this.tasksService.findAll({ status, assignedUserId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('projects/:projectId/tasks')
  async getProjectTasks(
    @Param('projectId') projectId: string,
    @Query('status') status?: 'TODO' | 'IN_PROGRESS' | 'DONE'
  ) {
    return this.tasksService.findByProject(projectId, status);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(
    @Body() taskData: {
      title: string;
      description: string;
      projectId: string;
      assignedUserId: string;
    }
  ) {
    return this.tasksService.createTask({
      title: taskData.title,
      description: taskData.description,
      project: {
        connect: { id: taskData.projectId }
      },
      assignedUser: {
        connect: { id: taskData.assignedUserId }
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: {
      title?: string;
      description?: string;
      status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
      assignedUserId?: string;
    }
  ) {
    const data = { ...taskData };
    if (taskData.assignedUserId) {
      data['assignedUser'] = {
        connect: { id: taskData.assignedUserId }
      };
      delete data.assignedUserId;
    }
    return this.tasksService.updateTask({
      where: { id },
      data
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask({ id });
  }
}

