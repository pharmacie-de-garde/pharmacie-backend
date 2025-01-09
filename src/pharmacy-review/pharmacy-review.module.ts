import { Module } from '@nestjs/common';
import { PharmacyReviewService } from './pharmacy-review.service';
import { PharmacyReviewController } from './pharmacy-review.controller';

@Module({
  controllers: [PharmacyReviewController],
  providers: [PharmacyReviewService],
})
export class PharmacyReviewModule {}
