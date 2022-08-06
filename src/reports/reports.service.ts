import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReport } from './dto/createReport';
import { ReportResponse } from './dto/reportResponse';
import { UpdateReport } from './dto/updateReport';
import { Report } from './entities/Report';
import { ReportsRepository } from './reports.repository';

@Injectable()
export class ReportsServices {
  constructor(private readonly reportsRepository: ReportsRepository) {}

  async findAllAdmin(): Promise<ReportResponse[]> {
    return <ReportResponse[]>await this.reportsRepository.findAllAdmin();
  }

  async findAll(): Promise<ReportResponse[]> {
    return <ReportResponse[]>await this.reportsRepository.findAll();
  }

  async create(report: CreateReport, image: Object): Promise<boolean> {
    const newReport: Report = {
      id: 0,
      show: true,
      externalLink: report.externalLink,
      image: image['image'][0].filename,
    };
    return await this.reportsRepository.create(newReport);
  }

  async update(report: UpdateReport, image: Object): Promise<boolean> {
    const updatedReport: Report = {
      id: report.id,
      show: report.show,
      externalLink: report.externalLink,
      image: image['image'][0].filename,
    };
    await this.getById(report.id);
    return await this.reportsRepository.update(updatedReport);
  }

  async delete(id: number): Promise<boolean> {
    await this.getById(id);
    return await this.reportsRepository.delete(id);
  }

  async getById(id: number): Promise<ReportResponse> {
    const report = <ReportResponse>await this.reportsRepository.getById(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }
}
