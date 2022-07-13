import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from "@nestjs/common";
import { IUser } from "../user.interface";
import { v4 } from "uuid";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { validate } from "uuid";

const checkValidation = (id) => { 
    if(!validate(id)) {
        throw new BadRequestException(`This id: "${id}" is not valid`);
    } 
};

@Injectable()
export class UserService {
    private readonly users: IUser[] = [];

    async create(user: CreateUserDto) {
        const newUser = Object.assign({id: v4(), version: 1, createdAt: (new Date()).getTime(), 
            updatedAt: (new Date()).getTime()}, user);
        this.users.push(newUser);
        const sendUser = Object.assign({}, newUser);
        delete sendUser.password;
        return sendUser;
    }

    findOne(id) {
        checkValidation(id);
        const user = this.users.find((el) => el.id === id);
        if(user) {
            return user;
        } else {
            throw new NotFoundException(`User with id: "${id}" is not exist`);
        }
    } 

    findAll() {
        return this.users;
    }

    async update(id: string, user: UpdateUserDto) {
        checkValidation(id);
        const oldUser = this.users.find((el) => el.id === id);
        if(!oldUser) {
            throw new NotFoundException(`User with id: "${id}" is not exist`);
        }
        if(oldUser.password !== user.oldPassword) {
            throw new ForbiddenException(`Old password "${user.oldPassword} is incorrect`);
        }
        oldUser.password = user.newPassword;
        oldUser.version += 1;
        oldUser.updatedAt = (new Date()).getTime();
        const sendUser = Object.assign({}, oldUser);
        delete sendUser.password;
        return sendUser;
    }

    delete(id: string) {
        checkValidation(id);
        const userIndex = this.users.findIndex((el) => el.id === id);
        if(userIndex === -1) {
            throw new NotFoundException(`User with id: "${id}" is not exist`);
        }
        this.users.splice(userIndex, 1);
    } 
}