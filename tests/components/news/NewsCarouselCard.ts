import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

export class NewsCarouselCard extends BaseComponent {
  private readonly newsTitle: Locator;
  private readonly newsDate: Locator;
  private readonly detailsLink: Locator;

  constructor(page: Page, cardRoot: Locator) {
    super(page, cardRoot); 
    this.newsTitle = this.root.locator('#newsTitle');
    this.newsDate = this.root.locator('#newsDate');
    this.detailsLink = this.root.locator('#detailButton a');
  }

  getTextLocator(): Locator {
    return this.newsTitle;
  }

  getNewsDateLocator(): Locator {
    return this.newsDate
  }

  getDetailsLinkLocator(): Locator {
    return this.detailsLink
  }

  async openDetails(): Promise<void> {
    await this.detailsLink.click();
  }

  async getTitleText(): Promise<string> {
    return (await this.newsTitle.innerText()).trim();
  }
  
}