import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CarritoComponent } from './components/carrito/carrito.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: ProductoComponent },
  { 
    path: 'carrito', 
    component: CarritoComponent,
  },
  { 
    path: 'inventario', 
    component: InventarioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }