import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController],
  imports: [PrismaModule],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
