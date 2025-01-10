import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritePharmacy, FavoritePharmacySchema } from './favorite_pharnacy.schema';
import { FavoritePharmacyController } from './favorite_pharnacy.controller';
import { FavoritePharmacyService } from './favorite_pharnacy.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: FavoritePharmacy.name, schema: FavoritePharmacySchema }])],
    controllers: [FavoritePharmacyController],
    providers: [FavoritePharmacyService],
})
export class FavoritePharmacyModule {}
