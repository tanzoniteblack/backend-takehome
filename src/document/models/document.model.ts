import { Field, ObjectType } from '@nestjs/graphql';

import type { Document as DocumentModel } from '@prisma/client';

@ObjectType()
export class Document implements DocumentModel {
  @Field()
  id: number;

  @Field()
  text: string;

  @Field()
  title: string;

  @Field()
  userId: number;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}
