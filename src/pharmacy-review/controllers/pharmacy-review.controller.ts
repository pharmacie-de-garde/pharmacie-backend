// controllers/pharmacy-review.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { IPharmacyReview } from '../interfaces/pharmacy-review.interface';
import { CreatePharmacyReviewDto } from '../dtos/create-pharmacy-review.dto';
import { UpdatePharmacyReviewDto } from '../dtos/update-pharmacy-review.dto';
import { PharmacyReview } from '../schemas/pharmacy-review.schema';

@Controller('pharmacy-reviews')
@UseGuards(AuthGuard('jwt'))
export class PharmacyReviewController {
  constructor(private readonly pharmacyReview: IPharmacyReview) {}

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async getAllReviews(
    @Query('isApproved') isApproved?: boolean,
    @Query('isReported') isReported?: boolean,
  ): Promise<PharmacyReview[]> {
    return this.pharmacyReview.getAllReviews({ isApproved, isReported });
  }

  @Get('pharmacy/:pharmacyId')
  @HttpCode(HttpStatus.OK)
  async getPharmacyReviews(
    @Param('pharmacyId') pharmacyId: string,
  ): Promise<PharmacyReview[]> {
    return this.pharmacyReview.getPharmacyReviews(pharmacyId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReview(
    @Body() createReviewDto: CreatePharmacyReviewDto,
    @Req() req,
  ): Promise<PharmacyReview> {
    return this.pharmacyReview.createReview(req.user.id, createReviewDto);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdatePharmacyReviewDto,
  ): Promise<PharmacyReview> {
    return this.pharmacyReview.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(@Param('id') id: string): Promise<void> {
    return this.pharmacyReview.deleteReview(id);
  }

  @Post(':id/report')
  @HttpCode(HttpStatus.OK)
  async reportReview(
    @Param('id') id: string,
    @Body('reason') reason: string,
  ): Promise<PharmacyReview> {
    return this.pharmacyReview.reportReview(id, reason);
  }

  @Put(':id/approve')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async approveReview(@Param('id') id: string): Promise<PharmacyReview> {
    return this.pharmacyReview.approveReview(id);
  }
}
