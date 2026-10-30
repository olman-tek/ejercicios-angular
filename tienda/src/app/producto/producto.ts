import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  imports: [],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class ProductoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionTienda')) {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login']);
  }
}