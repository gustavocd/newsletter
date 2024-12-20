import { expect, test } from '@playwright/test'

test('should be able to type in email input', async ({ page }) => {
	const email = 'email@example.com'
	await page.goto('/')
	await page.fill('input[name=email]', email)
	await expect(page.locator('input[name=email]')).toHaveValue(email)
})

test('should be able to submit form', async ({ page }) => {
	const email = 'email@example.com'
	await page.goto('/')
	await page.fill('input[name=email]', email)
	await page.click('button[type=submit]')
	await expect(page.locator('input[name=email]')).toHaveValue('')
})

test('should show error message if the email is not valid', async ({ page }) => {
	const email = 'email@example'
	await page.goto('/')
	await page.fill('input[name=email]', email)
	await page.click('button[type=submit]')
	await expect(page.locator('input[name=email]')).toHaveValue(email)
	expect(page.getByText(/the email address is badly formatted./i)).not.toBeNull()
})
