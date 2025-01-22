import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { Pharmacy } from './schemas/pharmacy.schema';
import { Types } from 'mongoose';
import { ObjectIdTransformer } from 'src/common/transformers/object_id.transformer';
import { NotificationsService } from 'src/notification/notifications.service';
@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService,
    private readonly notificationsService: NotificationsService,
  ) { }

  @Post()
  async create(@Body() pharmacy: Partial<Pharmacy>): Promise<Pharmacy> {
    return this.pharmaciesService.create(pharmacy);
  }

  @Get()
  async findAll(): Promise<Pharmacy[]> {
    return this.pharmaciesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Pharmacy> {
    try {
      const objectId = ObjectIdTransformer.toObjectId(id);
      const pharmacies = await this.pharmaciesService.findById(objectId); 
      return pharmacies
    } catch (err: any) {      
      if(err instanceof HttpException){
        throw new HttpException({ message: err.getResponse()}, err.getStatus());
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Pharmacy>): Promise<Pharmacy> {
    return this.pharmaciesService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Pharmacy> {
    return this.pharmaciesService.delete(id);
  }

  @Get('nearby')
  async findNearby(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('distance') distance: number,
  ): Promise<Pharmacy[]> {
    return this.pharmaciesService.findNearby(longitude, latitude, distance);
  }

  //notification
  @Post(':id/subscribe-notifications')
  async subscribeToNotifications(
    @Param('id') pharmacyId: string,
    @Body() subscriptionData: {
      userId: string,
      pushToken: string,
      reminderTime?: Date
    }
  ) {
    try {
      const objectId = ObjectIdTransformer.toObjectId(pharmacyId);
      const pharmacy = await this.pharmaciesService.addNotificationSubscriber(
        objectId,
        subscriptionData.userId,
        subscriptionData.pushToken,
        subscriptionData.reminderTime
      );

      // Envoyer une notification de confirmation
      await this.notificationsService.sendPharmacyReminder(
        subscriptionData.pushToken,
        pharmacy
      );

      return pharmacy;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.getResponse() }, err.getStatus());
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id/unsubscribe-notifications')
  async unsubscribeFromNotifications(
    @Param('id') pharmacyId: string,
    @Body('userId') userId: string
  ) {
    try {
      const objectId = ObjectIdTransformer.toObjectId(pharmacyId);
      return await this.pharmaciesService.removeNotificationSubscriber(
        objectId,
        userId
      );
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.getResponse() }, err.getStatus());
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':id/duty-status')
  async updateDutyStatus(
    @Param('id') pharmacyId: string,
    @Body() dutyData: {
      isOnDuty: boolean,
      startTime?: Date,
      endTime?: Date
    }
  ) {
    try {
      const objectId = ObjectIdTransformer.toObjectId(pharmacyId);
      const pharmacy = await this.pharmaciesService.updateDutyStatus(
        objectId,
        dutyData.isOnDuty,
        dutyData.startTime,
        dutyData.endTime
      );

      // Si la pharmacie est de garde, envoyer des notifications aux abonnés
      if (pharmacy.isOnDuty && pharmacy.notificationSubscribers?.length > 0) {
        for (const subscriber of pharmacy.notificationSubscribers) {
          await this.notificationsService.sendPharmacyReminder(
            subscriber.pushToken,
            pharmacy
          );
        }
      }

      return pharmacy;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException({ message: err.getResponse() }, err.getStatus());
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

