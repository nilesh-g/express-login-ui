const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function loginTest() {

    let options = new chrome.Options();
    options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--window-size=1920,1080');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {

        await driver.get('http://localhost:4000/');

        // wait until page loads
        await driver.wait(until.elementLocated(By.id('username')), 5000);

        // fill form
        await driver.findElement(By.id('username')).sendKeys('admin');

        await driver.findElement(By.id('password')).sendKeys('admin');

        // click login
        await driver.findElement(By.css('button')).click();

        // wait for result
        await driver.sleep(2000);

        // get result
        const status = await driver.findElement(By.id('status')).getText();

        console.log('Login Result:', status);

        if (!status.includes('successful')) {
            throw new Error('Login test failed');
        }

        console.log('Selenium Test Passed');

    } finally {
        await driver.quit();
    }

})();