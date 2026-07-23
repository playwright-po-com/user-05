import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { ClubsPage } from "./pages/ClubsPage";

test.describe("Guest auth & registration (inheritance POM → refactor to CO)", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.gotoHomePage();
  });

  test("Profile dropdown shows Login and Register", async () => {
    const header = homePage.getHeader();
    await homePage.openProfileMenu();
    await expect(header.getLoginMenuItem()).toBeVisible();
    await expect(header.getRegisterMenuItem()).toBeVisible();
  });

  test("Login menu item opens login modal", async () => {
    const login = homePage.getLoginModal();
    const oauth = login.getOAuthBlock();

    await homePage.openLoginFromProfile();
    await expect(login.getRootLocator()).toBeVisible();
    await expect(login.getTitleLocator()).toHaveText(login.TITLE);
    await expect(login.getSubtitleLocator()).toHaveText(login.SUBTITLE);
    await expect(oauth.getGoogleLink()).toBeVisible();
    await expect(oauth.getFacebookLink()).toBeVisible();
    await expect(login.getEmailInput()).toBeVisible();
    await expect(login.getPasswordInput()).toBeVisible();
    await expect(login.getSubmitButton()).toBeVisible();
    await expect(login.getForgotPasswordLink()).toBeVisible();
  });

  test("Register menu item opens registration modal", async () => {
    const registration = homePage.getRegistrationModal();

    await homePage.openRegistrationFromProfile();
    await expect(registration.getRootLocator()).toBeVisible();
    await expect(registration.getTitleLocator()).toHaveText(registration.TITLE);
    await expect(registration.getSubtitleLocator()).toHaveText(
      registration.SUBTITLE,
    );
    await expect(registration.getVisitorRoleOption()).toBeVisible();
    await expect(registration.getManagerRoleOption()).toBeVisible();
    await expect(registration.getLastNameInput()).toBeVisible();
    await expect(registration.getFirstNameInput()).toBeVisible();
    await expect(registration.getPhoneInput()).toBeVisible();
    await expect(registration.getEmailInput()).toBeVisible();
    await expect(registration.getPasswordInput()).toBeVisible();
    await expect(registration.getConfirmPasswordInput()).toBeVisible();
    await expect(registration.getSubmitButton()).toBeDisabled();
  });

  test("Add club button opens login modal for guest", async () => {
    const login = homePage.getLoginModal();

    await homePage.openLoginFromAddClub();
    await expect(login.getRootLocator()).toBeVisible();
    await expect(login.getTitleLocator()).toHaveText(login.TITLE);
  });

  test("Login modal shows validation errors on empty submit", async () => {
    const login = homePage.getLoginModal();

    await homePage.openLoginFromProfile();
    await login.submit();
    await expect(login.getValidationErrors()).toHaveText([
      login.VALIDATION_ERRORS_EMAIL,
      login.VALIDATION_ERRORS_PASSWORD,
    ]);
  });

  test("Home page has Add club button and navigates to clubs via menu", async ({page}) => {
    const clubsPage = new ClubsPage(page);

    await expect(homePage.getAddClubButton()).toBeVisible();
    await homePage.navigateViaTopMenu("Гуртки");
    await expect(clubsPage.getPageTitleLocator()).toBeVisible();
    await expect(clubsPage.getPageTitleLocator()).toContainText(
      ClubsPage.PAGE_TITLE_PREFIX,
    );
  });
});
