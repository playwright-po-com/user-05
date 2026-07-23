import { test, expect } from "@playwright/test";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";

test.describe("News (raw locators — rewrite to POM + CO)", () => {
  test("News page shows title and first article", async ({ page }) => {
    const newsPage = new NewsPage(page);
    await newsPage.gotoNewsPage();
    await newsPage.waitForNewsLoaded();
    await expect(newsPage.getPageTitleLocator()).toHaveText(
      newsPage.PAGE_TITLE,
    );

    const firstCard = newsPage.getNewsList().getFirstCard();
    await expect(firstCard.getTitleLocator()).toHaveText(
      firstCard.FIRST_CARD_TITLE,
    );
    await expect(firstCard.getDateLocator()).toHaveText(
      firstCard.FIRST_CARD_DATE,
    );
  });

  test("Open news details from list card", async ({ page }) => {
    const newsPage = new NewsPage(page);
    const newsDetailPage = new NewsDetailPage(page);
    await newsPage.gotoNewsPage();
    await newsPage.waitForNewsLoaded();

    const firstCard = newsPage.getNewsList().getFirstCard();
    await firstCard.openDetails();

    await expect(page).toHaveURL(newsDetailPage.NEWS_DETAIL_URL_REGEX);
    await expect(newsDetailPage.getTitleLocator()).toHaveText(
      newsDetailPage.EXPECTED_TITLE,
    );
    await expect(newsDetailPage.getTextLocator()).toContainText(
      newsDetailPage.EXPECTED_CONTENT_PART,
    );
  });

  test("Pagination changes news list", async ({ page }) => {
    const newsPage = new NewsPage(page);
    const newsCard = newsPage.getNewsList().getFirstCard();

    await newsPage.gotoNewsPage();
    await newsPage.waitForNewsLoaded();
    await expect(newsCard.getTitleLocator()).toHaveText(
      newsCard.FIRST_CARD_TITLE,
    );
    await newsPage.goToNextPage();
    await expect(newsCard.getTitleLocator()).toHaveText(
      newsCard.NEXT_CARD_TITLE,
    );
  });
});
