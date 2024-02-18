import { Module } from '@nestjs/common';
import { ProjectStatusController } from './project_status.controller';
import { ProjectStatusService } from './project_status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectStatus } from './entities/project_status.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectStatus, User, Project])],
  controllers: [ProjectStatusController],
  providers: [ProjectStatusService, UserService, ProjectService],
  exports: [ProjectStatusService],
})
export class ProjectStatusModule {}
