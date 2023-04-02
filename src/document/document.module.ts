import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma';

import { DocumentResolver } from './document.resolver';
import { DocumentService } from './document.service';

@Module({
  imports: [PrismaModule],
  providers: [DocumentResolver, DocumentService],
  exports: [DocumentResolver],
})
export class DocumentModule {}
