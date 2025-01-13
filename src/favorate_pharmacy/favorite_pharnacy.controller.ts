import { BadRequestException, Body, Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateFavoritePharmacyDTO } from "./dto/create.favorite.pharmacy.dto";
import { FavoritePharmacyService } from "./favorite_pharnacy.service";
import { CreateFavoritePharmacyResponseDTO } from "./dto/create.favorite.pharmacy.response.dto";

@Controller('favorite')
export class FavoritePharmacyController {

    constructor(
        private readonly favoritePharmacyService: FavoritePharmacyService
    ){}

    @Post('/create')
    @UsePipes(new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
            const formattedErrors = errors.map(error => ({
                field: error.property,
                constraint: Object.values(error.constraints || {})[0]
            }));

            throw new BadRequestException(formattedErrors);
        }
    }))
    async createFavoritePharmacy(
        @Body() createFavoritePharnacyDTO: CreateFavoritePharmacyDTO
    ): Promise<CreateFavoritePharmacyResponseDTO> {
        try{
            const favoritePharmacy = await this.favoritePharmacyService.handelCreateFavoritePharmacy(createFavoritePharnacyDTO)
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Favorite Pharmacy Created Successfully',
                favorite_pharmacy: favoritePharmacy
            }
        }catch(err: any){
            if(err instanceof HttpException){
                throw new HttpException({ message: err.getResponse()}, err.getStatus())
            }
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An unexpected error occurred',
                error: err.message || 'Internal Server Error'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}