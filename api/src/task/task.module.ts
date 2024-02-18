import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { ProjectStatus } from 'src/project_status/entities/project_status.entity';
import { ProjectStatusService } from 'src/project_status/project_status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Project, ProjectStatus])],
  providers: [TaskService, UserService, ProjectService, ProjectStatusService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
