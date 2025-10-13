import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Producto } from '../models/producto';
import { text } from 'stream/consumers';


@Injectable({
  providedIn: 'root'
})


export class ProductoService {
  
  private apiURL = 'http://localhost:4000/api/productos';
  constructor(private http: HttpClient) {}

  private productos : Producto[] = [
    /*new Producto(1, 'Lunalight Liger Dancer', 50, "DUAD-EN030", 2, 'assets/Liger.jpg'),
    new Producto(2, 'Lunalight Perfume Dancer', 50, "DUAD-AE031", 2, 'assets/Perfume.jpg'),
    new Producto(3, 'Fire Formation - Tenki', 20, "ES01-AE062", 1, 'assets/Tenki.jpg'),
    new Producto(4, 'El Bufón y el Pájaro del Candado', 30, "RA02-SP006", 3, 'assets/Droll.jpg'),
    new Producto(5, 'Zorro Carmesí de la Lunaluz', 5000, "CR08-AE033", 2, 'assets/Zorro.jpg'),
    new Producto(6, 'Lunalight Silver Hound', 10000, "DUAD-AE006", 2, 'assets/MiViejaW.jpg'),*/
  ];
  
  private productosSubject = new BehaviorSubject<Producto[]>(this.productos);
  productos$ = this.productosSubject.asObservable(); // Observable para suscribirse


  

   obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiURL).pipe(
      catchError(err => {
        console.warn('Error al conectar con API, usando datos locales', err);
        return of(this.productos); // Fallback a datos locales
      })
    );
  }

    /*async obtenerProductos(): Promise<Producto[]> {
    const response = await fetch('assets/xml/inventario.xml');
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
    const productos: Producto[] = [];
    const productoNodes = xmlDoc.getElementsByTagName('producto');
    for (let i = 0; i < productoNodes.length; i++) {
      const productoNode = productoNodes[i];
      const id = parseInt(productoNode.getElementsByTagName('id')[0].textContent || '0', 10);
      const nombre = productoNode.getElementsByTagName('nombre')[0].textContent || '';
      const precio = parseFloat(productoNode.getElementsByTagName('precio')[0].textContent || '0');
      const desc = productoNode.getElementsByTagName('descripcion')[0].textContent || '';
      const cantidad = parseInt(productoNode.getElementsByTagName('cantidad')[0].textContent || '0', 10);
      const imagen = productoNode.getElementsByTagName('imagen')[0].textContent || '';
      productos.push(new Producto(id, nombre, precio, desc, cantidad, imagen));
    }
    return productos;
  }*/

  agregarProducto(producto: Producto): void {
    this.productos.push(producto);
    this.productosSubject.next([...this.productos]); 
  }

  modificarProducto(id: number, nuevoProducto: Producto): void {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.productos[index] = { ...this.productos[index], ...nuevoProducto };
      this.productosSubject.next([...this.productos]);
    }
  }

  eliminarProducto(id: number): void {
    this.productos = this.productos.filter((p) => p.id !== id);
    this.productosSubject.next([...this.productos]); // Notificar el cambio
  }

  generarXML(): string {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<inventario>\n';
  
    this.productos.forEach((producto) => {
      xmlContent += '  <producto>\n';
      xmlContent += `    <id>${producto.id}</id>\n`;
      xmlContent += `    <nombre>${producto.nombre}</nombre>\n`;
      xmlContent += `    <cantidad>${producto.cantidad}</cantidad>\n`;
      xmlContent += `    <precio>${producto.precio}</precio>\n`;
      xmlContent += `    <imagen>${producto.imagen}</imagen>\n`;
      xmlContent += '  </producto>\n';
    });
  
    xmlContent += '</inventario>';
    return xmlContent;
  }
}
