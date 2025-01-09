import { PartialType } from '@nestjs/mapped-types';
import { CreatePharmacyReviewDto } from './create-pharmacy-review.dto';

export class UpdatePharmacyReviewDto extends PartialType(
  CreatePharmacyReviewDto,
) {
  isApproved?: boolean;
  isReported?: boolean;
  reportReason?: string;
}
