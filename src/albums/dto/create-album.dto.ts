import { IsString, IsNumber, IsNotEmpty, Allow} from "class-validator";
export class CreateAlbumDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

    @Allow()
    artistId: string | null;
}