import re
from playwright.sync_api import sync_playwright, Page, expect

def verify_new_layout(page: Page):
    """
    This script verifies the new layout of the SinglePlaylistPage,
    including the DetailNav, ShareBar, and the modified PlaylistPlayer.
    """
    # 1. Navigate to the single playlist page
    page.goto("http://localhost:8080/playlist/1")

    # 2. Wait for the main elements to be visible
    # Wait for the top navigation bar
    nav_bar = page.locator("div.absolute.top-0")
    expect(nav_bar).to_be_visible(timeout=10000)

    # Wait for the share bar
    share_bar_text = page.get_by_text("share the experience")
    expect(share_bar_text).to_be_visible()

    # Wait for the player
    player_title = page.get_by_role("heading", name="Deep House")
    expect(player_title).to_be_visible()

    # 3. Take a screenshot of the new layout
    page.screenshot(path="jules-scratch/verification/04_new_layout.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_new_layout(page)
        browser.close()

if __name__ == "__main__":
    main()