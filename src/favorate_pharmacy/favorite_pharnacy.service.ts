import { Inject, Injectable } from "@nestjs/common";
import { CreateFavoritePharmacyDTO } from "./dto/create.favorite.pharmacy.dto";
import { FavoritePharmacyRepositoryInterface } from "./interfaces/favorite_pharmacy.repository.interface";

@Injectable()

export class FavoritePharmacyService implements FavoritePharmacyService {
    constructor(@Inject('FavoritePharmacyRepositoryInterface') private readonly favoritePharmacyRepository: FavoritePharmacyRepositoryInterface){}

    async handelCreateFavoritePharmacy(createFavoritePharnacyDTO: CreateFavoritePharmacyDTO) {
        const findPharmacy = await this.favoritePharmacyRepository
    }
}