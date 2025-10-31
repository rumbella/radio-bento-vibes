from playwright.sync_api import Page, expect
import re

def test_redirect_to_pre_launch(page: Page):
    # Navigate to the root URL
    page.goto("http://localhost:8080/")

    # Wait for the page to load
    page.wait_for_load_state("domcontentloaded")

    # Check that the URL is the pre-launch page
    expect(page).to_have_url("http://localhost:8080/pre-launch")

    # Check that the main heading is visible
    heading = page.get_by_role("heading", name=re.compile("REGISTRATI AL PRE-LANCIO", re.IGNORECASE))
    expect(heading).to_be_visible()

    # Take a screenshot to verify the page content
    page.screenshot(path="jules-scratch/verification/verification.png")
