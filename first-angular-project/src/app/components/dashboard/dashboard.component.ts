import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactService } from '../../services/contact.service';
import { Contact, FilterType } from '../../models/contact.model';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { AlphaSpaceDirective } from '../../directives/alpha-space.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    ContactListComponent, 
    ContactDetailsComponent,
    HighlightPipe,
    AlphaSpaceDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = 'Contact Card Dashboard';
  
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  selectedContact: Contact | null = null;
  currentFilter: FilterType = 'All';
  searchTerm: string = '';

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('DashboardComponent initialized');
    this.loadContacts();
    this.updateFilteredContacts();
  }

  ngOnDestroy(): void {
    console.log('DashboardComponent destroyed');
  }

  loadContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  updateFilteredContacts(): void {
    let contacts = this.contactService.getFilteredContacts(this.currentFilter);
    
    // Apply search filter if search term exists
    if (this.searchTerm.trim()) {
      contacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    this.filteredContacts = contacts;
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

  onSearchChange(): void {
    this.updateFilteredContacts();
  }

  onAddContact(): void {
    this.router.navigate(['/contacts/new']);
  }
}
