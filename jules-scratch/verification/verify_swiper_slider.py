from playwright.sync_api import sync_playwright, Page, expect

def verify_playlist_slider(page: Page):
    """
    This script verifies that the Swiper slider on the playlists page is rendered correctly.
    """
    # 1. Navigate to the playlists page.
    page.goto("http://localhost:8080/playlists")

    # 2. Wait for the swiper container to be visible.
    swiper_container = page.locator('.swiper-container, .swiper')
    expect(swiper_container).to_be_visible(timeout=10000)

    # Give a little time for animations to settle
    page.wait_for_timeout(1000)

    # 3. Take a screenshot for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_playlist_slider(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()