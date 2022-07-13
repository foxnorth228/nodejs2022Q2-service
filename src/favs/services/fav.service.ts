import { Injectable } from "@nestjs/common";
import { IFav } from "../interfaces/fav.interface";

@Injectable()
export class FavService {
    private readonly favs: Map<string, IFav> = new Map();
    private readonly fav: IFav = {
        artists: [],
        albums: [],
        tracks:[]
    };

    async addArtist(id: string) {

    }
}