import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/leaderboards");
});

test.describe("Filters navigate to proper URL", () => {
  test("History radio adds history query param", async ({ page }) => {
    test;
    const radio = page.getByRole("radio", { name: "History" });
    await radio.click();
    await expect(page).toHaveURL(/history/gi);
    await expect(radio).toBeChecked();
  });
  test("Geography radio adds geography query param", async ({ page }) => {
    test;
    const radio = page.getByRole("radio", { name: "Geography" });
    await radio.click();
    await expect(page).toHaveURL(/geography/gi);
    await expect(radio).toBeChecked();
  });
  test("Economy radio adds economy query param", async ({ page }) => {
    test;
    const radio = page.getByRole("radio", { name: "Economy" });
    await radio.click();
    await expect(page).toHaveURL(/economy/gi);
    await expect(radio).toBeChecked();
  });
});
