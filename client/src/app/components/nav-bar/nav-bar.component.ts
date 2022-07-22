import { Component, OnInit } from '@angular/core';
import { NavBarItem } from '../models/nav-bar-item';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  menuItems: NavBarItem[] = [
    {
      label: 'Productos',
      icon: '',
      action: '',
      nodes: []
    },
    {
      label: 'Ofertas',
      icon: '',
      action: '',
      nodes: []
    },
    {
      label: 'Cuenta',
      icon: 'account_circle',
      action: '',
      nodes: []
    },
    {
      label: 'Carrito',
      icon: 'shopping_cart',
      action: '',
      nodes: []
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
