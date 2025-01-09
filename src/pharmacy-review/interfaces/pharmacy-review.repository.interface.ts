import { PharmacyReview } from '../schemas/pharmacy-review.schema';
import { CreatePharmacyReviewDto } from '../dtos/create-pharmacy-review.dto';
import { UpdatePharmacyReviewDto } from '../dtos/update-pharmacy-review.dto';

export interface IPharmacyReviewRepository {
  findAll(filters?: {
    isApproved?: boolean;
    isReported?: boolean;
  }): Promise<PharmacyReview[]>;
  findById(id: string): Promise<PharmacyReview | null>;
  findByPharmacy(
    pharmacyId: string,
    approved?: boolean,
  ): Promise<PharmacyReview[]>;
  create(
    review: CreatePharmacyReviewDto & { userId: string },
  ): Promise<PharmacyReview>;
  update(
    id: string,
    updateData: UpdatePharmacyReviewDto,
  ): Promise<PharmacyReview | null>;
  delete(id: string): Promise<boolean>;
  updateReportStatus(
    id: string,
    reason: string,
  ): Promise<PharmacyReview | null>;
  updateApprovalStatus(
    id: string,
    isApproved: boolean,
  ): Promise<PharmacyReview | null>;
}
