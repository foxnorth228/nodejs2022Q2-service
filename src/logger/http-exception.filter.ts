import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger();

    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        let status: number;
        let message: string;
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = "Something in the server crushed";
        }
        this.logger.error(`statusCode: ${status}`);
        response
            .status(status)
            .json({
                statusCode: status,
                message: message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}

const logger = new Logger();
process.on("unhandledRejection", (reason, promise) => {
    logger.error("Catch reject");
    console.log("Catch reject")
});

process.on("uncaughtException", (err, origin) => {
    logger.error("Catch exception")
    console.log("Catch exception")
})