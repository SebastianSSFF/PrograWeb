import { Injectable } from "@angular/core";
import { Producto } from "../models/producto";

@Injectable ({
    providedIn: 'root'
})

export class CarritoService{
    xml: string = '';
    private carrito : Producto[]=[];
    agregarProducto(producto : Producto) {
        this.carrito.push(producto);
    }
    obtenerCarrito() : Producto[]{
        return this.carrito;
    }

    generarXML(): void {
  let xmlContent = '<?xml version="1.0" encoding="UTF-8" ?>\n<factura>\n';

  xmlContent += `  <info>\n    
    <folio>23</folio>\n    
    <fecha>${new Date().toISOString().split('T')[0]}</fecha>\n    
    <cliente>\n      
      <nombre>Fabio Lopez</nombre>\n      
      <email>fabio@gmail.com</email>\n    
    </cliente>\n  
  </info>\n`;

  xmlContent += `<productos>\n`;
  this.carrito.forEach((producto) => {
    xmlContent += `<producto>\n      
      <id>${producto.id}</id>\n      
      <descripcion>${producto.nombre || producto.desc}</descripcion>\n      
      <cantidad>1</cantidad>\n      
      <precioUnitario>${producto.precio}</precioUnitario>\n
      <subtotal>${producto.precio}</subtotal>\n    
    </producto>\n`;
  });
  xmlContent += `</productos>\n`;

  const subtotal = this.calcularSubtotal();
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  xmlContent += `  <totales>\n    
    <subtotal>${subtotal.toFixed(2)}</subtotal>\n    
    <iva>${iva.toFixed(2)}</iva>\n    
    <total>${total.toFixed(2)}</total>\n  
  </totales>\n`;

  xmlContent += '</factura>';

  const blob = new Blob([xmlContent], { type: 'text/xml' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'factura.xml';  
  link.click();
}

    
    calcularSubtotal(): number {
  return this.carrito.reduce((acc, item) => acc + Number(item.precio || 0), 0);
}

    
    
}

