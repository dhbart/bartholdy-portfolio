import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { navigation as navigationData } from '../../data/navigation';

@Component({
  selector: 'bp-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',

})
export class Header {
  navigation = navigationData;
}
