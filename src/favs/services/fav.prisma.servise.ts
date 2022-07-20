import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma";
import { IArtist } from '../../artists/interfaces/artist.interface';
import { IAlbum } from '../../albums/interfaces/album.interface';
import { ITrack } from '../../tracks/interfaces/track.interface';
import { IFavBody } from '../interfaces/fav-body.interface';
import { IFav } from '../interfaces/fav.interface';
import { v4 } from "uuid";

export class FavPrismaService {
    constructor() {
        this.createFav();
    }
    public id: string = v4();
    private prismaService: PrismaService = new PrismaService();

    async createFav() {
        const body = await this.prismaService.fav.create({
            data: {
                id: this.id,
                artists: [],
                albums: [],
                tracks: [],
            }
        });
    }

    async getFavs(id: string) {
        return await this.prismaService.fav.findUnique({
            where: {
                id: id,
            }
        });
    }

    async getArtist(id: string): Promise<IArtist | null> {
        const artist = await this.prismaService.artist.findUnique({
            where: {
                id: id,
            }
        });
        return artist;
    }

    async addArtist(id: string) {
        const favs = await this.getFavs(this.id);
        const artists = favs.artists;
        artists.push(id);
        await this.prismaService.fav.update({
            where: {
                id: this.id,
            },
            data: {
                artists: artists,
            }
        });
    }

    async getArtistFromFavs(id: string): Promise<string | null> {
        const favs = await this.getFavs(this.id);
        const artists = favs.artists;
        const artistIndex = artists.indexOf(id);
        if(artistIndex === -1) {
            return null;
        } else {
            return id;
        }
    }

    async removeArtist(id: string) {
        const favs = await this.getFavs(this.id);
        const artists = favs.artists;
        const artistIndex = artists.indexOf(id);
        artists.splice(artistIndex, 1);
        await this.prismaService.fav.update({
            where: {
                id: this.id,
            },
            data: {
                artists: artists,
            }
        });
    }

    async getAlbum(id: string): Promise<IAlbum | null> {
        const album = await this.prismaService.album.findUnique({
            where: {
                id: id,
            }
        });
        return album;
    }

    async addAlbum(id: string) {
        const favs = await this.getFavs(this.id);
        const albums = favs.albums;
        albums.push(id);
        await this.prismaService.fav.update({
            where: {
                id: this.id,
            },
            data: {
                albums: albums,
            }
        });
    }

    async getAlbumFromFavs(id: string): Promise<string | null> {
        const favs = await this.getFavs(this.id);
        const albums = favs.albums;
        const albumIndex = albums.indexOf(id);
        if(albumIndex === -1) {
            return null;
        } else {
            return id;
        }
    }

    async removeAlbum(id: string) {
        const favs = await this.getFavs(this.id);
        const albums = favs.albums;
        const albumIndex = albums.indexOf(id);
        albums.splice(albumIndex, 1);
        await this.prismaService.fav.update({
            where: {
                id: this.id,
            },
            data: {
                albums: albums,
            }
        });
    }

    async getTrack(id: string): Promise<ITrack | null> {
        const track = await this.prismaService.track.findUnique({
            where: {
                id: id,
            }
        });
        return track;
    }

    async addTrack(id: string) {
        const favs = await this.getFavs(this.id);
        const tracks = favs.tracks;
        tracks.push(id);
        await this.prismaService.fav.update({
            where: {
                id: this.id,
            },
            data: {
                tracks: tracks,
            }
        });
    }

    async getTrackFromFavs(id: string): Promise<string | null> {
        const favs = await this.getFavs(this.id);
        const tracks = favs.tracks;
        const trackIndex = tracks.indexOf(id);
        if(trackIndex === -1) {
            return null;
        } else {
            return id;
        }
    }

    async removeTrack(id: string) {
        const favs = await this.getFavs(this.id);
        const tracks = favs.tracks;
        const trackIndex = tracks.indexOf(id);
        tracks.splice(trackIndex, 1);
        await this.prismaService.fav.update({
            where: {
                id: this.id,
            },
            data: {
                tracks: tracks,
            }
        });
    }
}