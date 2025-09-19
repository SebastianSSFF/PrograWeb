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
    
        // Información de la factura
        xmlContent += `  <info>\n    
        <folio>23</folio>\n    
        <fecha>${new Date().toISOString().split('T')[0]}</fecha>\n    
        <cliente>\n      
        <nombre>Fabio Lopez</nombre>\n      
        <email>fabio@gmail.com</email>\n    
        </cliente>\n  
        </info>\n`;
    
        // Productos en el carrito
        xmlContent += `<productos>\n`;
        this.carrito.forEach((producto) => {
            xmlContent += `<producto>\n      
            <id>ID: ${producto.id}</id>\n      
            <descripcion>${producto.nombre && producto.desc}</descripcion>\n      
            <cantidad>Cantidad: 1</cantidad>\n      
            <precioUnitario>Precio unitario: ${producto.precio}</precioUnitario>\n
            <subtotal>Subtotal: ${producto.precio}</subtotal>\n    
            </producto>\n`;
        });
        xmlContent += `</productos>\n`;
    
        const subtotal = this.calcularSubtotal();
        const total = subtotal;
        xmlContent += `  <totales>\n    
        <subtotal>Subtotal sin IVA: ${subtotal}</subtotal>\n    
        <total>Total: ${total}</total>\n  </totales>\n`;
    
        xmlContent += '</factura>';
    
        const blob = new Blob([xmlContent], { type: 'application/xml' });
    
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'factura.xml';  
    
        link.click();
    }
    
    // Método para calcular el subtotal
    calcularSubtotal(): number {
        return this.carrito.reduce((total, producto) => total + producto.precio, 0);
    }
    
    
}

