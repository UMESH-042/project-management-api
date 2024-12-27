import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(
    @Body() projectData: { name: string; description: string; userId: string }
  ) {
    return this.projectsService.createProject({
      name: projectData.name,
      description: projectData.description,
      user: {
        connect: { id: projectData.userId }
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProjects() {
    return this.projectsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() projectData: {
      name?: string;
      description?: string;
      status?: 'PLANNED' | 'ONGOING' | 'COMPLETED';
    }
  ) {
    return this.projectsService.updateProject({
      where: { id },
      data: projectData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject({ id });
  }
}

