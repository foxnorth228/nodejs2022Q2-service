import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { IUser } from "../user.interface";
import { v4 } from "uuid";
import { validate as validateClass } from 'class-validator';
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { validate } from "uuid";

@Injectable()
export class UserService {
    private readonly users: IUser[] = [];

    async create(user: CreateUserDto) {
        const test = new CreateUserDto();
        test.login = user.login;
        test.password = user.password;
        const errors = await validateClass(test);
        if(errors.length > 0) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Not valid id'
            }, HttpStatus.BAD_REQUEST);
        }
        /*if(user.login === null || user.login === undefined || user.login === "") {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Not valid id'
            }, HttpStatus.BAD_REQUEST);
        }
        if(user.password === null || user.password === undefined || user.password === "") {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Not valid id'
            }, HttpStatus.BAD_REQUEST);
        }*/
        const newUser = Object.assign({id: v4(), version: 1, createdAt: (new Date()).getTime(), 
            updatedAt: (new Date()).getTime()}, user);
        this.users.push(newUser);
        const sendUser = Object.assign({}, newUser);
        delete sendUser.password;
        return sendUser;
    }

    findOne(id) {
        if(validate(id)) {
            const user = this.users.find((el) => el.id === id);
            if(user) {
                return user;
            } else {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: `Can't found this object: ${id}`
                }, HttpStatus.NOT_FOUND);
            }
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Not valid id'
            }, HttpStatus.BAD_REQUEST);
        }
    } 

    findAll() {
        return this.users;
    }

    async update(id: string, user: UpdateUserDto) {
        if(validate(id)) {
            const test = new UpdateUserDto();
            test.oldPassword = user.oldPassword;
            test.newPassword = user.newPassword;
            const errors = await validateClass(test);
            const oldUser = this.users.find((el) => el.id === id);
            console.log(oldUser, id);
            if(errors.length > 0) {
                console.log("AAA", id, test);
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Not valid id'
                }, HttpStatus.BAD_REQUEST);
            }
            if(!oldUser) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: `Can't found this object: ${id}`
                }, HttpStatus.NOT_FOUND);
            }
            if(oldUser.password !== user.oldPassword) {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    message: `Old password is incorrect`
                }, HttpStatus.FORBIDDEN);
            }
            oldUser.password = user.newPassword;
            oldUser.version += 1;
            oldUser.updatedAt = (new Date()).getTime();
            const sendUser = Object.assign({}, oldUser);
            delete sendUser.password;
            return sendUser;
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Not valid id'
            }, HttpStatus.BAD_REQUEST);
        }
    }

    delete(id: string) {
        if(validate(id)) {
            const userIndex = this.users.findIndex((el) => el.id === id);
            if(userIndex === -1) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: `Can't found this object: ${id}`
                }, HttpStatus.NOT_FOUND);
            }
            this.users.splice(userIndex, 1);
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Not valid id'
            }, HttpStatus.BAD_REQUEST);
        }
    } 
}