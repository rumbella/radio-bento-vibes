import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:8082/login")

        # Login
        page.get_by_placeholder("Enter your email").fill("test@test.com")
        page.get_by_placeholder("Enter your password").fill("password")
        page.get_by_role("button", name="Login").click()

        # Wait for navigation to the home page after login
        expect(page).to_have_url(re.compile(r"http://localhost:8082/?$"))

        # Navigate to profile page
        page.goto("http://localhost:8082/profile")

        # Wait for the profile page to load
        expect(page.locator('h2:has-text("Test User")')).to_be_visible()

        page.screenshot(path="jules-scratch/verification/user_profile_page.png")

    finally:
        browser.close()

with sync_playwright() as p:
    run(p)
