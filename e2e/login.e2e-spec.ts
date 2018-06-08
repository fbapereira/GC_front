import { LoginPage } from './pages/login.page';
import { Variaveis } from './statics/var';
import { browser, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Login -> ', () => {

  let oLoginPage: LoginPage;
  beforeEach(() => {
    oLoginPage = new LoginPage();
    oLoginPage.navigateTo();
  });

  describe('Situacoes de Login -> ', () => {
    it('deveria bloquear senha errada ', () => {
      oLoginPage.getInputSenha().sendKeys(Variaveis.ERRADO_USUARIO);
      oLoginPage.getInputEmail().sendKeys(Variaveis.ERRADO_EMAIL);
      oLoginPage.getButtonEntrar().click();

      browser.waitForAngular();

      oLoginPage.getAlert()
        .then(function () {
          expect(oLoginPage.alert.getAttribute('innerHTML')).toEqual(' Senha ou Usuário inválidos ');
        });

    });

    it('deveria logar com senha e email corretos ', () => {

      oLoginPage.getInputSenha().sendKeys(Variaveis.ADMIN_SENHA);
      oLoginPage.getInputEmail().sendKeys(Variaveis.ADMIN_EMAIL);
      oLoginPage.getButtonEntrar().click();

      browser.waitForAngular();

      expect(oLoginPage.isAcademiaStatus).toBeDefined();
    });


    it('deveria logar com senha e login corretos ', () => {
      oLoginPage.getInputSenha().sendKeys(Variaveis.ADMIN_SENHA);
      oLoginPage.getInputEmail().sendKeys(Variaveis.ADMIN_USUARIO);
      oLoginPage.getButtonEntrar().click();

      browser.waitForAngular();

      expect(oLoginPage.isAcademiaStatus).toBeDefined();
    });


    it('deveria ser obrigatorio a presença de  senha  ', () => {
      browser.waitForAngular();
      oLoginPage.getInputEmail().sendKeys(Variaveis.ADMIN_USUARIO);
      oLoginPage.getButtonEntrar().click();

      oLoginPage.getAlert()
        .then(function () {
          expect(oLoginPage.alert.getAttribute('innerHTML')).toEqual(' Por favor, digite sua senha ');
        });
    });


    it('deveria ser obrigatorio a presença de email  ', () => {
      browser.waitForAngular();

      oLoginPage.getButtonEntrar().click();

      oLoginPage.getAlert()
        .then(function () {
          expect(oLoginPage.alert.getAttribute('innerHTML')).toEqual(' Por favor, digite um e-mail valido ');
        });
    });
  });

  fdescribe('Situacoes de academias -> ', () => {
    // it('deveria logar direto quando só tem uma academia  ', () => {
    //   oLoginPage.getInputSenha().sendKeys(Variaveis.COMUM_SENHA);
    //   oLoginPage.getInputEmail().sendKeys(Variaveis.COMUM_EMAIL);
    //   oLoginPage.getButtonEntrar().click();

    //   browser.waitForAngular();
    //   browser.sleep(3000);

    //   expect(browser.getCurrentUrl()).toMatch('dashboard');
    // });

    // it('deveria escolher quando tem mais de uma  academia  ', () => {
    //   oLoginPage.getInputSenha().sendKeys(Variaveis.ADMIN_SENHA);
    //   oLoginPage.getInputEmail().sendKeys(Variaveis.ADMIN_USUARIO);
    //   oLoginPage.getButtonEntrar().click();

    //   browser.waitForAngular();
    //   browser.sleep(3000);

    //   expect(oLoginPage.isAcademiaStatus()).toBeDefined();
    //   expect(browser.getCurrentUrl()).not.toMatch('dashboard');
    // });

    it('deveria selecionar uma academia', () => {
      oLoginPage.getInputSenha().sendKeys(Variaveis.ADMIN_SENHA);
      oLoginPage.getInputEmail().sendKeys(Variaveis.ADMIN_EMAIL);
      oLoginPage.getButtonEntrar().click();

      browser.waitForAngular();
      browser.sleep(1000);


      oLoginPage.getSelectAcademia()[2].selected = 'selected';
      browser.sleep(1000);

      expect(browser.getCurrentUrl()).not.toMatch('dashboard');
    });
  });
});
