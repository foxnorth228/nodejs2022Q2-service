import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma";

@Injectable()
export class ArtistPrismaService {
    constructor(private prismaService: PrismaService) {}
}