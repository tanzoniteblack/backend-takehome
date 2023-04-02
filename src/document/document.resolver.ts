import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { DocumentService } from './document.service';
import { Document } from './models/document.model'
import { DocumentInput } from './models/document.input';

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @Query(() => [Document])
  documents(@Args('userId') userId: number): Promise<Document[]> {
    return this.documentService.findByUserId(userId);
  }

  @Mutation(() => Document)
  saveDocument(@Args('documentData') documentData: DocumentInput): Promise<Document> {
    return this.documentService.saveDocument(documentData);
  }
}
