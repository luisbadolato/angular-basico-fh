import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css']
})
export class Pagina1Component 
  implements OnInit, OnChanges, 
             DoCheck, 
             AfterContentInit, 
             AfterContentChecked, 
             AfterViewInit, 
             AfterViewChecked,
             OnDestroy 
  {

  // CLASS PROPERTIES
  nombre: string = '';
  segundos: number = 0;
  timerSubscription!: Subscription;

  // LIFECYCLE HOOKS
              
  constructor() {
    console.log("constructor ----------- Pagina1Component")
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges ----------- Pagina1Component');
  }
  ngOnInit(): void {
    console.log("ngOnInit -------------- Pagina1Component");
    this.timerSubscription = interval(1000).subscribe( i => {
      this.segundos = i;
      console.log(i);
    });
  }
  ngDoCheck(): void {
    console.log('ngDoCheck ------------- Pagina1Component');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit ---- Pagina1Component');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked - Pagina1Component');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit ------- Pagina1Component');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked ---- Pagina1Component');
  }
  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
    console.log('ngOnDestroy ----------- Pagina1Component');
    console.log('****************************************');
    console.log('***********  Timer Limpio!  ************');
    console.log('****************************************');
  }

  // COMPONENT METHODS

  guardar(): void {
    console.log('*** Guardada Pagina 1! ***')
  }
    
}
