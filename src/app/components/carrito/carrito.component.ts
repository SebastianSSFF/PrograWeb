import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router'; // Importar Router


@Component({
  selector: 'app-carrito',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})

export class CarritoComponent {
  carrito: any[] = [];
  constructor(private carritoService : CarritoService, private router : Router){
    
  }

    ngOnInit()
    {
      this.carrito=this.carritoService.obtenerCarrito();
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
