import {
  Controller,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PharmacyReviewService } from '../providers/pharmacy-review.service';
import { PharmacyReview } from '../schemas/pharmacy-review.schema';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('pharmacy-review')
export class PharmacyReviewController {
  constructor(private readonly pharmacyReviewService: PharmacyReviewService) {}

  @Post(':id/report')
  @HttpCode(HttpStatus.OK)
  async reportReview(
    @Param('id') id: string,
    @Body('reason') reason: string,
  ): Promise<PharmacyReview> {
    return this.pharmacyReviewService.reportReview(id, reason);
  }

  @Put(':id/approve')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async approveReview(@Param('id') id: string): Promise<PharmacyReview> {
    return this.pharmacyReviewService.approveReview(id);
  }
}
