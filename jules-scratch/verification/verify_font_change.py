from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to the home page
    page.goto("http://localhost:4321")

    # Wait for the main heading to be visible to ensure the page has loaded
    heading = page.get_by_role("heading", name="FALL INTO FUN FINDS")
    expect(heading).to_be_visible()

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)