import { Injectable } from '@nestjs/common';
import { ProjectStatus } from './entities/project_status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectStatusService {
    constructor(
        @InjectRepository(ProjectStatus)
        private readonly projectStatusRepository: Repository<ProjectStatus>,
    ) {}
    
    async createProjectStatus(
        projectId: number,
        status: number,
        startDate: Date,
        endDate: Date,
        priority: number,
    ): Promise<ProjectStatus> {
        const projectStatus = await this.projectStatusRepository.create({
            projectId,
            status,
            startDate,
            endDate,
            priority,
        });
        return this.projectStatusRepository.save(projectStatus);
    }
    
    async getProjectStatus(id:number): Promise<ProjectStatus> {
        return await this.projectStatusRepository.findOne({
            where: {
                projectId: id,
            }
        })
    }

    async setStatus(status: number, projectId: number) {
        return await this.projectStatusRepository
            .createQueryBuilder()
            .update(ProjectStatus)
            .set({ status: status })
            .where('projectId = :projectId', { projectId: projectId })
            .execute();
    }

    async setDate(startDate: Date, endDate: Date, projectId: number) {
        return await this.projectStatusRepository
            .createQueryBuilder()
            .update(ProjectStatus)
            .set({ startDate: startDate, endDate: endDate })
            .where('projectId = :projectId', { projectId: projectId })
            .execute();
    }
    
    async setPriority(priority: number, projectId: number) {
        return await this.projectStatusRepository
            .createQueryBuilder()
            .update(ProjectStatus)
            .set({ priority: priority })
            .where('projectId = :projectId', { projectId: projectId })
            .execute();
    }
}
