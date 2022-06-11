import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { WEBINAR_MEDIA_PATH } from 'src/constants';
import { FileStorageService } from 'src/services/FileStorageService';
import { AddWebinarRequest } from './dto/addWebinarRequest';
import { AddWebinarStepRequest } from './dto/addWebinarStepRequest';
import { GetWebinarResponse } from './dto/getWebinarResponse';
import { UpdateWebinarRequest } from './dto/updateWebinarRequest';
import { UpdateWebinarStepRequest } from './dto/updateWebinarStepRequest';
import { Webinar } from './entities/webinar';
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

  async insertWebinar(
    info: AddWebinarRequest,
    icons: object,
  ): Promise<boolean> {
    const rank =
      <number>await this.webinarRepository.getHighestWebinarRanks() + 1;
    const newWebinar: Webinar = {
      id: 0,
      rank: rank,
      youtubeUrl: info.youtubeUrl,
      countryIconUrl: icons['countryIconUrl'][0].filename,
      selectedCountryIconUrl: icons['selectedCountryIconUrl'][0].filename,
      countryId: info.countryId,
    };
    const insertResponse = await this.webinarRepository.addWebinar(newWebinar);
    return insertResponse;
  }

  async updateWebinar(
    info: UpdateWebinarRequest,
    icons: object,
  ): Promise<boolean> {
    const highestRank = <number>(
      await this.webinarRepository.getHighestWebinarRanks()
    );

    if (info.rank > highestRank || info.rank <= 0) {
      throw new ForbiddenException('Invalid Rank');
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

    const updatedWebinar: Webinar = {
      id: info.id,
      rank: info.rank,
      youtubeUrl: info.youtubeUrl,
      countryId: prevWebinar.countryId,
      ...(icons['countryIconUrl'] && {
        countryIconUrl: icons['countryIconUrl'][0].filename,
      }),
      ...(icons['selectedCountryIconUrl'] && {
        selectedCountryIconUrl: icons['selectedCountryIconUrl'][0].filename,
      }),
    };

    if (icons['countryIconUrl']) {
      FileStorageService.deleteFileFromStorage(
        WEBINAR_MEDIA_PATH + prevWebinar.countryIconUrl,
      );
    }
    if (icons['selectedCountryIconUrl']) {
      FileStorageService.deleteFileFromStorage(
        WEBINAR_MEDIA_PATH + prevWebinar.selectedCountryIconUrl,
      );
    }

    const updateResponse = await this.webinarRepository.updateWebinar(
      updatedWebinar,
    );
    return <boolean>updateResponse;
  }

  async deleteWebinar(id: number): Promise<boolean> {
    const webinar = await this.webinarRepository.findOne(id);
    if (!webinar) {
      throw new HttpException('Webinar not Found', HttpStatus.NOT_FOUND);
    }
    this.webinarRepository.updateWebinarsRank(webinar.rank + 1, -1, false);
    await this.webinarRepository.deleteWebinarSteps(id);
    FileStorageService.deleteFileFromStorage(
      WEBINAR_MEDIA_PATH + webinar.countryIconUrl,
    );
    FileStorageService.deleteFileFromStorage(
      WEBINAR_MEDIA_PATH + webinar.selectedCountryIconUrl,
    );
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
    const webinarStep = await this.webinarRepository.getWebinarStep(id);
    if (!webinarStep) {
      throw new HttpException('Webinar Step not Found', HttpStatus.NOT_FOUND);
    }
    this.webinarRepository.updateWebinarStepRank(
      webinarStep.rank + 1,
      -1,
      false,
    );
    const deleteResponse = await this.webinarRepository.deleteWebinarStep(id);
    return <boolean>deleteResponse;
  }
}
