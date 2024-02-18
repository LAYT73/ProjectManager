import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ProjectStatusService } from './project_status.service';
import { sign, verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { ProjectService } from 'src/project/project.service';

@Controller('project-status')
export class ProjectStatusController {
    constructor(
        private readonly projectStatusService: ProjectStatusService,
        private readonly userService: UserService,
        private readonly projectService: ProjectService,

        ) {}

    @Get('/:id')
    async getStatuses(@Param() params) {
        return await this.projectStatusService.getProjectStatus(params.id);
    }

    @Put('/status/:id')
    async changeStatus(@Body() body, @Param() params) {
        const decoded = verify(body.accessToken, '7A125D673E2D5E29');
        if (typeof decoded === 'string') {return undefined;}
        const user = await this.userService.findByEmail(decoded.email);
        
        const project = await this.projectService.getProjectById(+params.id, user.id);
        console.log(project, user, params);
        
        if (project) {   
            return await this.projectStatusService.setStatus(+body.status, +project.id);
        }
    }

    @Put('/date/:id')
    async changeDate(@Body() body, @Param() params) {
        const decoded = verify(body.accessToken, '7A125D673E2D5E29');
        if (typeof decoded === 'string') {return undefined;}
        const user = await this.userService.findByEmail(decoded.email);
        const project = await this.projectService.getProjectById(params.id, user.id);

        if (project) {   
            return await this.projectStatusService.setDate(body.startDate, body.endDate, project.id);
        }
    }

    @Put('/priority/:id')
    async changePriority(@Body() body, @Param() params) {
        const decoded = verify(body.accessToken, '7A125D673E2D5E29');
        if (typeof decoded === 'string') {return undefined;}
        const user = await this.userService.findByEmail(decoded.email);
        const project = await this.projectService.getProjectById(params.id, user.id);

        if (project) {   
            return await this.projectStatusService.setPriority(body.priority, project.id);
        }
    }
}
