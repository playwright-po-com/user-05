import { type Locator, type Page } from "@playwright/test";
import { BaseComponent } from "../../pages/base/BaseComponent";

export class NewsCard extends BaseComponent {
  public readonly FIRST_CARD_TITLE = "Зимові канікули з користю: гуртки, що працюють у грудні-січні" as const;
  public readonly NEXT_CARD_TITLE = "Марафон «Навчай українською»: освіта без кордонів" as const;
  public readonly FIRST_CARD_DATE = "15.12.2025" as const;
  public readonly DETAILS_LINK_LABEL = "Детальніше" as const;

  private readonly newsDate: Locator;
  private readonly newsTitle: Locator;
  private readonly detailsLink: Locator;

  constructor(page: Page, cardRoot: Locator) {
    super(page, cardRoot);
    this.newsDate = this.root.locator("#newsDate");
    this.newsTitle = this.root.locator("#newsTitle");
    this.detailsLink = this.root.getByRole("link", {
      name: new RegExp(this.DETAILS_LINK_LABEL, "i"),
    });
  }

  async openDetails(): Promise<void> {
    await this.detailsLink.click();
  }

  getTitleLocator(): Locator {
    return this.newsTitle;
  }

  getDateLocator(): Locator {
    return this.newsDate;
  }
  async getNewsTitle(): Promise<string> {
    return (await this.newsTitle.innerText()).trim();
  }

  async getNewsDate(): Promise<string> {
    return (await this.newsDate.innerText()).trim();
  }
}
