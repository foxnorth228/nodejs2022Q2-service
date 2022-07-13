import { Controller } from "@nestjs/common";
import { TrackService } from "./services/track.service";

@Controller('track')
export class TrackController {
    constructor(private trackservice: TrackService) {}
}