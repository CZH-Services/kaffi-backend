import { Injectable, NotFoundException } from '@nestjs/common';
import { createFaqCategory } from './dto/createFaqCategory';
import { updateFaqCategory } from './dto/updateFaqCategory';
import { FAQCategory } from './entities/faqcategory';
import { FAQCategoryRepository } from './faqcategories.repository';
import { FAQCategoryResponse } from './faqcategories.response';

@Injectable()
export class FAQCategoryService {
  constructor(private readonly faqcategoryrepository: FAQCategoryRepository) {}

  async getFAQCategories(): Promise<FAQCategoryResponse[]> {
    const faqcategories = this.faqcategoryrepository.getFaqCategories();
    return (await faqcategories).map(
      (faqcategory) => <FAQCategoryResponse>faqcategory,
    );
  }

  async createFaqCategory(category: createFaqCategory): Promise<boolean> {
    const created = await this.faqcategoryrepository.createFaqCategory(
      <FAQCategory>category,
    );
    if (!created) {
      throw new NotFoundException('FAQ Category could not be created');
    }
    return created;
  }

  async updateFaqCategory(faqcategory: updateFaqCategory): Promise<boolean> {
    const updated = await this.faqcategoryrepository.updateFaqCategory(
      <FAQCategory>faqcategory,
    );
    if (!updated) {
      throw new NotFoundException('FAQ Category not found');
    }
    return updated;
  }

  async deleteFaqCategory(id: number): Promise<boolean> {
    const deleted = await this.faqcategoryrepository.deleteFaqCategory(id);
    if (!deleted) {
      throw new NotFoundException('FAQ Category not found');
    }
    return deleted;
  }
}
