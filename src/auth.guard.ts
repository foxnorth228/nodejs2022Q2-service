import "dotenv/config";
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { sendRequest } from './secondaryFuncs/sendRequest';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader =
            (request.headers['authorization'] ||
            request.headers['Authorization']).split(' ')[1];
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