import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /** Create or update a user upon login/registration */
  async upsertUser(userData: Partial<User>): Promise<User> {
    const { firebase_uid, email } = userData;
    
    let user: User | null = null;

    if (firebase_uid) {
      user = await this.userRepository.findOne({ where: { firebase_uid } });
    } else if (email) {
      user = await this.userRepository.findOne({ where: { email } });
    }

    if (user) {
      // Update existing user
      Object.assign(user, userData);
      return this.userRepository.save(user);
    } else {
      // Create new user
      const newUser = this.userRepository.create({
          ...userData,
          role: userData.role || UserRole.USER
      });
      return this.userRepository.save(newUser);
    }
  }

  /** Get all users for admin panel */
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: { created_at: 'DESC' }
    });
  }

  /** Get user by Firebase UID */
  async findByUid(uid: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { firebase_uid: uid } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
