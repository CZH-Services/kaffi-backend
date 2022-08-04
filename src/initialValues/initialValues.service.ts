import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GetInitialValues } from './dto/getInitialValues';
import { UpdateInitialValues } from './dto/updateInitialValues';
import { InitialValuesRespository } from './initialValues.repository';

@Injectable()
export class InitialValuesService {
  constructor(
    private readonly initialValuesRespository: InitialValuesRespository,
  ) {}

  async getInitialValues(): Promise<GetInitialValues> {
    return await this.initialValuesRespository.getInitialValues();
  }

  async updateInitialValues(data: UpdateInitialValues): Promise<boolean> {
    return await this.initialValuesRespository.updateInitialValues(data);
  }
}
