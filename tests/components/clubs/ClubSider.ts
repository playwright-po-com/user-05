import { type Locator, type Page } from "@playwright/test";
import { BaseComponent } from "../../pages/base/BaseComponent";
import { ClubCard } from "./ClubCard";

export class ClubSider extends BaseComponent {
  public readonly PAGE_TITLE_PREFIX = "Гуртки у місті" as const;
  private readonly title: Locator;
  private readonly clubCards: Locator;

  constructor(page: Page) {
    super(page, page.locator(".club-sider"));
    this.title = this.root.getByRole("heading", { level: 2 });
    this.clubCards = this.root.locator(".card");
  }

  async waitForLoaded(): Promise<void> {
    await this.title.waitFor({ state: "visible" });
    await this.clubCards.first().waitFor({ state: "visible" });
  }

  getTitleLocator(): Locator {
    return this.title;
  }

  getCardsLocator(): Locator {
    return this.clubCards;
  }

  getCardByName(clubName: string): ClubCard {
  const cardRoot = this.clubCards.filter({ hasText: clubName });
  return new ClubCard(this.page, cardRoot);
}

   getFirstCard(): ClubCard {
    return new ClubCard(this.page, this.clubCards.first());
  }
}
