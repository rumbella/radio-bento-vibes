from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8080")
    page.screenshot(path="jules-scratch/verification/screenshot1.png")
    page.click("a[href='/podcasts']")
    page.wait_for_timeout(500)  # Wait for transition
    page.screenshot(path="jules-scratch/verification/screenshot2.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
