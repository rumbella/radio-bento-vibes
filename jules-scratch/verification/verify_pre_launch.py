from playwright.sync_api import Page, expect
import re

def test_pre_launch_page(page: Page):
    # Navigate to the pre-launch page
    page.goto("http://localhost:8080/pre-launch")

    # Wait for the page to load
    page.wait_for_load_state("domcontentloaded")

    # Check that the main heading is visible
    heading = page.get_by_role("heading", name=re.compile("REGISTRATI AL PRE-LANCIO", re.IGNORECASE))
    expect(heading).to_be_visible()

    # Take a screenshot to verify the background slideshow
    page.screenshot(path="jules-scratch/verification/verification.png")
