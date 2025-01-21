import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PharmacyReviewService } from '../providers/pharmacy-review.service';
import { PharmacyReview } from '../schemas/pharmacy-review.schema';
import { CreatePharmacyReviewDto } from '../dtos/create-pharmacy-review.dto';

@Controller('pharmacy-review')
export class PharmacyReviewController {
  constructor(private readonly pharmacyReviewService: PharmacyReviewService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllReviews(
    @Query() filters: { isReported?: boolean },
  ): Promise<PharmacyReview[]> {
    console.log('filters', filters);
    return this.pharmacyReviewService.getAllReviews(filters);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReview(
    @Body('userId') userId: string,
    @Body() createReviewDto: CreatePharmacyReviewDto,
  ): Promise<PharmacyReview> {
    return this.pharmacyReviewService.createReview(userId, createReviewDto);
  }

  @Post(':id/report')
  @HttpCode(HttpStatus.OK)
  async reportReview(
    @Param('id') id: string,
    @Body('reason') reason: string,
  ): Promise<PharmacyReview> {
    return this.pharmacyReviewService.reportReview(id, reason);
  }
}
