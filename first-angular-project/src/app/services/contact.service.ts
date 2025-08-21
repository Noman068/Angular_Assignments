import { Injectable } from '@angular/core';
import { Contact, FilterType } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];

  constructor() {
    this.generateMockContacts();
  }

  private generateMockContacts(): void {
    const names = [
      'John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson',
      'Lisa Anderson', 'James Taylor', 'Jennifer Martinez', 'Robert Garcia', 'Amanda Rodriguez',
      'Christopher Lee', 'Jessica White', 'Daniel Clark', 'Ashley Hall', 'Matthew Lewis',
      'Nicole Young', 'Joshua King', 'Stephanie Wright', 'Andrew Green', 'Rebecca Baker',
      'Kevin Adams', 'Michelle Nelson', 'Brian Carter', 'Laura Mitchell', 'Steven Perez',
      'Rachel Roberts', 'Timothy Turner', 'Heather Phillips', 'Jason Campbell', 'Melissa Parker',
      'Ryan Evans', 'Amber Edwards', 'Jacob Collins', 'Danielle Stewart', 'Nathan Morris',
      'Brittany Rogers', 'Tyler Reed', 'Megan Cook', 'Brandon Morgan', 'Lauren Bell',
      'Alexander Murphy', 'Kayla Bailey', 'Patrick Rivera', 'Samantha Cooper', 'Sean Richardson',
      'Vanessa Cox', 'Jordan Ward', 'Tiffany Torres', 'Austin Peterson', 'Crystal Gray'
    ];

    const emails = names.map(name => 
      name.toLowerCase().replace(' ', '.') + '@email.com'
    );

    const phones = Array.from({length: 50}, (_, i) => 
      `+1-555-${String(i + 100).padStart(3, '0')}-${String(i + 1000).padStart(4, '0')}`
    );

    const addresses = [
      '123 Main St, New York, NY', '456 Oak Ave, Los Angeles, CA', '789 Pine Rd, Chicago, IL',
      '321 Elm St, Houston, TX', '654 Maple Dr, Phoenix, AZ', '987 Cedar Ln, Philadelphia, PA',
      '147 Birch Way, San Antonio, TX', '258 Spruce Ct, San Diego, CA', '369 Willow Blvd, Dallas, TX',
      '741 Aspen Pl, San Jose, CA', '852 Poplar St, Austin, TX', '963 Sycamore Ave, Jacksonville, FL',
      '159 Magnolia Rd, Fort Worth, TX', '357 Dogwood Ln, Columbus, OH', '468 Redwood Dr, Charlotte, NC',
      '579 Sequoia Way, San Francisco, CA', '681 Cypress Ct, Indianapolis, IN', '792 Juniper Blvd, Seattle, WA',
      '813 Hemlock Pl, Denver, CO', '924 Fir St, Washington, DC', '135 Spruce Ave, Boston, MA',
      '246 Pine Rd, Nashville, TN', '357 Oak Ln, Detroit, MI', '468 Maple Dr, Portland, OR',
      '579 Cedar Way, Memphis, TN', '681 Elm Ct, Oklahoma City, OK', '792 Birch Blvd, Las Vegas, NV',
      '813 Willow Pl, Louisville, KY', '924 Aspen St, Baltimore, MD', '135 Poplar Ave, Milwaukee, WI',
      '246 Sycamore Rd, Albuquerque, NM', '357 Magnolia Ln, Tucson, AZ', '468 Dogwood Dr, Fresno, CA',
      '579 Redwood Way, Sacramento, CA', '681 Sequoia Ct, Kansas City, MO', '792 Cypress Blvd, Mesa, AZ',
      '813 Juniper Pl, Atlanta, GA', '924 Hemlock St, Long Beach, CA', '135 Fir Ave, Colorado Springs, CO',
      '246 Spruce Rd, Raleigh, NC', '357 Pine Ln, Miami, FL', '468 Oak Dr, Virginia Beach, VA',
      '579 Cedar Way, Omaha, NE', '681 Elm Ct, Oakland, CA', '792 Birch Blvd, Minneapolis, MN',
      '813 Willow Pl, Tulsa, OK', '924 Aspen St, Arlington, TX', '135 Poplar Ave, Tampa, FL',
      '246 Sycamore Rd, New Orleans, LA', '357 Magnolia Ln, Wichita, KS', '468 Dogwood Dr, Cleveland, OH'
    ];

    const genders: ('male' | 'female' | 'other')[] = ['male', 'female', 'other'];

    // Generate 50 contacts with varied group assignments
    for (let i = 0; i < 50; i++) {
      const groups: string[] = [];
      
      // Ensure good distribution across groups
      if (i < 15) groups.push('Favourites'); // 30% are favourites
      if (i>14 && i < 25) groups.push('Family'); // 50% are family
      if (i>24 && i < 35) groups.push('Friends'); // 70% are friends
      if (i>34 && i < 50) groups.push('Classmates'); // 90% are classmates
      
      // Add some random additional groups for variety
      if (i % 3 === 0 && !groups.includes('Favourites')) groups.push('Favourites');
      if (i % 4 === 0 && !groups.includes('Family')) groups.push('Family');
      if (i % 5 === 0 && !groups.includes('Friends')) groups.push('Friends');
      if (i % 6 === 0 && !groups.includes('Classmates')) groups.push('Classmates');

      this.contacts.push({
        id: i + 1,
        name: names[i],
        phone: phones[i],
        email: emails[i],
        gender: genders[i % 3],
        address: addresses[i],
        groups: groups
      });
    }
  }

  getContacts(): Contact[] {
    return [...this.contacts];
  }

  getFilteredContacts(filter: FilterType): Contact[] {
    if (filter === 'All') {
      return this.getContacts();
    }
    return this.contacts.filter(contact => contact.groups.includes(filter));
  }

  updateContactGroups(contactId: number, group: string, add: boolean): void {
    const contact = this.contacts.find(c => c.id === contactId);
    if (contact) {
      if (add && !contact.groups.includes(group)) {
        contact.groups.push(group);
      } else if (!add && contact.groups.includes(group)) {
        contact.groups = contact.groups.filter(g => g !== group);
      }
    }
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }
}



