import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}