import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ProjectStatusService } from 'src/project_status/project_status.service';
import { ProjectStatus } from 'src/project_status/entities/project_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, ProjectStatus])],
  providers: [ProjectService, UserService, ProjectStatusService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
