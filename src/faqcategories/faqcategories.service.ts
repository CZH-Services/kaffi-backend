import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { max } from 'class-validator';
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
    const rank = await this.faqcategoryrepository.getHighestFAQTagRank();
    const newcategory = <FAQCategory>category;
    newcategory.rank = rank + 1;

    const created = await this.faqcategoryrepository.createFaqCategory(
      <FAQCategory>newcategory,
    );
    if (!created) {
      throw new NotFoundException('FAQ Category could not be created');
    }
    return created;
  }

  async updateFaqCategory(
    updatedfaqcategory: updateFaqCategory,
  ): Promise<boolean> {
    const maxRank = await this.faqcategoryrepository.getHighestFAQTagRank();

    const category = await this.faqcategoryrepository.getFaqCategory(
      updatedfaqcategory.id,
    );

    if (updatedfaqcategory.rank > maxRank || updatedfaqcategory.rank <= 0) {
      throw new ForbiddenException('Invalid rank');
    }

    if (updatedfaqcategory.rank !== category.rank) {
      const increment = updatedfaqcategory.rank > category.rank;
      const minRank = increment ? category.rank + 1 : updatedfaqcategory.rank;
      const maxRank = increment ? updatedfaqcategory.rank : category.rank - 1;
      await this.faqcategoryrepository.updateFAQCategoryRanks(
        minRank,
        maxRank,
        !increment,
      );
    }

    const updated = await this.faqcategoryrepository.updateFaqCategory(
      <FAQCategory>updatedfaqcategory,
    );
    if (!updated) {
      throw new NotFoundException('FAQ Category not found');
    }
    return updated;
  }

  async deleteFaqCategory(id: number): Promise<boolean> {
    const tag = await this.faqcategoryrepository.getFaqCategory(id);
    await this.faqcategoryrepository.decreaseFaqRanks(tag.rank);

    const deleted = await this.faqcategoryrepository.deleteFaqCategory(id);
    if (!deleted) {
      throw new NotFoundException('FAQ Category not found');
    }
    return deleted;
  }
}
