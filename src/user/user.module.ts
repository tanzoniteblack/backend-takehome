import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma';

import { DocumentModule } from '../document/document.module';
import { DocumentService } from '../document/document.service';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, DocumentModule],
  providers: [UserService, UserResolver, DocumentService],
  exports: [UserResolver],
})
export class UserModule {}
