export interface FavoritePharmacyRepositoryInterface {
    findPharmacyById(pharmacyId: string): Promise<any>
}