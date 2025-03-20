describe('Restaurant App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login with valid credentials', async () => {
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();
    
    // Verify we're on the restaurants screen
    await expect(element(by.id('restaurant-search'))).toBeVisible();
  });

  it('should show error with invalid credentials', async () => {
    await element(by.id('email-input')).typeText('wrong@email.com');
    await element(by.id('password-input')).typeText('wrongpass');
    await element(by.id('login-button')).tap();
    
    await expect(element(by.text('Invalid credentials'))).toBeVisible();
  });

  it('should navigate to signup screen', async () => {
    await element(by.id('signup-link')).tap();
    await expect(element(by.id('signup-email-input'))).toBeVisible();
  });

  it('should search for restaurants', async () => {
    // First login
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();
    
    await element(by.id('restaurant-search')).typeText('Pujol');
    await expect(element(by.id('restaurant-1'))).toBeVisible();
  });
});