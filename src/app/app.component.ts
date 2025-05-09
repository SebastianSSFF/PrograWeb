import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { provideHttpClient  } from '@angular/common/http'; // Asegúrate de importar HttpClientModule

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [ProductoComponent, RouterModule ],
  //template: '<router-outlet></router-outlet>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'mi-proyecto';
}
