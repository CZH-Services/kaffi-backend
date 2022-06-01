import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddWebinarRequest } from './dto/addWebinarRequest';
import { GetWebinarResponse } from './dto/getWebinarResponse';
import { UpdateWebinarRequest } from './dto/updateWebinarRequest';
import { WebinarRepository } from './webinars.repository';

@Injectable()
export class WebinarService {
  constructor(private readonly webinarRepository: WebinarRepository) {}

  async findAll(): Promise<GetWebinarResponse[]> {
    const countries = await this.webinarRepository.findAllWebinars();
    return countries;
  }

  async getCountryWebinar(countryId: number): Promise<GetWebinarResponse> {
    const webinar = await this.webinarRepository.getCountryWebinar(countryId);
    if (!webinar) {
      throw new HttpException('Webinar not Found', HttpStatus.NOT_FOUND);
    }
    return <GetWebinarResponse>webinar;
  }

  async insertWebinar(info: AddWebinarRequest): Promise<boolean> {
    const rank =
      <number>await this.webinarRepository.getHighestWebinarRanks() + 1;
    const insertResponse = await this.webinarRepository.addWebinar(
      <AddWebinarRequest>info,
      <number>rank,
    );
    return insertResponse;
  }

  async updateWebinar(info: UpdateWebinarRequest): Promise<boolean> {
    const updateResponse = await this.webinarRepository.updateWebinar(
      <UpdateWebinarRequest>info,
    );
    if (!updateResponse) {
      throw new HttpException('Webinar not Found', HttpStatus.NOT_FOUND);
    }
    return <boolean>updateResponse;
  }
}
