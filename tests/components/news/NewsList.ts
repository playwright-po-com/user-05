import { Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';
import { NewsCard } from './NewsCard';

export class NewsList extends BaseComponent {
  private readonly newsCards: Locator;
  
  constructor(page: Page) {
    super(page, page.locator('.news-content'));
    this.newsCards = this.root.locator('#newsContainer')
  }

  waitForLoaded(): Promise<void> {
    return this.newsCards.first().waitFor({ state: 'visible' });
  }

  getFirstCard(): NewsCard {
    return new NewsCard(this.page, this.newsCards.first());
  }

  getCardByTitle(title: string): NewsCard {
    const cardRoot = this.newsCards.filter({ hasText: title });
    return new NewsCard(this.page, cardRoot);
  } 
}
