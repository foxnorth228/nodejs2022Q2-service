import { Module } from '@nestjs/common';
import { PrismaService } from './prisma';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
