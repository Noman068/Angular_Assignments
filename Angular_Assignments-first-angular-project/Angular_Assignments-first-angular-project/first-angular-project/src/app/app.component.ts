import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactService } from './services/contact.service';
import { Contact, FilterType } from './models/contact.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Contact Card Dashboard';
  
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  selectedContact: Contact | null = null;
  currentFilter: FilterType = 'All';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.loadContacts();
    this.updateFilteredContacts();
  }

  ngOnDestroy(): void {
    console.log('AppComponent destroyed');
  }

  loadContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  updateFilteredContacts(): void {
    this.filteredContacts = this.contactService.getFilteredContacts(this.currentFilter);
  }

  onFilterChanged(filter: FilterType): void {
    this.currentFilter = filter;
    this.updateFilteredContacts();
  }

  onContactSelected(contact: Contact): void {
    this.selectedContact = contact;
  }

  onGroupToggled(data: {contactId: number, group: string, add: boolean}): void {
    this.contactService.updateContactGroups(data.contactId, data.group, data.add);
    
    // Update the selected contact to reflect changes
    if (this.selectedContact && this.selectedContact.id === data.contactId) {
      this.selectedContact = this.contactService.getContactById(data.contactId) || null;
    }
    
    // Update the filtered contacts list
    this.updateFilteredContacts();
  }
}
