import { type Locator, type Page } from '@playwright/test';
import { BaseModal } from './BaseModal';
export class LoginModal extends BaseModal {
  public readonly TITLE = 'Вхід' as const;
  public readonly SUBTITLE = 'Раді вас бачити знову на платформі' as const;
  public readonly SUBMIT_LABEL = 'Увійти' as const;
  public readonly FORGOT_PASSWORD_LABEL = 'Забули пароль?' as const;
  public readonly VALIDATION_ERRORS_EMAIL = 'Please enter Емейл';
  public readonly VALIDATION_ERRORS_PASSWORD = 'Please enter Пароль';

  private readonly title: Locator;
  private readonly subtitle: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly validationErrors: Locator;

  constructor(page: Page) {
    super(page, page.locator('.modal-login'));
    this.title = this.root.locator('.login-title');
    this.subtitle = this.root.locator('.login-subtitle');
    this.emailInput = this.root.locator('#basic_email');
    this.passwordInput = this.root.locator('#basic_password');
    this.submitButton = this.root.getByRole('button', { name: this.SUBMIT_LABEL, exact: true });
    this.forgotPasswordLink = this.root.getByRole('link', { name: this.FORGOT_PASSWORD_LABEL });
    this.validationErrors = this.root.locator('.ant-form-item-explain-error');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  getTitleLocator(): Locator {
    return this.title;
  }

  getSubtitleLocator(): Locator {
    return this.subtitle;
  }

  getEmailInput(): Locator {
    return this.emailInput;
  }

  getPasswordInput(): Locator {
    return this.passwordInput;
  }

  getSubmitButton(): Locator {
    return this.submitButton;
  }

  getForgotPasswordLink(): Locator {
    return this.forgotPasswordLink;
  }

  getValidationErrors(): Locator {
    return this.validationErrors;
  }
}
