import { validate, v4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';

type FindOneObj = {
  findOne: (id: string) => any;
};

export class processorId {
  static checkValidation(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(`This id: "${id}" is not valid`);
    }
  }

  static async createId(obj: FindOneObj): Promise<string> {
    let id = v4();
    while (await obj.findOne(id)) {
      id = v4();
    }
    return id;
  }
}
