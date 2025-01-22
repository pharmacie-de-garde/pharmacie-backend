import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pharmacy } from './schemas/pharmacy.schema';
import * as mongoose from 'mongoose';
@Injectable()
export class PharmaciesService {
  constructor(
    @InjectModel(Pharmacy.name) private readonly pharmacyModel: Model<Pharmacy>,
  ) {}

  // Create a new pharmacy
  async create(pharmacy: Partial<Pharmacy>): Promise<Pharmacy> {
    return new this.pharmacyModel(pharmacy).save();
  }

  // Get all pharmacies
  async findAll(): Promise<Pharmacy[]> {
    return this.pharmacyModel.find().exec();
  }

  // Get a pharmacy by ID
  async findById(id: Types.ObjectId): Promise<Pharmacy> {
    const pharmacies = await this.pharmacyModel.findById({ _id: id }).exec();
    if(!pharmacies){
      throw new HttpException('Pharmacy not found', HttpStatus.NOT_FOUND);
    }
    return pharmacies;
  }

  // Update a pharmacy
  async update(id: string, updateData: Partial<Pharmacy>): Promise<Pharmacy> {
    return this.pharmacyModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Delete a pharmacy
  async delete(id: string): Promise<Pharmacy> {
    return this.pharmacyModel.findByIdAndDelete(id).exec();
  }

  // Find pharmacies near a location (geospatial query)
  async findNearby(longitude: number, latitude: number, distanceInMeters: number): Promise<Pharmacy[]> {
    return this.pharmacyModel
      .find({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [longitude, latitude] },
            $maxDistance: distanceInMeters,
          },
        },
      })
      .exec();
  }
  async addNotificationSubscriber(
    pharmacyId: Types.ObjectId,
    userId: string,
    pushToken: string,
    reminderTime?: Date
  ): Promise<Pharmacy> {
    const pharmacy = await this.pharmacyModel.findById(pharmacyId);
    
    if (!pharmacy) {
      throw new HttpException('Pharmacy not found', HttpStatus.NOT_FOUND);
    }

    const existingSubscriber = pharmacy.notificationSubscribers?.find(
      sub => sub.userId.toString() === userId
    );

    if (existingSubscriber) {
      existingSubscriber.pushToken = pushToken;
      if (reminderTime) {
        existingSubscriber.reminderTime = reminderTime;
      }
    } else {
      if (!pharmacy.notificationSubscribers) {
        pharmacy.notificationSubscribers = [];
      }
      
      const newSubscriber = {
        userId: new Types.ObjectId(userId) as unknown as mongoose.Schema.Types.ObjectId,
        pushToken,
        reminderTime: reminderTime || new Date()
      };
      
      pharmacy.notificationSubscribers.push(newSubscriber);
    }

    return await pharmacy.save();
  }

  async removeNotificationSubscriber(
    pharmacyId: Types.ObjectId,
    userId: string
  ): Promise<Pharmacy> {
    const pharmacy = await this.pharmacyModel.findById(pharmacyId);
    
    if (!pharmacy) {
      throw new HttpException('Pharmacy not found', HttpStatus.NOT_FOUND);
    }

    if (!pharmacy.notificationSubscribers) {
      throw new HttpException('No subscribers found', HttpStatus.NOT_FOUND);
    }

    pharmacy.notificationSubscribers = pharmacy.notificationSubscribers.filter(
      sub => sub.userId.toString() !== userId
    );

    return await pharmacy.save();
  }

  async updateDutyStatus(
    pharmacyId: Types.ObjectId,
    isOnDuty: boolean,
    startTime?: Date,
    endTime?: Date
  ): Promise<Pharmacy> {
    const pharmacy = await this.pharmacyModel.findById(pharmacyId);
    
    if (!pharmacy) {
      throw new HttpException('Pharmacy not found', HttpStatus.NOT_FOUND);
    }

    pharmacy.isOnDuty = isOnDuty;
    
    if (startTime) {
      pharmacy.dutyStartTime = startTime;
    }
    
    if (endTime) {
      pharmacy.dutyEndTime = endTime;
    }

    return await pharmacy.save();
  }

  async getNotificationSubscribers(pharmacyId: Types.ObjectId): Promise<Array<{
    userId: mongoose.Schema.Types.ObjectId;
    pushToken: string;
    reminderTime: Date;
  }>> {
    const pharmacy = await this.pharmacyModel.findById(pharmacyId);
    
    if (!pharmacy) {
      throw new HttpException('Pharmacy not found', HttpStatus.NOT_FOUND);
    }

    return pharmacy.notificationSubscribers || [];
  }
}