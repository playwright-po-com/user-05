import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';
import { NewsCarouselCard } from './NewsCarouselCard';

export class NewsCarousel extends BaseComponent {
  private readonly cards: Locator;
  private readonly nextButton: Locator;
  private readonly prevButton: Locator;

  constructor(page: Page) {
    super(page, page.locator('.other-news'));
    this.cards = this.root.locator('.carousel-item');
    this.nextButton = this.root.locator('.anticon-arrow-right');
    this.prevButton = this.root.locator('.anticon-arrow-left');
  }

  getCardByTitle(title: string): NewsCarouselCard {
    const cardRoot = this.cards.filter({ hasText: title });
    return new NewsCarouselCard(this.page, cardRoot);
  }

  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  async clickPrev(): Promise<void> {
    await this.prevButton.click();
  }
  
}