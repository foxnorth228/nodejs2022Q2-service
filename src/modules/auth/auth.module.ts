import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./services/auth.service";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [],
    exports: [],
})
export class AuthModule {}