const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const firefox = require('selenium-webdriver/firefox');

describe('SauceDemo Test Suite', function () {
    this.timeout(60000);

    let driver;

    it('Visit SauceDemo dan cek page title', async function () {

        options = new firefox.Options();
        options.addArguments('--incognito'); // option ke firefox supaya tidak ada pop up password
        driver = await new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();

        await driver.get('https://www.saucedemo.com/');
        const title = await driver.getTitle();
        const currentUrl = await driver.getCurrentUrl();

        // input username
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        // input password
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        // button login (gunakan By.id atau By.css karena By.className tidak mendukung spasi/compound class)
        let buttonLogin = await driver.findElement(By.id('login-button'));
        // kirim data username & password lalu klik login
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await driver.sleep(3000)
        await buttonLogin.click();

    })

    it('Visit SaucedDemo dan cek page title', async function () {

        //tunggu element tampil
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')),
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Shopping cart harus tampil');

        //assert: element ada
        let hasilTampilCart = await buttonCart.isDisplayed()
        assert.strictEqual(hasilTampilCart, true);

        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.strictEqual(logotext, 'Swag Labs');

        await driver.sleep(2700)

        //dropdown search
        let dropdownSort = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'))
        await dropdownSort.click()
        let option = await driver.findElement(By.xpath('//option[text()="Name (A to Z)"]'))
        await driver.sleep(2000)
        await option.click();

        await driver.sleep(2000)
    })


    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

})