import { validate } from 'uuid';
import { BadRequestException } from '@nestjs/common';

export const checkValidation = (id: string) => {
  if (!validate(id)) {
    throw new BadRequestException(`This id: "${id}" is not valid`);
  }
};
