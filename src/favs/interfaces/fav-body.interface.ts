import { IArtist } from "../../artists/interfaces/artist.interface"; 
import { IAlbum } from "../../albums/interfaces/album.interface";
import { ITrack } from "../../tracks/interfaces/track.interface";
export interface IFavBody {
    artists: IArtist[];
    albums: IAlbum[];
    tracks: ITrack[];
}