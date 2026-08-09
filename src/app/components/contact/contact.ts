import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { contacts as contactsData } from '../../data/contacts';

@Component({
  selector: 'bp-contact',
  imports: [NgOptimizedImage],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly contacts = contactsData;
}
