import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface customMarker {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [ number, number ];
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -0.481343448973774, 38.34760276096317 ];

  marcadores: customMarker[] = [];


  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerMarcadoresLocal();

  }
  
  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color // Desestructurado, equivale a color: color al estar dentro de llaves
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({ color, marker: nuevoMarcador });

    this.guardarMarcadoresLocal();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocal();
    });
  }

  irMarcador(marker: mapboxgl.Marker): void {
    this.mapa.flyTo({
      center: marker.getLngLat()
    });
  }

  borrarMarcador(index: number) {
    this.marcadores[index].marker?.remove();
    this.marcadores.splice(index, 1);
    this.guardarMarcadoresLocal();
  }

  guardarMarcadoresLocal() {
    const lngLatArray: customMarker[] = [];
    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArray.push({
        color,
        center: [ lng, lat ]
      });
    });
    localStorage.setItem('marcadores', JSON.stringify(lngLatArray));
  }

  leerMarcadoresLocal() {
    if (!localStorage.getItem('marcadores')) return;

    const lngLatArray: customMarker[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArray.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat(m.center!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocal();
      });
    })
  }

}

/* 


*/