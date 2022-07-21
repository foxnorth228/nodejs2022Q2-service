import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserPrismaService } from './services/user.prisma.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, UserPrismaService],
  controllers: [UserController],
  imports: [PrismaModule],
  exports: [],
})
export class UserModule {}
