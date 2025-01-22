import { Injectable } from '@nestjs/common';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { Pharmacy } from 'src/pharmacies/schemas/pharmacy.schema';

@Injectable()
export class NotificationsService {
  private expo: Expo;

  constructor() {
    this.expo = new Expo();
  }

  async sendPharmacyReminder(pushToken: string, pharmacy: Pharmacy) {
    if (!Expo.isExpoPushToken(pushToken)) {
      throw new Error('Invalid push token');
    }

    const message: ExpoPushMessage = {
      to: pushToken,
      sound: 'default',
      title: 'Rappel Pharmacie de Garde',
      body: `N'oubliez pas de vérifier les horaires de ${pharmacy.name}. Heures d'ouverture: ${pharmacy.openingHours}`,
      data: {
        pharmacyId: pharmacy._id,
        type: 'PHARMACY_REMINDER',
      },
    };
    
    try {
        const chunks = this.expo.chunkPushNotifications([message]);
        for (let chunk of chunks) {
          await this.expo.sendPushNotificationsAsync(chunk);
        }
      } catch (error) {
        console.error('Erreur envoi notification:', error);
        throw error;
      }
    }
  }
