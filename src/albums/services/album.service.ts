import { IAlbum } from "../interfaces/album.interface";
import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { CreateAlbumDto } from "../dto/create-album.dto";
import { validate, v4 } from "uuid";
import { sendRequest } from "src/sendRequest";

const checkValidation = (id) => { 
    if(!validate(id)) {
        throw new BadRequestException(`This id: "${id}" is not valid`);
    } 
};

@Injectable()
export class AlbumService {
    private readonly albums: IAlbum[] = [];

    findAll() {
        return this.albums;
    }

    findOne(id: string) {
        checkValidation(id);
        const album = this.albums.find((el) => el.id === id);
        if(album) {
            return album;
        } else {
            throw new NotFoundException(`album with id: "${id}" is not exist`);
        }
    }

    create(createalbum: CreateAlbumDto) {
        const album = Object.assign({ id: v4() }, createalbum);
        this.albums.push(album);
        return album;
    }

    update(id: string, createAlbum: CreateAlbumDto) {
        checkValidation(id);
        const album = this.albums.find((el) => el.id === id);
        if(!album) {
            throw new NotFoundException(`album with id: "${id}" is not exist`);
        }
        album.name = createAlbum.name;
        album.year = createAlbum.year;
        album.artistId = createAlbum.artistId;
        return album;
    }

    async delete(id: string, host: string) {
        checkValidation(id);
        const albumIndex = this.albums.findIndex((el) => el.id === id);
        if(albumIndex === -1) {
            throw new NotFoundException(`album with id: "${id}" is not exist`);
        }
        await sendRequest(`http://${host}/favs/album/${id}`, "DELETE");
        await sendRequest(`http://${host}/track/album/${id}`, "DELETE");
        this.albums.splice(albumIndex, 1);
    }

    deleteArtistFromAlbums(id: string) {
        let count = 0;
        for (let album of this.albums) {
            if(album.artistId === id) {
                album.artistId = null;
                count++;
            }
        }
        return `${count} albums was changed, artistId was removed`;
    }
}