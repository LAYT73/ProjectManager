import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entities/project.entity';
import { ProjectStatus } from 'src/project_status/entities/project_status.entity';
import { ProjectStatusService } from 'src/project_status/project_status.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Project, ProjectStatus])],
  providers: [AuthService, UserService, ProjectService, ProjectStatusService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
