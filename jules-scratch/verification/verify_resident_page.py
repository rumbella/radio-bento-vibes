from playwright.sync_api import sync_playwright, Page, expect
import re

def verify_resident_page(page: Page):
    # Navigate to the single resident page for resident 1
    page.goto("http://localhost:8080/resident/1")

    # Wait for the page to load
    page.wait_for_load_state("domcontentloaded")

    # Check for background image on the body
    body = page.locator("body")
    expect(body).to_have_css("background-image", re.compile(r"url\("))

    # Check for DJ image in the player
    dj_image = page.locator("img[alt='DJ Phoenix']")
    expect(dj_image).to_be_visible()

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/resident_page.png")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    verify_resident_page(page)
    browser.close()