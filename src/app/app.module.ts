import { NgModule } from '@angular/core';
import { GC_SERVICES } from './static/service';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { GC_COMPONENTS } from './static/component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputCPFDirective } from './directives/input-cpf.directive';

@NgModule({
  declarations: [
    AppComponent,
    GC_COMPONENTS,
    InputCPFDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [GC_SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
