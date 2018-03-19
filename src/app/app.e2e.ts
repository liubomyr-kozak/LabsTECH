import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {

  beforeEach(async () => {
    await browser.get('/');
  });

  it('should have Cities Kiev', async () => {
    browser.ignoreSynchronization = false;
    browser.driver.sleep(50000);
 
    let Cities = element.all(by.className('site-item'))
    let firstEl = await Cities.get(0);

    const value = 'Kiev4';
    const elText = firstEl.getText();
    expect(elText).toEqual(value);
  });

  it('should have Open City page', async () => {
    browser.ignoreSynchronization = false;
    browser.driver.sleep(50000);
 
    let Cities = element.all(by.className('site-item'))
    let firstEl = await Cities.get(0);

    const value = 'Kiev4';
    const elText = firstEl.getText();
    
    await firstEl.click();
    let currentUrl = await browser.getCurrentUrl()

    expect(currentUrl).toBe('http://localhost:3000/city/Kiev4');
  });

  it('should open not 50 element', async () => {
    let Cities = element.all(by.className('site-item'))
    let firstEl = await Cities.get(0);
    await firstEl.click();

    let equpmentCount = await element.all(by.className('table_tr')).count()

    expect(equpmentCount).toBe(50);
  });
});
