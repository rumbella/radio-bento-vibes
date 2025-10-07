import re
from playwright.sync_api import sync_playwright, Page, expect

def verify_playlist_player(page: Page):
    """
    This script verifies the new UI for the PlaylistPlayer component.
    It navigates to a single playlist page and takes a screenshot.
    """
    # 1. Navigate to the single playlist page
    page.goto("http://localhost:8080/playlist/1")

    # 2. Wait for the player to be visible by looking for the playlist title
    playlist_title = page.get_by_role("heading", name="Deep House")
    expect(playlist_title).to_be_visible(timeout=10000)

    # 3. Take a screenshot of the initial player view
    page.screenshot(path="jules-scratch/verification/01_player_initial_view.png")

    # 4. Click the "Playlist" button to open the modal
    playlist_button = page.get_by_role("button", name="Playlist")
    expect(playlist_button).to_be_visible()
    playlist_button.click()

    # 5. Wait for the modal to appear by looking for its title and take a screenshot
    modal_title = page.get_by_role("heading", name="Up Next")
    expect(modal_title).to_be_visible()
    page.screenshot(path="jules-scratch/verification/02_playlist_modal_open.png")

    # 6. Close the modal by finding the close button relative to the modal title
    modal_header = modal_title.locator("xpath=..")
    close_button = modal_header.get_by_role("button")
    close_button.click()
    expect(modal_title).not_to_be_visible()

    # 7. Take a final screenshot to confirm the modal is closed
    page.screenshot(path="jules-scratch/verification/03_player_modal_closed.png")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_playlist_player(page)
        browser.close()

if __name__ == "__main__":
    main()