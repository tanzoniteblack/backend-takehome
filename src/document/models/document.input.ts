import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DocumentInput {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  userId: number;
}
