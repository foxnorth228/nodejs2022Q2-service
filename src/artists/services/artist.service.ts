import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { IArtist } from "../interfaces/artist.interface";
import { CreateArtistDto } from "../dto/create-artist.dto";
import { validate, v4 } from "uuid"

const checkValidation = (id) => { 
    if(!validate(id)) {
        throw new BadRequestException(`This id: "${id}" is not valid`);
    } 
};

@Injectable()
export class ArtistService {
    private readonly artists: IArtist[] = [];

    findAll() {
        return this.artists;
    }

    findOne(id: string) {
        checkValidation(id);
        const artist = this.artists.find((el) => el.id === id);
        if(artist) {
            return artist;
        } else {
            throw new NotFoundException(`Artist with id: "${id}" is not exist`);
        }
    }

    create(createArtist: CreateArtistDto) {
        const artist = Object.assign({ id: v4() }, createArtist);
        this.artists.push(artist);
        return artist;
    }

    update(id: string, createArtist: CreateArtistDto) {
        checkValidation(id);
        const artist = this.artists.find((el) => el.id === id);
        if(!artist) {
            throw new NotFoundException(`Artist with id: "${id}" is not exist`);
        }
        artist.name = createArtist.name;
        artist.grammy = createArtist.grammy;
        return artist;
    }

    delete(id: string) {
        checkValidation(id);
        const artistIndex = this.artists.findIndex((el) => el.id === id);
        if(artistIndex === -1) {
            throw new NotFoundException(`Artist with id: "${id}" is not exist`);
        }
        this.artists.splice(artistIndex, 1);
    }
}