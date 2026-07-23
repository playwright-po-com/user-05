import { Locator, type Page } from '@playwright/test';
import { PaginatedListPage } from './base/PaginatedListPage';
import { NewsList } from '../components/news/NewsList';
import { ClubSider } from '../components/clubs/ClubSider';
import { ROUTES } from '../config/app.config';

export class NewsPage extends PaginatedListPage {
  public readonly PAGE_TITLE = 'Новини' as const;
  private readonly pageTitle: Locator;
  private newsList: NewsList;
  private clubSider: ClubSider;
  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: this.PAGE_TITLE, exact: true });
    this.newsList = new NewsList(page);
    this.clubSider = new ClubSider(page);
  }

  async gotoNewsPage(): Promise<void> {
    await this.open(ROUTES.news);
}

async waitForNewsLoaded(): Promise<void> {
    await this.newsList.waitForLoaded();
  }

  getNewsList(): NewsList {
    return this.newsList;
  }

  getPageTitleLocator(): Locator {
    return this.pageTitle;
  }

  getClubSider(): ClubSider {
    return this.clubSider;
  }

}
