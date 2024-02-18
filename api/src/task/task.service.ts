import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async createTask(
        projectId: number,
        name: string,
        order: number | null,
    ): Promise<Task> {
        const task = await this.taskRepository.create({
            projectId,
            name,
            order,
        });
        return this.taskRepository.save(task);
    }

    async getTasks(projectId: number) {
        return await this.taskRepository.find({
            where: {
                projectId: projectId,
            }
        })
    }

    async getTask(projectId: number, taskId: number) {
        return await this.taskRepository.findOne({
            where: {
                projectId,
                id: taskId,
            }
        })
    }

    async setChecked(checked: boolean, id: number) {
        return await this.taskRepository
            .createQueryBuilder()
            .update(Task)
            .set({ checked: checked })
            .where('id = :id', { id: id })
            .execute();
    }
}
