import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  groups = ['Favourites', 'Family', 'Friends', 'Classmates'];
  genders = ['male', 'female', 'other'];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('AddContactComponent initialized');
    this.initForm();
  }

  ngOnDestroy(): void {
    console.log('AddContactComponent destroyed');
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^03\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],
      groups: [[]]
    });
  }

  onGroupToggle(group: string): void {
    const currentGroups = this.contactForm.get('groups')?.value || [];
    const groupIndex = currentGroups.indexOf(group);
    
    if (groupIndex > -1) {
      currentGroups.splice(groupIndex, 1);
    } else {
      currentGroups.push(group);
    }
    
    this.contactForm.patchValue({ groups: currentGroups });
  }

  isGroupSelected(group: string): boolean {
    const selectedGroups = this.contactForm.get('groups')?.value || [];
    return selectedGroups.includes(group);
  }

  getGroupButtonText(group: string): string {
    const isInGroup = this.isGroupSelected(group);
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
    const isInGroup = this.isGroupSelected(group);
    return `group-btn ${isInGroup ? 'active' : ''}`;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;
      
      // Generate a new ID (simple approach - in real app you'd use a proper ID generator)
      const existingContacts = this.contactService.getContacts();
      const newId = Math.max(...existingContacts.map(c => c.id)) + 1;
      
      const newContact: Contact = {
        id: newId,
        name: formValue.name,
        phone: formValue.phone,
        email: formValue.email,
        gender: formValue.gender,
        address: formValue.address,
        groups: formValue.groups || []
      };
      
      // Add the contact to the service
      this.contactService.addContact(newContact);
      
      // Navigate back to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'phone') {
          return 'Phone number must be 11 digits starting with 03 (e.g., 03123456789)';
        } else if (fieldName === 'name') {
          return 'Name must start with a letter and can only contain letters and spaces';
        }
        return 'Please enter a valid format';
      }
    }
    return '';
  }
}
