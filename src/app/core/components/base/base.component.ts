import { Component } from '@angular/core';
import { TNavLink } from 'src/app/shared/types/nav.links.type';
import { ERoutes } from '../../config/routes';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {

  sideNavOpened = true;

  links: TNavLink[] = [
    { isActive: false, itemTitle: 'Tipo de cambio', path: ERoutes.EXCHANGE_RATE },
    { isActive: false, itemTitle: 'Favoritos', path: ERoutes.FREQUENT_RATE },
    { isActive: false, itemTitle: 'Mis Operaciones', path: ERoutes.TRANSFERS },
  ]

  toggleSideNav(): void {
    this.sideNavOpened = !this.sideNavOpened;
  }
}
