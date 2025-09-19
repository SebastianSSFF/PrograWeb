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

         xmlContent += `  <info>\n`;
        xmlContent += `    <folio>23</folio>\n`;
        xmlContent += `    <fecha>${new Date().toISOString().split('T')[0]}</fecha>\n`;
        xmlContent += `    <cliente>\n`;
        xmlContent += `      <nombre>Fabio Lopez</nombre>\n`;
        xmlContent += `      <email>fabio@gmail.com</email>\n`;
        xmlContent += `    </cliente>\n`;
        xmlContent += `  </info>\n`;

        // Productos
        xmlContent += `  <productos>\n`;
        this.carrito.forEach((producto) => {
            xmlContent += `    <producto>\n`;
            xmlContent += `      <id>${producto.id}</id>\n`;
            xmlContent += `      <nombre>${producto.nombre}</nombre>\n`;
            xmlContent += `      <descripcion>${producto.desc}</descripcion>\n`;
            xmlContent += `      <cantidad>1</cantidad>\n`;
            xmlContent += `      <precioUnitario>${producto.precio}</precioUnitario>\n`;
            xmlContent += `      <subtotal>${producto.precio}</subtotal>\n`;
            xmlContent += `    </producto>\n`;
        });
        xmlContent += `  </productos>\n`;
    
        const subtotal = this.calcularSubtotal();
        xmlContent += `  <totales>\n`;
        xmlContent += `    <subtotal>${subtotal}</subtotal>\n`;
        xmlContent += `    <total>${subtotal}</total>\n`;
        xmlContent += `  </totales>\n`;

        xmlContent += `</factura>`;

        const blob = new Blob([xmlContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'factura.xml';
        link.click();
    }

    calcularSubtotal(): number {
        return this.carrito.reduce((total, producto) => total + producto.precio, 0);
    }
    
    
}

