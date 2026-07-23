import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "../../pages/base/BaseComponent";


export class OAuthBlock extends BaseComponent {
  private readonly googleLink: Locator;
  private readonly facebookLink: Locator;

  constructor(page: Page, root: Locator) {
    super(page, root);
    this.googleLink = this.root.locator('a[href*="oauth2/authorize/google"]');
    this.facebookLink = this.root.locator('a[href*="oauth2/authorize/facebook"]');
  }
  getOAuthRoot(): Locator {
    return this.root;
  }

  getGoogleLink(): Locator {
    return this.googleLink;
  }

  getFacebookLink(): Locator {
    return this.facebookLink;
  }

  async clickGoogle(): Promise<void> {
    await this.googleLink.click();
  }

  async clickFacebook(): Promise<void> {
    await this.facebookLink.click();
  }
}