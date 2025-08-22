import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  @Input() contact: Contact | null = null;
  
  @Output() groupToggled = new EventEmitter<{contactId: number, group: string, add: boolean}>();

  groups = ['Favourites', 'Family', 'Friends', 'Classmates'];

  ngOnInit(): void {
    console.log('ContactDetailsComponent initialized');
  }

  ngOnDestroy(): void {
    console.log('ContactDetailsComponent destroyed');
  }

  onGroupToggle(group: string): void {
    if (!this.contact) return;
    
    const isInGroup = this.contact.groups.includes(group);
    this.groupToggled.emit({
      contactId: this.contact.id,
      group: group,
      add: !isInGroup
    });
  }

  isInGroup(group: string): boolean {
    return this.contact?.groups.includes(group) || false;
  }

  getGroupButtonText(group: string): string {
    const isInGroup = this.isInGroup(group);
    switch (group) {
      case 'Favourites':
        return isInGroup ? '⭐ Unfavourite' : '☆ Mark as Favourite';
      case 'Family':
        return isInGroup ? '👨‍👩‍👧‍👦 Remove from Family' : '👨‍👩‍👧‍👦 Add to Family';
      case 'Friends':
        return isInGroup ? '👥 Remove from Friends' : '👥 Add to Friends';
      case 'Classmates':
        return isInGroup ? '🎓 Remove from Classmates' : '🎓 Add to Classmates';
      default:
        return isInGroup ? `Remove from ${group}` : `Add to ${group}`;
    }
  }

  getGroupButtonClass(group: string): string {
    const isInGroup = this.isInGroup(group);
    return `group-btn ${isInGroup ? 'active' : ''}`;
  }
}
