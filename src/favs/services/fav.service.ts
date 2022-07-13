import { Injectable, BadRequestException } from "@nestjs/common";
import { IFav } from "../interfaces/fav.interface";
import { request } from "http";
import { validate } from "uuid"

const checkValidation = (id) => { 
    if(!validate(id)) {
        throw new BadRequestException(`This id: "${id}" is not valid`);
    } 
};

interface IAnswer {
    statusCode: number;
    message: string;
    error: string;
}

@Injectable()
export class FavService {
    private readonly favs: Map<string, IFav> = new Map();
    private readonly fav: IFav = {
        artists: [],
        albums: [],
        tracks: []
    };

    async addArtist(id: string, host: string) {
        checkValidation(id);
        const answer = await this.sendRequest(`http://${host}/artist/${id}`) as IAnswer;
        if("statusCode" in answer) {
            throw new BadRequestException(`Element with id: "${id}" didn't exist`);
        } else {
            console.log(answer);
        }
    }

    async sendRequest(path, method="GET", body={}, headers = {}) {
        return new Promise((resolve, reject) => {
            const postData = JSON.stringify(body);
            let length = 0;
            if(method !== "GET" && method !== "DELETE") {
                length = Buffer.byteLength(postData);
            }
            const options = {
                method: method,
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': length
                }
            };
            const req = request(path, options, (res) => {
                let body = "";
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                  body += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(body));
                });
            });
            for (let [key, value] of Object.entries(headers)) {
                req.setHeader(key, value as string);
            }
            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
                reject(e);
            });
            if(method !== "GET" && method !== "DELETE") {
                req.write(postData);
            }
            req.end();
        });
    }
}