import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterModule],
  template: '<router-outlet></router-outlet>',
  providers: [HttpClientModule ] , // Proporciona HttpClient aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

}