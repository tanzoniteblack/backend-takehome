import { Args, Query, Resolver } from "@nestjs/graphql";
import { DocumentService } from './document.service';
import { Document } from './models/document.model'

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @Query(() => [Document])
  documents(@Args('userId') userId: number): Promise<Document[]> {
    return this.documentService.findByUserId(userId);
  }
}
