import { NotFoundException } from "@nestjs/common";

export const checkNotFound = (existence: any, message: string) => {
    if(!existence) {
        throw new NotFoundException(message);
    }
}