import { LoginPage } from "./pages/login.page";
import { browser } from "protractor";

describe('Recupera senha -> ', () => {

  let oLoginPage: LoginPage;
  beforeEach(() => {
    oLoginPage = new LoginPage();
    oLoginPage.navigateTo();
    oLoginPage.getButtonEsqueciSenha().click();
  });

  describe('Situaçoes de esqueci a senha -> ', () => {
    it('deveria ser obrigatorio o cpf', () => {
      oLoginPage.getButtonProsseguir().click();
      oLoginPage.getAlert()
        .then(function () {
          expect(oLoginPage.alert.getAttribute('innerHTML')).toEqual(' Houve um erro ao resetar sua senha ');
        });
    });

    it('deveria poder voltar a pagina inicial ', () => {
      oLoginPage.getButtonVoltar().click();
      browser.waitForAngular();
      browser.sleep(3000);

      expect(browser.getCurrentUrl()).not.toMatch('forget-password');
    });
  });
});
