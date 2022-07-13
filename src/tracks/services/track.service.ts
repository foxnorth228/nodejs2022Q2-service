import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { ITrack } from "../interfaces/track.interface";
import { CreateTrackDto } from "../dto/create-track.dto";
import { validate, v4 } from "uuid";

const checkValidation = (id) => { 
    if(!validate(id)) {
        throw new BadRequestException(`This id: "${id}" is not valid`);
    } 
};

@Injectable()
export class TrackService {
    private readonly tracks: ITrack[] = [];

    findAll() {
        return this.tracks;
    }

    findOne(id: string) {
        checkValidation(id);
        const track = this.tracks.find((el) => el.id === id);
        if(track) {
            return track;
        } else {
            throw new NotFoundException(`track with id: "${id}" is not exist`);
        }
    }

    create(createtrack: CreateTrackDto) {
        console.log(createtrack);
        const track = Object.assign({ id: v4() }, createtrack);
        this.tracks.push(track);
        return track;
    }

    update(id: string, createtrack: CreateTrackDto) {
        checkValidation(id);
        const track = this.tracks.find((el) => el.id === id);
        if(!track) {
            throw new NotFoundException(`track with id: "${id}" is not exist`);
        }
        track.name = createtrack.name;
        track.duration = createtrack.duration;
        track.artistId = createtrack.artistId;
        track.albumId = track.albumId;
        return track;
    }

    delete(id: string) {
        checkValidation(id);
        const trackIndex = this.tracks.findIndex((el) => el.id === id);
        if(trackIndex === -1) {
            throw new NotFoundException(`track with id: "${id}" is not exist`);
        }
        this.tracks.splice(trackIndex, 1);
    }
}