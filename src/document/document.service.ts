import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma";
import type { DocumentInput } from "./models/document.input";
import type { Document } from "./models/document.model";

@Injectable()
export class DocumentService {
  constructor(private readonly prismaService: PrismaService) {}

  findByUserId(id: number) {
    return this.prismaService.document.findMany({
      where: {
        userId: id
      }
    });
  }

  saveDocument(documentData: DocumentInput): Promise<Document> {
    return this.prismaService.document.create({
      data: {
        title: documentData.title,
        text: documentData.text,
        userId: documentData.userId
      }
    })
  }
}
