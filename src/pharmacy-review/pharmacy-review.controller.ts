import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PharmacyReviewService } from './pharmacy-review.service';
import { CreatePharmacyReviewDto } from './dto/create-pharmacy-review.dto';
import { UpdatePharmacyReviewDto } from './dto/update-pharmacy-review.dto';

@Controller('pharmacy-review')
export class PharmacyReviewController {
  constructor(private readonly pharmacyReviewService: PharmacyReviewService) {}

  @Post()
  create(@Body() createPharmacyReviewDto: CreatePharmacyReviewDto) {
    return this.pharmacyReviewService.create(createPharmacyReviewDto);
  }

  @Get()
  findAll() {
    return this.pharmacyReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmacyReviewService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePharmacyReviewDto: UpdatePharmacyReviewDto,
  ) {
    return this.pharmacyReviewService.update(+id, updatePharmacyReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacyReviewService.remove(+id);
  }
}
