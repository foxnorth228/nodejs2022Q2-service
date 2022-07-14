import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { ITrack } from "../interfaces/track.interface";
import { CreateTrackDto } from "../dto/create-track.dto";
import { validate, v4 } from "uuid";
import { sendRequest } from "src/sendRequest";

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

    async delete(id: string, host) {
        checkValidation(id);
        const trackIndex = this.tracks.findIndex((el) => el.id === id);
        if(trackIndex === -1) {
            throw new NotFoundException(`track with id: "${id}" is not exist`);
        }
        await sendRequest(`http://${host}/favs/track/${id}`, "DELETE");
        this.tracks.splice(trackIndex, 1);
    }

    deleteArtistFromTracks(id: string) {
        let count = 0;
        for (let track of this.tracks) {
            if(track.artistId === id) {
                track.artistId = null;
                count++;
            }
        }
        return `${count} tracks was changed, artistId was removed`;
    }

    deleteAlbumFromTracks(id: string) {
        let count = 0;
        for (let track of this.tracks) {
            if(track.albumId === id) {
                track.albumId = null;
                count++;
            }
        }
        return `${count} tracks was changed, albumId was removed`;
    }
}