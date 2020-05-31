const BASE_URL = 'https://boocasino-qa.cs3-gfo.xyz/2.5.1-alpha.9';
const USERNAME = 'qqtst_a';
const PASSWORD = 'Passw0rd'; 
const INCORRECT_USERNAME = 'qqtst_lorem_ipsum';
const INCORRECT_PASSWORD = 'Passw1rd';
const NOT_VALID_PASSWORD = 'aaa';
const NOT_EXISTING_EMAIL = 'qqtst_alex55@ahem.email';
const NOT_VALID_EMAIL = 'test';

describe("BooCasino - Login test:", () => {

    beforeEach(async() => {
        await page.goto(BASE_URL, {waitUntil: "networkidle"});
    })

    it("Open Login form and check design", async () => {
        await page.waitForSelector('//a[@fragment="loginDialog" and contains(text(), "Login")]');
        await page.click('//a[@fragment="loginDialog" and contains(text(), "Login")]');

        await page.waitForSelector('//a[@fragment="loginDialog"]//ancestor::cs3-user-role-visitor');
        await page.waitForSelector('//cs3-dialog-header//p[contains(text(),"Login")]');
        await page.waitForSelector('//img[@alt="Login Dialog Picture"]');
        await page.waitForSelector('//button[contains(text(), "Login") and @disabled]');
        await page.waitForSelector('//a[contains(text(), "Forgot Password?")]');

        await page.waitForSelector(`//a[contains(text(), "Don't have an account yet? Create account")]`);
        await page.click(`//a[contains(text(), "Don't have an account yet? Create account")]`);
        await expect(page).toHaveSelector('//cs3-dialog-header');
        await expect(page).toHaveSelector('//cs3-registration-offer');

    })

    it("Open Login form and sign in with correct creds then logout", async () => {
        await page.waitForSelector('//a[@fragment="loginDialog" and contains(text(), "Login")]');
        await page.click('//a[@fragment="loginDialog" and contains(text(), "Login")]');

        await page.waitForSelector('//a[@fragment="loginDialog"]//ancestor::cs3-user-role-visitor');
        await page.waitForSelector('//cs3-dialog-header//p[contains(text(),"Login")]');
        await page.waitForSelector('//button[contains(text(), "Login") and @disabled]');
        await page.waitForSelector('//*[@id="login.form.username"]');
        await page.waitForSelector('//*[@id="login.form.password"]');

        await page.fill('//*[@id="login.form.username"]', USERNAME);
        await page.fill('//*[@id="login.form.password"]', PASSWORD);

        expect(await page.$('//button[contains(text(), "Login") and @disabled]')).toBeFalsy();
        await page.click('//cs3-login-dialog//button');

        await page.waitForSelector('//cs3-button-deposit');
        await expect(page).toHaveSelector('//cs3-button-deposit//ancestor::cs3-user-role-player');

        await page.screenshot({ path: './screenshots/open_login_form_and_sign_in_with_correct_creds_then_logout_player.png' });

        await page.waitForSelector('//cs3-svg-icon[@name="secondary-side-nav"]');
        await page.click('//cs3-svg-icon[@name="secondary-side-nav"]');

        await page.waitForSelector('//span[contains(text(), " Logout ")]');
        await page.click('//span[contains(text(), " Logout ")]');

        await page.waitForSelector('//a[@fragment="loginDialog" and contains(text(), "Login")]');
        await expect(page).toHaveSelector('//a[@fragment="loginDialog"]//ancestor::cs3-user-role-visitor');
    })

    it.only("Open Login form and sign in with wrong creds", async () => {
        await page.waitForSelector('//a[@fragment="loginDialog" and contains(text(), "Login")]');
        await page.click('//a[@fragment="loginDialog" and contains(text(), "Login")]');

        await page.waitForSelector('//a[@fragment="loginDialog"]//ancestor::cs3-user-role-visitor');
        await page.waitForSelector('//cs3-dialog-header//p[contains(text(),"Login")]');
        await page.waitForSelector('//button[contains(text(), "Login") and @disabled]');
        await page.waitForSelector('//*[@id="login.form.username"]');
        await page.waitForSelector('//*[@id="login.form.password"]');
        
        await page.fill('//*[@id="login.form.password"]', PASSWORD);
        expect(await page.$('//button[contains(text(), "Login") and @disabled]')).toBeTruthy();

        await page.fill('//*[@id="login.form.password"]','');
        await page.fill('//*[@id="login.form.username"]', USERNAME);
        expect(await page.$('//button[contains(text(), "Login") and @disabled]')).toBeTruthy();

        await page.fill('//*[@id="login.form.username"]','');
        await page.fill('//*[@id="login.form.username"]', INCORRECT_USERNAME);
        await page.fill('//*[@id="login.form.password"]', PASSWORD);
        expect(await page.$('//button[contains(text(), "Login")')).toBeTruthy();
        expect(await page.$('//button[contains(text(), "Login") and @disabled]')).toBeFalsy();

        await page.click('//button[contains(text(), "Login")');
        expect(await page.$('//p[contains(text(), "Invalid user name or password, please try again.")]'));

        await page.click('//header//cs3-svg-icon]');

        await page.waitForSelector('//a[@fragment="loginDialog"]//ancestor::cs3-user-role-visitor');
        await page.waitForSelector('//a[@fragment="loginDialog" and contains(text(), "Login")]');
        await page.click('//a[@fragment="loginDialog" and contains(text(), "Login")]');

        await page.waitForSelector('//button[contains(text(), "Login") and @disabled]');
        await page.waitForSelector('//*[@id="login.form.username"]');
        await page.waitForSelector('//*[@id="login.form.password"]');
        await page.fill('//*[@id="login.form.username"]', USERNAME);
        await page.fill('//*[@id="login.form.password"]', INCORRECT_PASSWORD);
        expect(await page.$('//button[contains(text(), "Login")')).toBeTruthy();
        expect(await page.$('//button[contains(text(), "Login") and @disabled]')).toBeFalsy();

        await page.click('//button[contains(text(), "Login")');
        expect(await page.$('//p[contains(text(), "Invalid user name or password, please try again.")]'));

        await page.click('//header//cs3-svg-icon]');

        await page.waitForSelector('//a[@fragment="loginDialog"]//ancestor::cs3-user-role-visitor');
        await page.waitForSelector('//a[@fragment="loginDialog" and contains(text(), "Login")]');
        await page.click('//a[@fragment="loginDialog" and contains(text(), "Login")]');

        await page.waitForSelector('//button[contains(text(), "Login") and @disabled]');
        await page.waitForSelector('//*[@id="login.form.username"]');
        await page.waitForSelector('//*[@id="login.form.password"]');
        await page.fill('//*[@id="login.form.username"]', INCORRECT_USERNAME);
        await page.fill('//*[@id="login.form.password"]', INCORRECT_PASSWORD);
        expect(await page.$('//button[contains(text(), "Login")')).toBeTruthy();
        expect(await page.$('//button[contains(text(), "Login") and @disabled]')).toBeFalsy();

        await page.click('//button[contains(text(), "Login")');
        expect(await page.$('//p[contains(text(), "Invalid user name or password, please try again.")]'));
    })

    it("Open Password Reminder Dialog and check design", async () => {
        await page.waitForSelector('//a[@fragment="loginDialog" and contains(text(), "Login")]');
        await page.click('//a[@fragment="loginDialog" and contains(text(), "Login")]');

        await page.waitForSelector('//a[@fragment="loginDialog"]//ancestor::cs3-user-role-visitor');
        await page.waitForSelector('//cs3-dialog-header//p[contains(text(),"Login")]');
        await page.waitForSelector('//a[contains(text(), "Forgot Password?")]');

        await page.click('//a[contains(text(), "Forgot Password?")]');

        await page.waitForSelector('//cs3-forgot-password-dialog');
        expect(await page.$('//cs3-dialog-header//p[contains(text(), "Password Reminder")]')).toBeTruthy();
        expect(await page.$('//input[@id="forgot.password.form.email"]')).toBeTruthy();
        expect(await page.$('//button[contains(text(), "Submit") and @disabled]')).toBeTruthy(); 
    })

    it("Password Reminder Dialog CS and SS validation", async () => {
        await page.waitForSelector('//a[@fragment="loginDialog" and contains(text(), "Login")]');
        await page.click('//a[@fragment="loginDialog" and contains(text(), "Login")]');

        await page.waitForSelector('//a[@fragment="loginDialog"]//ancestor::cs3-user-role-visitor');
        await page.waitForSelector('//cs3-dialog-header//p[contains(text(),"Login")]');
        await page.waitForSelector('//a[contains(text(), "Forgot Password?")]');

        await page.click('//a[contains(text(), "Forgot Password?")]');

        await page.waitForSelector('//input[@id="forgot.password.form.email"]');
        await page.fill('//input[@id="forgot.password.form.email"]', NOT_EXISTING_EMAIL);
        expect(await page.$('//button[contains(text(), "Submit")]')).toBeTruthy(); 
        expect(await page.$('//button[contains(text(), "Submit") and @disabled]')).toBeFalsy(); 

        await page.click('//button[contains(text(), "Submit")]');
        expect(await page.$('//cs3-notification//p[contains(text(), "Email does not exist")]')).toBeTruthy(); 
        expect(await page.$('//cs3-input-errors//div[contains(text(), "Email does not exist")]')).toBeTruthy();

        await page.click('//cs3-dialog-header//cs3-svg-icon');

        await page.waitForSelector('//a[@fragment="loginDialog" and contains(text(), "Login")]');
        await page.click('//a[@fragment="loginDialog" and contains(text(), "Login")]');

        await page.waitForSelector('//a[contains(text(), "Forgot Password?")]');
        await page.click('//a[contains(text(), "Forgot Password?")]');

        await page.waitForSelector('//input[@id="forgot.password.form.email"]');
        expect(await page.$('//button[contains(text(), "Submit") and @disabled]')).toBeTruthy(); 

        await page.fill('//input[@id="forgot.password.form.email"]', NOT_VALID_EMAIL);
        expect(await page.$('//button[contains(text(), "Submit") and @disabled]')).toBeTruthy(); 
    })
  })