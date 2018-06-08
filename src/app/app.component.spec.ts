import { ToastrModule } from 'ngx-toastr';
import { GC_Pipes } from './static/pipes';
import { GC_SERVICES } from './static/service';
import { AppComponent } from './app.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';
import { GC_COMPONENTS } from './static/component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputCPFDirective } from './directives/input-cpf.directive';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'


describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GC_COMPONENTS,
        InputCPFDirective,
        GC_Pipes
      ],
      imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgHttpLoaderModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        Angular2FontawesomeModule,
        NgxBarcodeModule,
        ToastrModule.forRoot(), // ToastrModule added
        NgxPaginationModule
      ],
      providers: [GC_SERVICES,
        { provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
