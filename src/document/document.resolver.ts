import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "src/user/models/user.model";
import { DocumentService } from './document.service';
import { Document } from './models/document.model'
import { UserService } from "../user";

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService,
              private readonly userService: UserService) {}

  @Query(() => [Document])
  documents(@Args('userId') userId: number): Promise<Document[]> {
    return this.documentService.findByUserId(userId);
  }

  @ResolveField('user', () => User)
  async user(@Parent() document: Document): Promise<User> {
    return this.userService.findByID(document.userId);
  }
}
