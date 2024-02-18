import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ProjectStatusModule } from './project_status/project_status.module';
import { TaskModule } from './task/task.module';
import { ProjectHistoryModule } from './project_history/project_history.module';
import { MailModule } from './mail/mail.module';
import { FolderModule } from './folder/folder.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: true,
    }),    
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'nsshipilov@gmail.com',
          pass: 'etvb hwjc chwh gict'
        },
      },
      defaults: {
        from: '"No reply" <no-reply@localhost>'
      },
      preview: true,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        }
      }
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    ProjectStatusModule,
    TaskModule,
    ProjectHistoryModule,
    MailModule,
    FolderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
