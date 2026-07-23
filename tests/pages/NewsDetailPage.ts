import { Locator, type Page } from '@playwright/test';
import { SearchablePage } from './base/SearchablePage';
import { ROUTES } from '../config/app.config';
import { NewsCarousel } from '../components/news/NewsCarousel';
import { SocialInfo } from '../components/news/SocialInfo';

export class NewsDetailPage extends SearchablePage {
  public readonly EXPECTED_TITLE = 'Зимові канікули з користю: гуртки, що працюють у грудні-січні' as const;
  public readonly EXPECTED_CONTENT_PART = 'Зимові канікули' as const;
  public readonly NEWS_DETAIL_URL_REGEX = new RegExp(`${ROUTES.newsDetail(8)}\/?$`);

  private readonly newsImage: Locator;
  private readonly title: Locator;
  private readonly date: Locator;
  private readonly text: Locator;

  private readonly newsCarousel: NewsCarousel;
  private readonly socialInfo: SocialInfo;
  
  constructor(page: Page) {
    super(page);
    this.newsImage = page.locator('.news-page .image');
    this.title = page.locator('#major-title');
    this.date = page.locator('.content-title');
    this.text = page.locator('.content-text');
    this.newsCarousel = new NewsCarousel(page);
    this.socialInfo = new SocialInfo(page);
  }

  async gotoNewsDetailPage(id: number | string): Promise<void> {
    await this.page.goto(ROUTES.newsDetail(id));
  }

  async getTitleText(): Promise<string> {
    return (await this.title.innerText()).trim();
  }

  async getDateText(): Promise<string> {
    return (await this.date.innerText()).trim();
  }

  async getContentText(): Promise<string> {
    return (await this.text.innerText()).trim();
  }

  getTitleLocator(): Locator {
    return this.title;
  }

  getDateLocator(): Locator {
    return this.date;
  }

  getTextLocator(): Locator {
    return this.text;
  }

  getImageLocator(): Locator {
    return this.newsImage;
  }

  getNewsCarousel(): NewsCarousel {
    return this.newsCarousel;
  }
  getSocialInfo(): SocialInfo {
    return this.socialInfo;
  }

}
