import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router'; // Importar Router
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-carrito',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})

export class CarritoComponent {
  carrito: any[] = [];
  subtotal: number = 0;
  constructor(private carritoService : CarritoService, private router : Router){ }

    private stripe: any;

    ngOnInit()
    {
      this.carrito=this.carritoService.obtenerCarrito();
      this.subtotal = this.carritoService.calcularSubtotal();
      
    }

     ngAfterViewInit(): void {
  const checkPaypal = () => {
    const paypal = (window as any).paypal;
    if (paypal) {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.subtotal.toFixed(2)
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
  return actions.order.capture().then((details: any) => {
    alert(`Pago realizado por ${details.payer.name.given_name}`);
    
    // Generar automáticamente el XML después del pago
    this.carritoService.generarXML();
  });
}
,
        onError: (err: any) => {
          console.error('Error en el pago:', err);
        }
      }
    ).render('#paypal-button-container');
    } else {
      console.log("Esperando a que cargue el SDK de PayPal...");
      setTimeout(checkPaypal, 300); // Reintenta cada 300 ms
    }
  };

  checkPaypal(); // Inicia la verificación
}



    eliminarProducto(index: number): void{
      this.carrito.splice(index, 1);
    }

    generarXML(): void{
      this.carritoService.generarXML();
      const blob = new Blob([this.carritoService.xml], {type: 'text/xml'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download ='carrito.xml';
      document.body.appendChild(a);
      URL.revokeObjectURL(url);
    }
    
    irAlCatalogo()
    {
      this.router.navigate(['/']); // Navegar a la ruta principal (catálogo)
    }
}
