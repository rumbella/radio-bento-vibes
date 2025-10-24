from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Verify left-to-right transition
    page.goto("http://localhost:8080")
    page.screenshot(path="jules-scratch/verification/screenshot_home.png")
    page.click("a[href='/playlists']")
    page.wait_for_timeout(500)  # Wait for transition
    page.screenshot(path="jules-scratch/verification/screenshot_playlists.png")

    # Verify right-to-left transition and background image
    # Click the div that navigates to the playlist
    playlist_link = page.locator('.swiper-slide .cursor-pointer').first
    expect(playlist_link).to_be_visible()
    playlist_link.click()
    page.wait_for_timeout(500) # Wait for transition
    page.screenshot(path="jules-scratch/verification/screenshot_playlist.png")


    browser.close()

with sync_playwright() as playwright:
    run(playwright)
