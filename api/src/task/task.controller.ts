import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TaskService } from './task.service';
import { UserService } from 'src/user/user.service';
import { ProjectService } from 'src/project/project.service';
import { sign, verify } from 'jsonwebtoken';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly userService: UserService,
        private readonly projectService: ProjectService,
        ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getTasks(@Req() req, @Param() params) {
        const email = req.user.email;
        const user = await this.userService.findByEmail(email);
        const project = await this.projectService.getProjectById(+params.id, user.id);
        console.log(project, user);
        
        if (project) {   
            return await this.taskService.getTasks(+params.id);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:project/:id')
    async getTaskById(@Req() req, @Param() params) {
        const email = req.user.email;
        const user = await this.userService.findByEmail(email);
        const project = await this.projectService.getProjectById(+params.project, user.id);
        if (project) {   
            return await this.taskService.getTask(+params.project, +params.id);
        }
    }

    @Post('/:id')
    async createTask(@Body() body, @Param() params) {
        const decoded = verify(body.accessToken, '7A125D673E2D5E29');
        if (typeof decoded === 'string') {return undefined;}
        const user = await this.userService.findByEmail(decoded.email);
        const project = await this.projectService.getProjectById(+params.id, user.id);
        if (project) {
            return await this.taskService.createTask(project.id, body.name, null);
        }
    }

    @Put('/:project/:id')
    async setChecked(@Param() params, @Body() body) {
        const decoded = verify(body.accessToken, '7A125D673E2D5E29');
        if (typeof decoded === 'string') {return undefined;}
        const user = await this.userService.findByEmail(decoded.email);
        const project = await this.projectService.getProjectById(+params.project, user.id);
        console.log(project, user, params, body);
        
        if (project) {
            return await this.taskService.setChecked(body.checked, +params.id);
        }
    }
}
