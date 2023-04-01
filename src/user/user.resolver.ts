import { Args, Parent, Query, Resolver, ResolveField } from "@nestjs/graphql";

import { User } from './models/user.model';
import { UserService } from './user.service';
import { Document } from "../document/models/document.model";
import { DocumentService } from "../document/document.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService,
              private readonly documentService: DocumentService) {}

  @Query(() => User)
  user(@Args('id') id: number) {
    return this.userService.findByID(id);
  }

  @ResolveField(() => [Document])
  documents(@Parent() user: User) {
    return this.documentService.findByUserId(user.id);
  }
}
