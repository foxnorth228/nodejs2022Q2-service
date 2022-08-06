import "dotenv/config";
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { sendRequest } from './secondaryFuncs/sendRequest';
import { getToken } from "./secondaryFuncs/getTokenFromHeader";

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = getToken(request.headers);
        try {
            const data: object = await sendRequest(process.env.VERIFY_TOKEN_URL, 'POST', {token: authorizationHeader}) as object;
            if ("statusCode" in data) {
                return false;
            }
            return true;
        } catch (err) {
            return false;
        }
    }
}