import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appButtonClick]',
})
export class ButtonClickDirective {
  @HostListener('click') click() {
    this.el.nativeElement.style.transform = 'scale(0.8)';
    setTimeout(() => {
      this.el.nativeElement.style.transform = 'scale(1)';
    }, 200);
  }

  constructor(private el: ElementRef) {}
  
}
