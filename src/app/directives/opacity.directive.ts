import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOpacity]'
})
export class OpacityDirective {

@HostListener('mouseenter') focus() {
  this.transparency('0.4');
}

@HostListener('mouseleave') blur() {
  this.transparency('1');
}
  constructor(private el:ElementRef) {
    
   }

   private transparency(opacity: string) {
    this.el.nativeElement.style.opacity=opacity
  }

}
