import { Component } from '@angular/core';
import { TNavLink } from 'src/app/shared/types/nav.links.type';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {

  sideNavOpened = false;

  links: TNavLink[] = [
    { isActive: true, itemTitle: 'Inicio'},
    { isActive: false, itemTitle: 'Tipo de cambio'},
  ]

  toggleSideNav():void {
    this.sideNavOpened = !this.sideNavOpened;
  }
}
