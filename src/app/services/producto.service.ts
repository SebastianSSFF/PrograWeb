import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  
  private apiURL = 'http://localhost:3000/api/productos';
  constructor(private http: HttpClient) {}

  private productos : Producto[] = [
    new Producto(1, 'Jeans', 200, 9, 'assets/jeans.jpg'),
    new Producto(2, 'Mesa', 800, 1, 'assets/mesa.jpg'),
    new Producto(3, 'PS2 Slim Hackeada + Juego', 2600, 1, 'assets/pleidos.jpg'),
    new Producto(4, 'Television usada con detalles', 1200, 1, 'assest/tele.jpg'),
    new Producto(5, 'Camiseta de cuero usada', 1000, 1, 'assets/cuero.jpg'),
  ];
  
  private productosSubject = new BehaviorSubject<Producto[]>(this.productos);
  productos$ = this.productosSubject.asObservable(); // Observable para suscribirse


  cargarCatalogoDesdeXML(xmlContent: string): void {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'application/xml');
    const productosXML = xmlDoc.getElementsByTagName('producto');

    this.productos = [];
    for (let i = 0; i < productosXML.length; i++) {
      const productoXML = productosXML[i];
      const producto: Producto = {
        id: +productoXML.getElementsByTagName('id')[0].textContent!,
        nombre: productoXML.getElementsByTagName('nombre')[0].textContent!,
        cantidad: +productoXML.getElementsByTagName('cantidad')[0].textContent!,
        precio: +productoXML.getElementsByTagName('precio')[0].textContent!,
        imagen: productoXML.getElementsByTagName('imagen')[0].textContent!,
      };
      this.productos.push(producto);
    }
  }

   obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiURL);
  }

  agregarProducto(producto: Producto): void {
    this.productos.push(producto);
    this.productosSubject.next([...this.productos]); // Notificar el cambio
  }

  modificarProducto(id: number, nuevoProducto: Producto): void {
    const index = this.productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.productos[index] = { ...this.productos[index], ...nuevoProducto };
      this.productosSubject.next([...this.productos]); // Notificar el cambio
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
