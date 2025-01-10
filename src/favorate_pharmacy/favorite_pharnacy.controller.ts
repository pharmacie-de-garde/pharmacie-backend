import { Controller, Get } from "@nestjs/common";

@Controller('favorite')
export class FavoritePharmacyController {
    @Get()
    getHello() {
        return 'Hello World!';
    }
}