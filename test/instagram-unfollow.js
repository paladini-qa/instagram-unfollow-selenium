const USER = '';
const PASSWORD = '';
const COUNT = 2000;

const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");

describe('Instagram Unfollow', () => {
  it('Start Unfollowing', async() => {
    console.log('Starting to unfollow ' + COUNT + ' accounts');
    const driver = new Builder().forBrowser('MicrosoftEdge').build();
    await driver.get('https://www.instagram.com');
    await driver.sleep(3000);
    
    const username = await driver.findElement(By.xpath('//*[@id="loginForm"]/div/div[1]/div/label/input'));
    username.sendKeys(USER);
    const password = await driver.findElement(By.xpath('//*[@id="loginForm"]/div/div[2]/div/label/input'));
    password.sendKeys(PASSWORD);

    const loginButton = await driver.findElement(By.xpath('//*[@id="loginForm"]/div/div[3]/button'));
    loginButton.click();

    await driver.sleep(3000);
    
    await driver.get(`https://www.instagram.com/${USER}/`);
    await driver.sleep(3000);

    const followingButton = await driver.findElement(By.xpath('//a[contains(@href, "/following/")]'));
    followingButton.click();
    await driver.sleep(3000);

    for (let i = 0; i < COUNT ; i++) {
      const unfollowButton = await driver.findElement(By.className('_acan _acap _acat _aj1- _ap30'));
      await driver.executeScript("arguments[0].scrollIntoView()", unfollowButton);
      await unfollowButton.click();
      const confirmButton = await driver.findElement(By.xpath('//button[contains(text(), "Unfollow")]'));
      await confirmButton.click();
      await driver.sleep(2000);
    }
    await driver.quit();
    console.log('Unfollowed ' + COUNT + ' accounts');
  });
});