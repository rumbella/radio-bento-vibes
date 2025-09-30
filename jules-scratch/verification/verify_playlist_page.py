import re
from playwright.sync_api import Page, expect, sync_playwright

def verify_changes(page: Page):
    """
    Verifies the changes on the SinglePlaylistPage.
    """
    # Navigate to the Deep House playlist page
    page.goto("http://localhost:8080/playlist/1")

    # Wait for the main heading to be visible to ensure the page has loaded
    expect(page.get_by_role("heading", name="Deep House")).to_be_visible(timeout=10000)

    # 1. Verify the back button is styled correctly
    back_button_link = page.get_by_role("link", name="Go back")
    expect(back_button_link).to_be_visible()

    back_button_arrow_container = back_button_link.locator("div").first
    back_button_text_container = back_button_link.locator("div").last

    expect(back_button_arrow_container).to_have_class(re.compile(r'rounded-full'))
    expect(back_button_text_container).to_have_class(re.compile(r'rounded-full'))

    # 2. Verify the main content panels have rounded corners
    playlist_info_panel = page.locator('div.relative.flex-1')
    track_list_container = page.locator('div.w-2\\/5 > div.bg-black\\/30.rounded-3xl')

    expect(playlist_info_panel).to_have_class(re.compile(r'rounded-3xl'))
    expect(track_list_container).to_have_class(re.compile(r'rounded-3xl'))

    # 3. Click "Play All" and verify the player appears
    play_all_button = page.get_by_role("button", name="Play All")
    play_all_button.click()

    # 4. Verify the player is visible and playing the correct track
    player = page.locator('footer > div.bg-black\\/80')
    expect(player).to_be_visible(timeout=5000)

    expect(player).to_contain_text("Midnight City")
    expect(player).to_contain_text("M83")

    # 5. Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_changes(page)
        browser.close()

if __name__ == "__main__":
    main()