export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  groups: string[];
}

export type FilterType = 'All' | 'Favourites' | 'Family' | 'Friends' | 'Classmates';
