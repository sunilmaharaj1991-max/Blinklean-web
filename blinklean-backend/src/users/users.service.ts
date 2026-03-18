import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRole } from './users.entity';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UsersService {
  private readonly collectionName = 'users';

  constructor(private readonly firebaseService: FirebaseService) {}

  private get collection() {
    return this.firebaseService.getCollection(this.collectionName);
  }

  /** Create or update a user upon login/registration */
  async upsertUser(userData: Partial<User>): Promise<any> {
    const { firebase_uid } = userData;

    if (!firebase_uid) {
      throw new Error('Firebase UID is required for upserting user');
    }

    const userDocRef = this.collection.doc(firebase_uid);
    const userDoc = await userDocRef.get();

    const timestamp = new Date();

    if (userDoc.exists) {
      // Update existing user
      const updatedData = {
        ...userData,
        updated_at: timestamp,
      };
      await userDocRef.set(updatedData, { merge: true });
      return { id: firebase_uid, ...userDoc.data(), ...updatedData };
    } else {
      // Create new user
      const newUser = {
        ...userData,
        role: userData.role || UserRole.USER,
        created_at: timestamp,
        updated_at: timestamp,
      };
      await userDocRef.set(newUser);
      return { id: firebase_uid, ...newUser };
    }
  }

  /** Get all users for admin panel */
  async findAll(): Promise<any[]> {
    const snapshot = await this.collection.orderBy('created_at', 'desc').get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  /** Get user by Firebase UID */
  async findByUid(uid: string): Promise<any> {
    const userDoc = await this.collection.doc(uid).get();
    if (!userDoc.exists) throw new NotFoundException('User not found');
    return { id: userDoc.id, ...userDoc.data() };
  }
}
