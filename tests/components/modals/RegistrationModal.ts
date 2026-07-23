import { type Locator, type Page } from "@playwright/test";
import { BaseModal } from "./BaseModal";
export interface RegistrationData {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
}

export class RegistrationModal extends BaseModal {
  public readonly TITLE = "Реєстрація" as const;
  public readonly SUBTITLE =
    "Приєднуйтесь до ініціативи «Навчай українською»" as const;
  public readonly SUBMIT_LABEL = "Зареєструватися" as const;

  private readonly title: Locator;
  private readonly subtitle: Locator;
  private readonly visitorRoleOption: Locator;
  private readonly managerRoleOption: Locator;
  private readonly lastNameInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly phoneInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page, page.locator(".modal-registration"));
    this.title = this.root.locator(".registration-title");
    this.subtitle = this.root.locator(".registration-subtitle");
    this.visitorRoleOption = this.root.getByText("Відвідувач", { exact: true });
    this.managerRoleOption = this.root.getByText("Керівник", { exact: true });
    this.lastNameInput = this.root.locator("#lastName");
    this.firstNameInput = this.root.locator("#firstName");
    this.phoneInput = this.root.locator("#phone");
    this.emailInput = this.root.locator("#email");
    this.passwordInput = this.root.locator("#password");
    this.confirmPasswordInput = this.root.locator("#confirm");
    this.submitButton = this.root.getByRole("button", {
      name: this.SUBMIT_LABEL,
      exact: true,
    });
  }

  getModalRoot(): Locator {
    return this.root;
  }

  getTitleLocator(): Locator {
    return this.title;
  }

  getSubtitleLocator(): Locator {
    return this.subtitle;
  }

  getVisitorRoleOption(): Locator {
    return this.visitorRoleOption;
  }

  getManagerRoleOption(): Locator {
    return this.managerRoleOption;
  }

  getLastNameInput(): Locator {
    return this.lastNameInput;
  }

  getFirstNameInput(): Locator {
    return this.firstNameInput;
  }

  getPhoneInput(): Locator {
    return this.phoneInput;
  }

  getEmailInput(): Locator {
    return this.emailInput;
  }

  getPasswordInput(): Locator {
    return this.passwordInput;
  }

  getConfirmPasswordInput(): Locator {
    return this.confirmPasswordInput;
  }

  getSubmitButton(): Locator {
    return this.submitButton;
  }

  async selectRole(role: "Відвідувач" | "Керівник"): Promise<void> {
    if (role === "Відвідувач") {
      await this.visitorRoleOption.click();
    } else if (role === "Керівник") {
      await this.managerRoleOption.click();
    }
  }

  async selectVisitorRole(): Promise<void> {
    await this.selectRole("Відвідувач");
  }

  async selectManagerRole(): Promise<void> {
    await this.selectRole("Керівник");
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async fillPhone(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string): Promise<void> {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async fillRegistrationForm(data: RegistrationData): Promise<void> {
    await this.fillLastName(data.lastName);
    await this.fillFirstName(data.firstName);
    await this.fillPhone(data.phone);
    await this.fillEmail(data.email);
    await this.fillPassword(data.password);
    await this.fillConfirmPassword(data.confirm);
  }

  async register(
    data: RegistrationData,
    role?: "Відвідувач" | "Керівник",
  ): Promise<void> {
    if (role) await this.selectRole(role);
    await this.fillRegistrationForm(data);
    await this.submit();
  }
}
