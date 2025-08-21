# Contact Card Dashboard

A modern Angular application for managing contacts with advanced filtering, search, and group management capabilities.

## 🚀 How to Run the App

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm start
   ```

3. **Open Browser:**
   Navigate to `http://localhost:4200`

## 📁 Project Structure

### Routes & Components
- **`/dashboard`** - Main dashboard with contact list and details
- **`/contacts/new`** - Add new contact form

### Key Components Location
```
src/app/
├── components/
│   ├── dashboard/           # Main dashboard component
│   ├── contact-list/        # Left panel with filters and contact cards
│   ├── contact-details/     # Right panel with contact details
│   └── add-contact/         # Add new contact form
├── services/
│   └── contact.service.ts   # Data management and business logic
├── models/
│   └── contact.model.ts     # Contact interface and types
├── pipes/
│   └── highlight.pipe.ts    # Highlights search matches
└── directives/
    └── alpha-space.directive.ts # Restricts input to letters and spaces
```

## 🔧 State Management

### Parent-Child Communication
- **State Up, Data Down**: The dashboard component owns all state
- **@Input()**: Children receive data from parent
- **@Output()**: Children emit events to parent
- **Immediate Updates**: All changes reflect instantly across components

### Service Layer
- **ContactService**: Single source of truth for contact data
- **Mock Data**: 50 pre-generated contacts with varied group assignments
- **Methods**: 
  - `getContacts()` - Get all contacts
  - `getFilteredContacts(filter)` - Get filtered contacts
  - `updateContactGroups()` - Update contact groups
  - `addContact()` - Add new contact

## ✨ Features

### Dashboard (`/dashboard`)
- **Filter Buttons**: All, Favourites, Family, Friends, Classmates
- **Search**: Exact name matching with highlighting
- **Contact Cards**: Display name, phone, email, gender, and group badges
- **Contact Details**: Full contact information with group management
- **Add Contact Button**: Navigate to add contact form

### Add Contact (`/contacts/new`)
- **Reactive Forms**: Form validation and error handling
- **All Fields**: Name, phone, email, gender, address, groups
- **Group Selection**: Toggle buttons for multiple group selection
- **Validation**: Required fields, email format, phone pattern

### Search Functionality
- **Partial Match**: Case-insensitive name matching (finds partial matches)
- **Highlight Pipe**: Matched portions are highlighted in yellow
- **Alpha-Space Directive**: Only allows letters and spaces in search

### Group Management
- **Toggle Groups**: Add/remove contacts from groups
- **Immediate Updates**: Changes reflect in filtered lists instantly
- **Visual Feedback**: Active groups show as badges

## 🎯 Technical Implementation

### Lifecycle Hooks
- `ngOnInit()`: Component initialization logging
- `ngOnDestroy()`: Component cleanup logging

### Custom Directives
- **AlphaSpaceDirective**: Restricts input to A-Z, a-z, and spaces
- **Control Keys**: Allows Backspace, Delete, Arrow keys, etc.

### Custom Pipes
- **HighlightPipe**: Highlights exact search matches
- **Safe HTML**: Uses DomSanitizer for security

### Responsive Design
- **Mobile-First**: Responsive grid layout
- **Breakpoints**: 1024px, 768px, 480px
- **Flexible Components**: Adapt to different screen sizes

## 🔄 Data Flow

1. **User Action** (click, type, etc.)
2. **Child Component** emits event via @Output()
3. **Parent Component** receives event and updates state
4. **Service** processes data changes
5. **Updated Data** flows down via @Input() to children
6. **UI Updates** immediately across all components

## 🎨 Styling

- **SCSS**: Modern CSS with variables and nesting
- **Bootstrap-like**: Familiar color scheme and spacing
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Focus states and keyboard navigation

## 🚀 Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:4200/dashboard`

The app will load with 50 mock contacts and you can immediately start filtering, searching, and managing contact groups!
