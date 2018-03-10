import { Directive, Input, HostListener, ElementRef } from '@angular/core';

import {
  NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl
} from '@angular/forms';

@Directive({
  selector: '[appInputCPFDirective]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputCPFDirective,
    multi: true
  }]
})


export class InputCPFDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  @Input('gcMask') gcMask: string;

  constructor(private el: ElementRef) {

  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value;
    //this.control.valueAccessor.writeValue(value);

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    var valor = $event.target.value.replace(/\D/g, '');
    var pad = this.gcMask.replace(/\D/g, '').replace(/9/g, '_');
    var valorMask = valor + pad.substring(0, pad.length - valor.length);

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    var valorMaskPos = 0;
    valor = '';
    for (var i = 0; i < this.gcMask.length; i++) {
      if (isNaN(parseInt(this.gcMask.charAt(i)))) {
        valor += this.gcMask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    $event.target.value = valor;
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.gcMask.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }
}