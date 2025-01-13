import { CreateFavoritePharmacyDTO } from "../dto/create.favorite.pharmacy.dto";

export interface FavoritePharmacyServiceInterface {
    handelCreateFavoritePharmacy(createFavoritePharmacyDTO: CreateFavoritePharmacyDTO)
}