import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { DocumentService } from './document.service';
import { DocumentInput } from './models/document.input';
import { Document } from './models/document.model';

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @Query(() => [Document])
  documents(@Args('userId') userId: number): Promise<Document[]> {
    return this.documentService.findByUserId(userId);
  }

  @Mutation(() => Document)
  saveDocument(
    @Args('documentData') documentData: DocumentInput,
  ): Promise<Document> {
    return this.documentService.saveDocument(documentData);
  }
}
