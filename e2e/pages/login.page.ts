import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class LoginPage {
  alert: any;

  getInputEmail() { return element(by.id('inputEmail')); }
  getInputSenha() { return element(by.id('inputPassword')); }
  getButtonEntrar() { return element(by.id('btnLogin')); }
  getButtonEsqueciSenha() { return element(by.buttonText('Esqueci a senha')); }
  getButtonProsseguir() { return element(by.buttonText('Prosseguir')); }
  getButtonVoltar() { return element(by.buttonText('Voltar')); }
  getButtonEntrarAcademia() { return element(by.id('btnLoginAcademia')); }
  getSelectAcademia() { return element(by.id('dropAcademia')); }

  getAlert() {
    const EC = protractor.ExpectedConditions;
    this.alert = element(by.xpath('//*[@id="toast-container"]/div/div[2]'));

    return browser.wait(EC.presenceOf(this.alert), 5000);
  }

  isAcademiaStatus() {
    return element(by.xpath('//*[contains(., "Academia")]'));
  }

  isSenhaStatus() {
    return element(by.xpath('//*[contains(., "Enviaremos um e-mail com uma nova senha.")]'));
  }

  navigateTo() {
    return browser.get('/');
  }
}
