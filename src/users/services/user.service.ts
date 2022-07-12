import { Injectable } from "@nestjs/common";
import { IUser } from "../user.interface";
import { v4 } from "uuid";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { validate } from "uuid";

@Injectable()
export class UserService {
    private readonly users: IUser[] = [];

    create(user: CreateUserDto) {
        const newUser = Object.assign({id: v4(), version: 1, createdAt: (new Date()).getTime(), 
            updatedAt: (new Date()).getTime()}, user);
        this.users.push(newUser);
        console.log("User created");
        const sendUser = newUser;
        delete sendUser.password;
        return sendUser;
    }

    findOne(id) {
        if(validate(id)) {
            const user = this.users.find((el) => el.id === id);
            console.log(user);
            return user;
        } else {
            console.log("not validate");
            return null;
        }
    } 

    findAll() {
        return this.users;
    }

    update(id: string, user: UpdateUserDto) {
        const newUser = null;
    }
}