import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';

export class SocialInfo extends BaseComponent {
  private readonly contactsLabel: Locator;
  private readonly socialLinks: Locator;
  private readonly helpButton: Locator;

  constructor(page: Page) {
    super(page, page.locator('.social-info'));
    
    this.contactsLabel = this.root.locator('.social-media .text');
    this.socialLinks = this.root.locator('.social-media .links a');
    this.helpButton = this.root.locator('.help-button a');
  }

  async clickHelpButton(): Promise<void> {
    await this.helpButton.click();
  }

  getContactLabelLocator(): Locator{
    return this.contactsLabel;
  }

  getHelpButtonLocator(): Locator {
    return this.helpButton;
  }

  getSocialLinksLocator(): Locator {
    return this.socialLinks;
  }
}