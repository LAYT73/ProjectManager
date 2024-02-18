import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';

@Injectable()
export class FolderService {
    constructor(
        @InjectRepository(Folder)
        private readonly folderRepository: Repository<Folder>,
    ) {}

    async getFoldersByOwnerId(ownerId: number) {
        return await this.folderRepository.find({
            where: {
                ownerId
            }
        })
    }

    async createFolder(
        ownerId: number,
        name: string,
        visibility: string,
    ): Promise<Folder> {
        const folder = await this.folderRepository.create({
            ownerId,
            name,
            visibility,
        });
        return await this.folderRepository.save(folder);
    }

}
