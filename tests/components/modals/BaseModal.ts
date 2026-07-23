import { type Locator, type Page } from '@playwright/test';
import { BaseComponent } from '../../pages/base/BaseComponent';
import { OAuthBlock } from '../oauth/OAuthBlock';

export abstract class BaseModal extends BaseComponent {
  protected readonly closeButton: Locator;
  protected readonly oauth: OAuthBlock;

  constructor(page: Page, root: Locator) {
    super(page, root);
    this.closeButton = this.root.locator('.ant-modal-close');
    this.oauth = new OAuthBlock(page, this.root);
  }

  getOAuthBlock(): OAuthBlock {
    return this.oauth;
  }

  async waitForOpen(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  async waitForClosed(): Promise<void> {
    await this.root.waitFor({ state: 'hidden' });
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await this.waitForClosed();
  }

  isOpen(): Promise<boolean> {
    return this.root.isVisible();
  }

  getRootLocator(): Locator {
    return this.root;
  }
}
