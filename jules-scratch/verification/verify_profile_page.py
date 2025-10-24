from playwright.sync_api import sync_playwright, expect
import time

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Sign up a new user
        page.goto("http://localhost:8080/signup", timeout=60000)
        page.wait_for_load_state('domcontentloaded', timeout=60000)

        unique_email = f"test_{int(time.time())}@test.com"

        page.get_by_placeholder("Email").fill(unique_email)
        page.get_by_placeholder("Password").fill("password")
        page.get_by_role("button", name="SIGN UP").click()

        time.sleep(3)

        # Navigate to the profile page directly
        page.goto("http://localhost:8080/profile", timeout=60000)
        page.wait_for_load_state('domcontentloaded', timeout=60000)

        if "login" in page.url():
            print("Redirected to login, signup did not create a session. Trying to log in.")
            page.get_by_placeholder("Email or username").fill(unique_email)
            page.get_by_placeholder("Password").fill("password")
            page.get_by_role("button", name="LOGIN").click()
            time.sleep(2)
            page.goto("http://localhost:8080/profile", timeout=60000)
            page.wait_for_load_state('domcontentloaded', timeout=60000)


        expect(page.get_by_role("heading", name="Choose your avatar")).to_be_visible()

        screenshot_path = "jules-scratch/verification/verification.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
