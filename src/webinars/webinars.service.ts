import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddWebinarRequest } from './dto/addWebinarRequest';
import { AddWebinarStepRequest } from './dto/addWebinarStepRequest';
import { GetWebinarResponse } from './dto/getWebinarResponse';
import { UpdateWebinarRequest } from './dto/updateWebinarRequest';
import { UpdateWebinarStepRequest } from './dto/updateWebinarStepRequest';
import { WebinarStep } from './entities/webinarStep';
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
    const highestRank = <number>(
      await this.webinarRepository.getHighestWebinarRanks()
    );
    if (info.rank > highestRank || info.rank <= 0) {
      throw new HttpException('Invalid Rank', HttpStatus.NOT_FOUND);
    }

    const prevWebinar = await this.webinarRepository.findOne(<number>info.id);
    if (!prevWebinar) {
      throw new HttpException('Webinar not Found', HttpStatus.NOT_FOUND);
    }
    if (info.rank !== prevWebinar.rank) {
      const increment = info.rank > prevWebinar.rank;
      const minRank = increment ? prevWebinar.rank + 1 : info.rank;
      const maxRank = increment ? info.rank : prevWebinar.rank - 1;
      await this.webinarRepository.updateWebinarsRank(
        minRank,
        maxRank,
        !increment,
      );
    }
    const updateResponse = await this.webinarRepository.updateWebinar(
      <UpdateWebinarRequest>info,
    );
    return <boolean>updateResponse;
  }

  async deleteWebinar(id: number): Promise<boolean> {
    await this.webinarRepository.deleteWebinarSteps(id);
    const deleteResponse = await this.webinarRepository.deleteWebinar(id);
    return <boolean>deleteResponse;
  }

  async getAllWebinarSteps(webinarId: number): Promise<WebinarStep[]> {
    const webinarSteps = await this.webinarRepository.getAllWebinarSteps(
      webinarId,
    );
    return webinarSteps;
  }

  async getWebinarStep(id: number): Promise<WebinarStep> {
    const webinarStep = await this.webinarRepository.getWebinarStep(id);
    if (!webinarStep) {
      throw new HttpException('Webinar Step not Found', HttpStatus.NOT_FOUND);
    }
    return <WebinarStep>webinarStep;
  }

  async addWebinarStep(step: AddWebinarStepRequest): Promise<boolean> {
    const webinar = await this.webinarRepository.findOne(
      <number>step.webinarId,
    );
    if (!webinar) {
      throw new HttpException('Webinar not Found', HttpStatus.NOT_FOUND);
    }
    const rank =
      <number>(
        await this.webinarRepository.getHighestWebinarStepsRanks(
          <number>webinar.id,
        )
      ) + 1;

    const insertResponse = await this.webinarRepository.addWebinarStep(
      <AddWebinarStepRequest>step,
      <number>rank,
    );
    return <boolean>insertResponse;
  }

  async updateWebinarStep(step: UpdateWebinarStepRequest): Promise<boolean> {
    const prevStep = await this.webinarRepository.getWebinarStep(
      <number>step.id,
    );
    if (!prevStep) {
      throw new HttpException('Webinar Step not Found', HttpStatus.NOT_FOUND);
    }

    const highestRank = <number>(
      await this.webinarRepository.getHighestWebinarStepsRanks(
        <number>prevStep.webinarId,
      )
    );
    if (step.rank > highestRank || step.rank <= 0) {
      throw new HttpException('Invalid Rank', HttpStatus.BAD_REQUEST);
    }
    if (step.rank !== prevStep.rank) {
      const increment = step.rank > prevStep.rank;
      const minRank = increment ? prevStep.rank + 1 : step.rank;
      const maxRank = increment ? step.rank : prevStep.rank - 1;
      await this.webinarRepository.updateWebinarStepRank(
        minRank,
        maxRank,
        !increment,
      );
    }

    const updateResponse = await this.webinarRepository.updateWebinarStep(
      <UpdateWebinarStepRequest>step,
    );
    return <boolean>updateResponse;
  }

  async deleteWebinarStep(id: number): Promise<boolean> {
    const deleteResponse = await this.webinarRepository.deleteWebinarStep(id);
    return <boolean>deleteResponse;
  }
}
