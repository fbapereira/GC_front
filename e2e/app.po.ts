import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.tagName('h3')).getText();
  }

  isAcademiaStatus() {

    console.log(element(by.xpath('//*[contains(., "Acadedmia")]')));
    return element(by.xpath('//*[contains(., "Academia")]'));
  }



  login() {
    element(by.id('inputEmail')).sendKeys('fba_pereira@hotmail.com');
    element(by.id('inputPassword')).sendKeys('#L3v1ticos#');
    element(by.id('btnLogin')).click();
  }
}


