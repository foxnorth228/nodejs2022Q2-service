import { Injectable, BadRequestException, UnprocessableEntityException } from "@nestjs/common";
import { IArtist } from "../../artists/interfaces/artist.interface"; 
import { IAlbum } from "../../albums/interfaces/album.interface";
import { ITrack } from "../../tracks/interfaces/track.interface";
import { IFavBody } from "../interfaces/fav-body.interface";
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

    async getAllFavs(host: string) {
        const favBody: IFavBody = {
            artists: [],
            albums: [],
            tracks: [],
        };
        for (let id of this.fav.artists) {
            const answer = await this.sendRequest(`http://${host}/artist/${id}`) as IArtist;
            favBody.artists.push(answer);
        }
        for (let id of this.fav.albums) {
            const answer = await this.sendRequest(`http://${host}/album/${id}`) as IAlbum;
            favBody.albums.push(answer);
        }
        for (let id of this.fav.tracks) {
            const answer = await this.sendRequest(`http://${host}/track/${id}`) as ITrack;
            favBody.tracks.push(answer);
        }
        return favBody;
    }

    async addArtist(id: string, host: string) {
        checkValidation(id);
        const answer = await this.sendRequest(`http://${host}/artist/${id}`) as IAnswer;
        if("statusCode" in answer) {
            throw new UnprocessableEntityException(`Artist with id: "${id}" didn't exist`);
        } else {
            this.fav.artists.push(id);
            return `Artist id: "${id}" successfully added to favourites`;
        }
    }

    async removeArtist(id: string) {
        checkValidation(id);
        const artistIndex = this.fav.artists.indexOf(id);
        if(artistIndex === -1) {
            throw new BadRequestException(`Artist with id: "${id}" didn't favourite`);
        } else {
            this.fav.artists.splice(artistIndex, 1);
            return `Artist id: "${id}" successfully deleted from favourites`;
        }
    }

    async addAlbum(id: string, host: string) {
        checkValidation(id);
        const answer = await this.sendRequest(`http://${host}/album/${id}`) as IAnswer;
        if("statusCode" in answer) {
            throw new UnprocessableEntityException(`Artist with id: "${id}" didn't exist`);
        } else {
            this.fav.albums.push(id);
            return `Album id: "${id}" successfully added to favourites`;
        }
    }

    async removeAlbum(id: string) {
        checkValidation(id);
        const albumIndex = this.fav.albums.indexOf(id);
        if(albumIndex === -1) {
            throw new BadRequestException(`Artist with id: "${id}" didn't favourite`);
        } else {
            this.fav.albums.splice(albumIndex, 1);
            return `Album id: "${id}" successfully deleted from favourites`;
        }
    }

    async addTrack(id: string, host: string) {
        checkValidation(id);
        const answer = await this.sendRequest(`http://${host}/track/${id}`) as IAnswer;
        if("statusCode" in answer) {
            throw new UnprocessableEntityException(`Artist with id: "${id}" didn't exist`);
        } else {
            this.fav.tracks.push(id);
            return `Track id: "${id}" added deleted to favourites`;
        }
    }

    async removeTrack(id: string) {
        checkValidation(id);
        const trackIndex = this.fav.tracks.indexOf(id);
        if(trackIndex === -1) {
            throw new BadRequestException(`Artist with id: "${id}" didn't favourite`);
        } else {
            this.fav.tracks.splice(trackIndex, 1);
            return `Track id: "${id}" successfully deleted from favourites`;
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