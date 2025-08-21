import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact, FilterType } from '../../models/contact.model';
import { HighlightPipe } from '../../pipes/highlight.pipe';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, HighlightPipe],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  @Input() contacts: Contact[] = [];
  @Input() selectedContactId: number | null = null;
  @Input() currentFilter: FilterType = 'All';
  @Input() searchTerm: string = '';
  
  @Output() contactSelected = new EventEmitter<Contact>();
  @Output() filterChanged = new EventEmitter<FilterType>();

  filters: FilterType[] = ['All', 'Favourites', 'Family', 'Friends', 'Classmates'];

  ngOnInit(): void {
    console.log('ContactListComponent initialized');
  }

  ngOnDestroy(): void {
    console.log('ContactListComponent destroyed');
  }

  onContactClick(contact: Contact): void {
    this.contactSelected.emit(contact);
  }

  onFilterClick(filter: FilterType): void {
    this.filterChanged.emit(filter);
  }

  isContactSelected(contact: Contact): boolean {
    return contact.id === this.selectedContactId;
  }

  isFilterActive(filter: FilterType): boolean {
    return filter === this.currentFilter;
  }

  getGroupBadges(contact: Contact): string[] {
    return contact.groups.filter(group => group !== 'Favourites');
  }
}
