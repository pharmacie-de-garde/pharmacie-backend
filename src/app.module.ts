import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ErrorHandlerMiddleware } from './common/middlewares/error-handler.middleware';
import { PharmacyReviewModule } from './pharmacy-review/pharmacy-review.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmaciesModule } from './pharmacies/pharmacies.module';
import { FavoritePharmacyModule } from './favorate_pharmacy/favorite_pharmacy.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
    }),
    DatabaseModule,
    PharmacyReviewModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    FavoritePharmacyModule,
    PharmaciesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorHandlerMiddleware).forRoutes('*');
  }
}
