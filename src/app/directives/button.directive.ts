import { Directive,ElementRef  } from '@angular/core';


@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = '#00abfb8b';
    this.el.nativeElement.style.boxShadow = '10px 10px 20px #00adfb';
 }

 
}
