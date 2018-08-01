
// ### Importation session
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Modalidade } from '../models/modalidade';
import { Academia } from '../models/academia';
import { AcademiaService } from './academia.service';
// TODO - IMPORTAR O SEU SERVICO


describe('ModalidadeService -> ', () => {


  // ### Injectable Variable Session

  let _ModalidadeService: ModalidadeService;
  let mock_oHttpClient: HttpClient;
  let mock_oAcademia: AcademiaService;



  // ### beforeEach session
  beforeEach(() => {

    mock_oHttpClient = jasmine.createSpyObj('HttpClient', ['post']);
    mock_oAcademia = jasmine.createSpyObj('AcademiaService', []);

    _ModalidadeService = new ModalidadeService(mock_oHttpClient, mock_oAcademia);
  });


  // ### It session

  it(' Should not throw Obtem', () => {
    // TODO - Escreva seus testes
    expect(_ModalidadeService.Obtem()).not.toThrow();
  });

  it(' Should not throw Altera', () => {
    // TODO - Escreva seus testes
    expect(_ModalidadeService.Altera()).not.toThrow();
  });

  it(' Should not throw Apagar', () => {
    // TODO - Escreva seus testes
    expect(_ModalidadeService.Apagar()).not.toThrow();
  });

  it(' Should not throw Adiciona', () => {
    // TODO - Escreva seus testes
    expect(_ModalidadeService.Adiciona()).not.toThrow();
  });


});
