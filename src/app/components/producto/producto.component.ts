import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  standalone: true,
  selector: 'app-producto',
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  showMessage: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' = 'success';  

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos()
      .subscribe({
        next: (data: Producto[]) => {
          this.productos = data;
        },
        error: (err: any) => {
          console.error('Error al obtener productos', err);
          this.showAlert('Error al cargar los productos', 'error');
        }
      });
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
    this.showAlert(`${producto.nombre} añadido al carrito`, 'success');
  }

  private showAlert(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    this.showMessage = true;

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

}