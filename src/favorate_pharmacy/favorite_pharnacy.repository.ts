import { Injectable } from "@nestjs/common";
import { FavoritePharmacyRepositoryInterface } from "./interfaces/favorite_pharmacy.repository.interface";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class FavoritePharmacyRepository implements FavoritePharmacyRepositoryInterface {
    // constructor(@InjectModel())
    findPharmacyById(pharmacyId: string): Promise<any> {
        return 
    }
}