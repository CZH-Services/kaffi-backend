import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BuddyRespository } from './buddies.respository';
import { CreateBuddiesRequest } from './dto/createBuddiesRequest';
import { GetBuddiesResponse } from './dto/getBuddiesResponse';

@Injectable()
export class BuddyService {
  constructor(private readonly blogsRespository: BuddyRespository) {}

  async findAllBuddies(): Promise<GetBuddiesResponse[]> {
    return await this.blogsRespository.findAllBuddies();
  }

  async findUserBuddies(userId: number): Promise<GetBuddiesResponse[]> {
    return await this.blogsRespository.findUserBuddies(userId);
  }

  async createBuddiesConnection(data: CreateBuddiesRequest): Promise<boolean> {
    return await this.blogsRespository.createBuddiesConnection(data);
  }

  async deleteBuddiesConnection(id: number): Promise<boolean> {
    const deleteResponse = await this.blogsRespository.deleteBuddiesConnection(
      id,
    );
    if (!deleteResponse) {
      throw new HttpException(
        'Buddy connection not Found',
        HttpStatus.NOT_FOUND,
      );
    }
    return deleteResponse;
  }
}
