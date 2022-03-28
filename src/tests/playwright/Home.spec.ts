import { expect, test } from "@playwright/test";

test.describe("From home page", () => {
  const url = "https://tmdb-ten.vercel.app/";

  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto(url);
  });

  test("should navigate to movie details page", async ({ page }) => {
    // Locate all movies
    const all_movies_locator = "//a[div]";
    const all_movies = page.locator(all_movies_locator);

    // Expect to have 20 movies and take screenshot
    const all_movies_innerTexts = await all_movies.allInnerTexts();
    expect(all_movies_innerTexts).toHaveLength(20);
    await page.screenshot({
      fullPage: true,
      path: "src/tests/playwright/screenshots/home.png",
    });

    // Get first movie href
    const first_movie_page = await all_movies.first();
    const first_movie_page_url = await first_movie_page.getAttribute("href");

    // Click the first movie and wait for DOM content to be loaded
    await first_movie_page.click();
    await page.waitForLoadState("domcontentloaded");

    // Expect page url to be equal url + first_movie_page_url
    // `https://tmdb-ten.vercel.app/${first_movie_page_url}`
    // and take screenshot
    await expect(page).toHaveURL(url + first_movie_page_url);
    await page.screenshot({
      fullPage: true,
      path: "src/tests/playwright/screenshots/movieDetails.png",
    });
  });
});
