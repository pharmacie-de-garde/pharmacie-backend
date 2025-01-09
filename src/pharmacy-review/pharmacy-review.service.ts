import { Injectable } from '@nestjs/common';
import { CreatePharmacyReviewDto } from './dto/create-pharmacy-review.dto';
import { UpdatePharmacyReviewDto } from './dto/update-pharmacy-review.dto';

@Injectable()
export class PharmacyReviewService {
  create(createPharmacyReviewDto: CreatePharmacyReviewDto) {
    return 'This action adds a new pharmacyReview';
  }

  findAll() {
    return `This action returns all pharmacyReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pharmacyReview`;
  }

  update(id: number, updatePharmacyReviewDto: UpdatePharmacyReviewDto) {
    return `This action updates a #${id} pharmacyReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} pharmacyReview`;
  }
}
