import { Controller, Get, Post, Req, UseGuards, Body } from '@nestjs/common';
import { FolderService } from './folder.service';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { sign, verify } from 'jsonwebtoken';

@Controller('folder')
export class FolderController {
    constructor(
        private readonly folderService: FolderService,
        private readonly userService: UserService,
        ) {}

        @UseGuards(JwtAuthGuard)
        @Get()
        async getFoldersByAccessToken(@Req() req) {
            const email = req.user.email;
            const user = await this.userService.findByEmail(email);
            return await this.folderService.getFoldersByOwnerId(user.id);
        }
        
        @Post()
        async createProject(@Body() body) {
            const decoded = verify(body.accessToken, '7A125D673E2D5E29');
            if (typeof decoded === 'string') {return undefined;}
            const user = await this.userService.findByEmail(decoded.email);
            return await this.folderService.createFolder(user.id, body.name, body.visibility);
        }
}
