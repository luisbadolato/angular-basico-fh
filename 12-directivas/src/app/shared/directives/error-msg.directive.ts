import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit, OnChanges{

  private _color: string = 'blue';
  private _msg: string = 'Campo obligatorio!!!';

  htmlElement: ElementRef<HTMLElement>;

  @Input() set color(valor: string) {
    this._color = valor;
    this.setColor();
  };

  @Input() set msg(valor: string) {
    this._msg = valor;
    this.setMsg();
  };

  @Input() set valido(valor: boolean) {
    if (valor === true) {
      this.htmlElement.nativeElement.classList.add('hidden');
    } else {
      this.htmlElement.nativeElement.classList.remove('hidden');
    }
  };

  @Input() cssClass: string = '';

  constructor( private el: ElementRef<HTMLElement> ) {
    this.htmlElement = el;
  }
  
  ngOnInit(): void {
    this.setCssClass();
    this.setColor();
    this.setMsg();

  }

  ngOnChanges(changes: SimpleChanges): void {

    // if (changes['msg']) {
    //   const mensaje = changes['msg'].currentValue;
    //   this.htmlElement.nativeElement.innerText = mensaje;
    // }

    // if (changes['color']) {
    //   const color = changes['color'].currentValue;
    //   this.htmlElement.nativeElement.style.color = color;
    // }
    
  }
  
  setCssClass(): void {
    this.htmlElement.nativeElement.classList.toggle(this.cssClass);
  }
  
  setColor(): void {
      this.htmlElement.nativeElement.style.color = this._color;
  }
  

  setMsg(): void {
    this.htmlElement.nativeElement.innerText = this._msg;
  }

}
 