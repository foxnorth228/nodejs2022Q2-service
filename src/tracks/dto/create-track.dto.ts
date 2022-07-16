import { IsString, IsNumber, IsNotEmpty, Allow } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @Allow()
  artistId: string | null;

  @Allow()
  albumId: string | null;
}
