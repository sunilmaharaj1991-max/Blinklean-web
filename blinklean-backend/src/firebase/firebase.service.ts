import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);
  private _firestore: admin.firestore.Firestore;
  private _auth: admin.auth.Auth;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
    const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');

    if (projectId && clientEmail && privateKey) {
      this.logger.log('Initializing Firebase with provided credentials...');
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      this.logger.warn(
        'Firebase credentials not found in environment variables. Attempting default initialization...',
      );
      // This will use GOOGLE_APPLICATION_CREDENTIALS or default metadata service if on GCP
      try {
        admin.initializeApp();
      } catch (error) {
        this.logger.error('Failed to initialize Firebase: ' + error.message);
      }
    }

    this._firestore = admin.firestore();
    this._auth = admin.auth();
  }

  get firestore() {
    return this._firestore;
  }

  get auth() {
    return this._auth;
  }

  /**
   * Helper to get a collection reference
   */
  getCollection(collectionName: string) {
    return this._firestore.collection(collectionName);
  }
}
