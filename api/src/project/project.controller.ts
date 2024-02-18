import { Controller, Get, Post, Param, UseGuards, Req, Body } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { sign, verify } from 'jsonwebtoken';

@Controller('project')
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService,
        private readonly userService: UserService
        ) {}
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async getProjectsByAccessToken(@Req() req) {
        const email = req.user.email;
        const user = await this.userService.findByEmail(email);
        return await this.projectService.getProjectsByOwnerId(user.id);
    }

    @Post()
    async createProject(@Body() body) {
        const decoded = verify(body.accessToken, '7A125D673E2D5E29');
        if (typeof decoded === 'string') {return undefined;}
        const user = await this.userService.findByEmail(decoded.email);
        return await this.projectService.createProject(user.id, body.title, null, body.visibility);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getProjectsById(@Param() params, @Req() req) {
        const email = req.user.email;
        const user = await this.userService.findByEmail(email);
        return await this.projectService.getProjectById(params.id, user.id);
    }


}
