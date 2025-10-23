from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Verify Playlist Player
    page.goto("http://localhost:8080/playlist/1")
    page.screenshot(path="jules-scratch/verification/playlist_player.png")

    # Verify Podcast Player
    page.goto("http://localhost:8080/podcast/1")
    page.screenshot(path="jules-scratch/verification/podcast_player.png")

    # Verify Resident Player
    page.goto("http://localhost:8080/resident/1")
    page.screenshot(path="jules-scratch/verification/resident_player.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
