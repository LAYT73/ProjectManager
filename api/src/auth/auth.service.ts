import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { LoginUser } from './entities/login-user.entity';
import RefreshToken from './entities/refresh-token.entity';
import * as bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly projectService: ProjectService,

        ) {};
    
    /**
     * @VerifyGoogleAccessToken
     */
    async verifyGoogleAccessToken(token: string) {
        try {       
            const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);
            const data = await response.json();
        
            const email = data?.email;
            const userId = data?.sub;
                    
            return {
                email:email,
                social_id: userId,
            };
        } catch (error) {
            console.error('Ошибка Google верификации: ', error);
            return false;
        };
    };

    async registration(email: string, phone: string, username: string, password: string) {
        const user = await this.userService.findByEmail(email);
        const hash = await bcrypt.hash(password, 10);
        const loginUser = {
            email: email,
            password: hash,
            refresh_token: '',
        };
        const tokens = await this.newRefreshAndAccessToken(loginUser);
        const decoded = verify(tokens.accessToken, '7A125D673E2D5E29');
        if (typeof decoded === 'string') {return undefined;}
        const exp = decoded.exp;
        const iat = decoded.iat;

        const result = {
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
            iat: iat,
            exp: exp,
            email: email,
            username: username,
            phone: phone,
        };

        if(!user){
            await this.userService.createUser(email, username, hash, phone, tokens.refreshToken);
            const newUser = await this.userService.findByEmail(email);
            await this.projectService.createProject(newUser.id, "Быстрый старт", null, "me");
            return result;
        };

        return {
            code: 403,
            message: "User with this email is already exist"
        }
    }

    async login(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return {
                message: "User isnt exist"
            }
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return {
                message: "Invalid data"
            }
        }

        const loginUser = {
            email: email,
            password: user.password,
            refresh_token: '',
        };
        const tokens = await this.newRefreshAndAccessToken(loginUser);
        const decoded = verify(tokens.accessToken, '7A125D673E2D5E29');
        if (typeof decoded === 'string') {return undefined;}
        const exp = decoded.exp;
        const iat = decoded.iat;

        const result = {
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
            iat: iat,
            exp: exp,
            email: email,
            username: user.username,
            phone: user.phone,
        };

        await this.userService.updateRefreshToken(tokens.refreshToken, email)
        return result
}
    
    /**
     * @GoogleLogin
     */
    async googleLogin(accessToken:string, username:string): Promise<{ accessToken: string; refreshToken: string; iat: number; exp: number} | undefined| Object> {
        const googleData = await this.verifyGoogleAccessToken(accessToken);
        if(!googleData){ return 'permission denied' }

        const user = await this.userService.findByEmail(googleData.email);
        const social_id_hash = await bcrypt.hash(googleData.social_id, 10);
        const loginUser = {
            email: googleData.email,
            password: social_id_hash,
            refresh_token: '',
        };
        const tokens = await this.newRefreshAndAccessToken(loginUser);
        const decoded = verify(tokens.accessToken, '7A125D673E2D5E29');
        if (typeof decoded === 'string') {return undefined;}
        const exp = decoded.exp;
        const iat = decoded.iat;

        const result = {
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
            iat: iat,
            exp: exp,
            email: googleData.email,
            username: username,
            phone: null,
        };

        if(!user){
            await this.userService.createUser(googleData.email, username, social_id_hash, null, tokens.refreshToken)
            const newUser = await this.userService.findByEmail(googleData.email);
            await this.projectService.createProject(newUser.id, "Быстрый старт", null, "me");
            return result;
        };

        await this.userService.updateRefreshToken(tokens.refreshToken, googleData.email)
        return result
    };

    /**
     * @NewRefreshAndAccessToken
     */
    private async newRefreshAndAccessToken(user: LoginUser): Promise<{ accessToken: string; refreshToken: string }> {
        
        const refreshObject = new RefreshToken({
            email: user.email,
            password: user.password, 
        });
        
        const accessToken = sign(
        {
            email: user.email,
            password: user.password, 
        },
        '7A125D673E2D5E29',
        {
            expiresIn: '60m',
        });
        
        const refreshToken = refreshObject.sign();
        
        return {
            refreshToken: refreshToken,
            accessToken: accessToken,
        };
    };

  /**
   * @Refresh
   */
    async refresh(refreshStr: string): Promise<{ accessToken:string;iat:number;exp:number } | undefined> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if (!refreshToken) {return undefined};
        const user = await this.userService.findByEmail(refreshToken.email);
        if (!user) {return undefined};
        if (user.refresh_token===null){return undefined};
        const accessToken = await sign(
            {
                email: refreshToken.email,
                password: refreshToken.password,
            }, 
            '7A125D673E2D5E29', 
            { 
                expiresIn: '60m' 
            },
        );

        const decoded = verify(accessToken, '7A125D673E2D5E29');
        if (typeof decoded === 'string') {return undefined};
        const exp = decoded.exp;
        const iat = decoded.iat;

        const result = {
            accessToken: accessToken,
            iat: iat,
            exp: exp,
        };

        return result;
    };

    /**
     * @RetriveRefreshToken
     */
    async retrieveRefreshToken(refreshStr: string): Promise<RefreshToken | undefined> {
        try {
            const decoded = verify(refreshStr, '7A125D673E2D5E29');
            if (typeof decoded === 'string') {return undefined};
            const refreshToken = [];
            refreshToken[0] = await this.userService.findByEmail(decoded.email);
            const obj = {
                email: decoded.email,
                password: decoded.password,
                sign: refreshToken[0].refresh_token,
            }
            return Promise.resolve(obj);
        } catch (error) {
            console.error("Retrieve RefreshToken error: ", error)
            return undefined;
        };
    };

  /**
   * @Logout 
   */
    async logout(refreshStr): Promise<void | { message: string }> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if (!refreshToken) {return};

        await this.userService.updateRefreshToken(null, refreshToken.email);
    
        return {
            message: "Logout successfully completed",
        };
    };


};
