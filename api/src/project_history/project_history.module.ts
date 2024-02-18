import { Module } from '@nestjs/common';
import { ProjectHistoryController } from './project_history.controller';
import { ProjectHistoryService } from './project_history.service';

@Module({
  controllers: [ProjectHistoryController],
  providers: [ProjectHistoryService]
})
export class ProjectHistoryModule {}
