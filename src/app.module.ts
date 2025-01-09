import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PharmacyReviewModule } from './pharmacy-review/pharmacy-review.module';

@Module({
  imports: [PharmacyReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
