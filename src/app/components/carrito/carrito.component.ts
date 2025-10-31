import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit, AfterViewInit {
  carrito: any[] = [];
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.calcularTotales();
  }

  ngAfterViewInit(): void {
    this.renderizarPaypal();
  }

  private calcularTotales(): void {
    this.subtotal = this.carritoService.calcularSubtotal();
    this.iva = this.subtotal * 0.16;
    this.total = this.subtotal + this.iva;
  }

  private renderizarPaypal(): void {
    const checkPaypal = () => {
      const paypal = (window as any).paypal;
      if (paypal) {
        paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: this.total.toFixed(2)
                }
              }]
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              alert(`Pago realizado por ${details.payer.name.given_name}`);
              this.carritoService.generarXML(); // Generar XML con IVA y total
            });
          },
          onError: (err: any) => {
            console.error('Error en el pago:', err);
          }
        }).render('#paypal-button-container');
      } else {
        setTimeout(checkPaypal, 300);
      }
    };

    checkPaypal();
  }

  eliminarProducto(index: number): void {
    this.carrito.splice(index, 1);
    this.calcularTotales();
  }

  irAlCatalogo() {
    this.router.navigate(['/']);
  }
}
