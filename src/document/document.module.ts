import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';
import { PrismaModule } from "../prisma";

@Module({
  imports: [PrismaModule],
  providers: [DocumentResolver, DocumentService],
  exports: [DocumentResolver]
})
export class DocumentModule {}
