import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import fetch from 'node-fetch';
import { ProjectStatusService } from 'src/project_status/project_status.service';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,

        private readonly projectStatusService: ProjectStatusService,
    ) {}
    
    async createProject(
        owner_id: number,
        title: string,
        folderId: number,
        visibility: string,
    ): Promise<Project> {
        const project = await this.projectRepository.create({
            owner_id,
            title,
            folderId,
            visibility,
        });
        const saveProject = await this.projectRepository.save(project);
        await this.projectStatusService.createProjectStatus(saveProject.id, 1, null, null, 3);
        return saveProject;
    }
    
    async getProjectsByOwnerId(owner_id: number) {
        const project = await this.projectRepository.find({
            where: {
                owner_id: owner_id
            }
        });
        return project;
    }

    async getProjectById(id: number, userId: number): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: {
                id: id,
                owner_id: userId,
            }
        })
        project['statuses'] = await this.projectStatusService.getProjectStatus(project.id);
        return project;
    }
}