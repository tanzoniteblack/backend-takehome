import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';
import { PrismaModule } from "../prisma";
import { UserModule, UserService } from "../user";

@Module({
  imports: [PrismaModule, UserModule],
  providers: [DocumentResolver, DocumentService, UserService],
  exports: [DocumentResolver]
})
export class DocumentModule {}
