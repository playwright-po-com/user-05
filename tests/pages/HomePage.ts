import { type Locator, type Page } from '@playwright/test';
import { ROUTES } from '../config/app.config';
import { SearchablePage } from './base/SearchablePage';
import { RegistrationModal } from '../components/modals/RegistrationModal';
import { LoginModal } from '../components/modals/LoginModal';

export class HomePage extends SearchablePage {
  public readonly ADD_CLUB_BUTTON_LABEL = 'Додати гурток' as const;

  private readonly addClubButton: Locator;
  private readonly loginModal: LoginModal;
  private readonly registrationModal: RegistrationModal;

  constructor(page: Page) {
    super(page);
    this.addClubButton = page.getByRole('button', {
      name: this.ADD_CLUB_BUTTON_LABEL,
      exact: true,
    });
    this.loginModal = new LoginModal(page);
    this.registrationModal = new RegistrationModal(page);
  }

  async gotoHomePage(): Promise<void> {
    await this.open(ROUTES.home);
  }

  async openProfileMenu(): Promise<void> {
    await this.header.openProfileMenu();
  }

  async openLoginFromProfile(): Promise<void> {
    await this.header.openProfileMenu();
    await this.header.clickLoginMenuItem();
    await this.loginModal.waitForOpen();
  }

  async openRegistrationFromProfile(): Promise<void> {
    await this.header.openProfileMenu();
    await this.header.clickRegisterMenuItem();
    await this.registrationModal.waitForOpen();
  }

  async openLoginFromAddClub(): Promise<void> {
    await this.addClubButton.click();
    await this.loginModal.waitForOpen();
  }

  getLoginModal(): LoginModal {
    return this.loginModal;
  } 

  getRegistrationModal(): RegistrationModal {
    return this.registrationModal;
  }

  getAddClubButton(): Locator {
    return this.addClubButton;
  }

}
