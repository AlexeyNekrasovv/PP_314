# Design System Documentation

## Spring Security Admin Panel Design System

A professional, modern admin dashboard design system for Spring Boot security applications.

---

## Product Overview

**Product Type**: SaaS Admin Dashboard
**Industry**: Security & User Management
**Style**: Professional Minimalism
**Target Audience**: System administrators and authenticated users
**Technology Stack**: Spring Boot 3.3.4, Thymeleaf, Vanilla JavaScript

---

## Color Palette

### Primary Colors

```css
--primary: #4f46e5        /* Indigo - Primary actions, links */
--primary-hover: #4338ca  /* Darker indigo - Hover states */
--primary-light: rgba(79, 70, 229, 0.1) /* Light indigo - Backgrounds */
```

### Semantic Colors

```css
--success: #10b981        /* Green - Success states */
--success-light: rgba(16, 185, 129, 0.1)

--danger: #ef4444         /* Red - Errors, deletions */
--danger-hover: #dc2626
--danger-light: rgba(239, 68, 68, 0.1)

--warning: #f59e0b        /* Orange - Warnings */
--warning-light: rgba(245, 158, 11, 0.1)

--info: #3b82f6           /* Blue - Information */
--info-light: rgba(59, 130, 246, 0.1)
```

### Neutral Colors

```css
--bg-main: #f8fafc        /* Light gray - Page background */
--bg-card: #ffffff        /* White - Card backgrounds */
--bg-sidebar: #1e293b     /* Dark slate - Sidebar */
--bg-hover: rgba(0, 0, 0, 0.02) /* Hover overlay */

--text-primary: #0f172a   /* Dark slate - Primary text */
--text-secondary: #64748b /* Slate - Secondary text */
--text-muted: #94a3b8     /* Light slate - Muted text */
--text-light: #f8fafc     /* Light - Text on dark backgrounds */

--border: #e2e8f0         /* Light gray - Borders */
--border-focus: #cbd5e1   /* Gray - Focus borders */
```

---

## Typography

### Font Family

**Primary**: Inter (Google Fonts)
**Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

### Font Weights

- **Regular**: 400 - Body text
- **Medium**: 500 - Labels, subtle emphasis
- **Semibold**: 600 - Headings, buttons

### Type Scale

```css
h1: 2rem (32px)      font-weight: 600
h2: 1.5rem (24px)    font-weight: 600
h3: 1.125rem (18px)  font-weight: 600
Body: 0.875rem (14px) font-weight: 400
Small: 0.8125rem (13px)
Tiny: 0.75rem (12px)
```

### Line Height

- **Headings**: 1.2
- **Body**: 1.6 (excellent readability)
- **UI Elements**: 1.25rem

---

## Spacing System

Consistent spacing scale using CSS variables:

```css
--space-xs: 0.25rem   /* 4px */
--space-sm: 0.5rem    /* 8px */
--space-md: 1rem      /* 16px */
--space-lg: 1.5rem    /* 24px */
--space-xl: 2rem      /* 32px */
```

### Common Patterns

- **Card padding**: 1.5rem (24px)
- **Section margins**: 2rem (32px)
- **Element gaps**: 0.5rem - 1rem
- **Table cell padding**: 1rem

---

## Border Radius

```css
--radius-sm: 6px      /* Small elements */
--radius: 8px         /* Default (buttons, inputs) */
--radius-lg: 12px     /* Cards, modals */
--radius-xl: 16px     /* Large containers */
```

---

## Shadows

Subtle, professional shadows:

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow: 0 1px 3px rgba(0, 0, 0, 0.1)      /* Default card shadow */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.1) /* Modals */
```

---

## Components

### Buttons

**Variants**: Primary, Success, Danger, Info, Outline

**Structure**:
```css
padding: 0.625rem 1.25rem
border-radius: var(--radius)
font-size: 0.875rem
font-weight: 500
transition: all 0.2s ease
```

**States**:
- **Hover**: Darker shade + elevated shadow
- **Focus**: 2px outline with offset
- **Disabled**: 50% opacity, cursor: not-allowed
- **Loading**: Spinning indicator, color transparent

**Small variant**:
```css
.btn-sm
padding: 0.375rem 0.875rem
font-size: 0.8125rem
```

**Accessibility**:
- All buttons have visible focus states
- Icon-only buttons require `aria-label`
- Disabled buttons use `disabled` attribute

---

### Forms

**Input Fields**:
```css
border: 1px solid var(--border)
border-radius: var(--radius)
padding: 0.625rem 0.875rem
font-size: 0.875rem
transition: all 0.2s ease
```

**Focus State**:
```css
border-color: var(--primary)
box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1)
```

**Validation States**:
- `.is-valid` - Green border + success shadow
- `.is-invalid` - Red border + error shadow
- `.invalid-feedback` - Red text below field

**Labels**:
```css
display: block
margin-bottom: 0.375rem
font-weight: 500
font-size: 0.875rem
color: var(--text-secondary)
```

---

### Cards

Professional card design with subtle shadows:

```css
background: var(--bg-card)
border: none
border-radius: var(--radius-lg)
box-shadow: var(--shadow)
overflow: hidden
```

**Card Header**:
```css
padding: 1rem 1.5rem
border-bottom: 1px solid var(--border)
font-weight: 600
```

**Card Body**:
```css
padding: 1.5rem
```

---

### Tables

Clean, modern data tables:

**Table Structure**:
```css
.table
width: 100%
border-collapse: collapse
```

**Table Headers**:
```css
background: var(--bg-main)
padding: 1rem
font-weight: 600
font-size: 0.75rem
text-transform: uppercase
letter-spacing: 0.05em
color: var(--text-secondary)
```

**Table Cells**:
```css
padding: 1rem
vertical-align: middle
border-bottom: 1px solid var(--border)
```

**Hover State**:
```css
.table tbody tr:hover
background-color: rgba(79, 70, 229, 0.05)
```

---

### Modals

**Overlay**:
```css
background: rgba(15, 23, 42, 0.6)
backdrop-filter: blur(4px)
```

**Modal Container**:
```css
max-width: 480px
background: var(--bg-card)
border-radius: var(--radius-lg)
box-shadow: var(--shadow-lg)
```

**Modal Header**:
```css
display: flex
justify-content: space-between
align-items: center
padding: 1.25rem 1.5rem
border-bottom: 1px solid var(--border)
```

**Modal Body**:
```css
padding: 1.5rem
```

---

### Navigation

**Navbar**:
```css
background: var(--bg-sidebar)
padding: 0.75rem 1.5rem
box-shadow: var(--shadow)
```

**Sidebar**:
```css
background: var(--bg-sidebar)
min-height: calc(100vh - 56px)
padding: 1rem 0
width: 220px
```

**Nav Links**:
```css
color: var(--text-light)
padding: 0.75rem 1.5rem
border-radius: var(--radius)
transition: var(--transition)
```

**Active State**:
```css
background: var(--primary)
```

**Hover State**:
```css
background: rgba(255, 255, 255, 0.1)
```

---

### Toast Notifications

Modern, unobtrusive notifications:

**Container**:
```css
position: fixed
top: 1rem
right: 1rem
z-index: 9999
```

**Toast**:
```css
padding: 1rem
background: var(--bg-card)
border-radius: var(--radius)
box-shadow: var(--shadow-lg)
border-left: 3px solid var(--primary)
animation: slideInRight 0.3s ease
```

**Types**:
- `toast-success` - Green left border
- `toast-error` - Red left border
- `toast-warning` - Orange left border

**Auto-dismiss**: 4 seconds

---

### Badges & Status Indicators

**Role Badge**:
```css
display: inline-block
padding: 0.25rem 0.625rem
background: rgba(79, 70, 229, 0.1)
color: var(--primary)
border-radius: 20px
font-size: 0.75rem
font-weight: 500
```

**Status Indicator**:
```css
display: inline-flex
align-items: center
gap: 0.375rem
padding: 0.25rem 0.75rem
border-radius: 9999px
font-size: 0.75rem
font-weight: 500
```

With colored dot indicator:
```css
.status-indicator::before
width: 6px
height: 6px
border-radius: 50%
background: currentColor
```

---

### Icons

**Icon System**: Heroicons (SVG)
**Default Size**: 20x20px for UI, 18x18px for sidebar, 16x16px for buttons

**Usage**:
```html
<svg style="width: 20px; height: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="..." />
</svg>
```

**IMPORTANT**: Always use SVG icons, never emojis

---

## Animations & Transitions

### Timing

```css
--transition: all 0.2s ease        /* Default */
--transition-fast: all 0.15s ease  /* Quick interactions */
```

### Micro-interactions

**Duration**: 150-300ms
**Easing**: ease or ease-in-out

### Loading Animations

**Button Spinner**:
```css
@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
```

**Page Spinner**:
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Slide In Animation

```css
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

---

## Accessibility

### WCAG 2.1 Level AA Compliance

**Color Contrast**:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

**Focus Indicators**:
```css
:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

**Touch Targets**:
- Minimum size: 44x44px
- Buttons already meet this requirement

**Keyboard Navigation**:
- Tab order follows visual order
- All interactive elements focusable
- Modal traps focus when open

**ARIA Labels**:
- Icon-only buttons have `aria-label`
- Form inputs have associated labels
- Status messages use appropriate roles

**Screen Readers**:
- Semantic HTML (nav, main, header)
- Alt text for all meaningful images
- Skip links where appropriate

---

## Responsive Design

### Breakpoints

```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

### Mobile Adjustments

**Spacing**:
- Reduce padding: 1rem instead of 2rem
- Smaller gaps: 0.5rem instead of 1rem

**Typography**:
- Minimum 16px body text (prevents zoom on iOS)
- Reduced heading sizes

**Tables**:
- Font size: 0.8125rem
- Cell padding: 0.75rem 0.5rem

**Buttons**:
- Larger touch targets
- Full-width on mobile forms

**Toasts**:
- Full width on mobile (left: 1rem, right: 1rem)

---

## Loading States

### Button Loading

```javascript
function setButtonLoading(button, loading) {
  if (loading) {
    button.disabled = true;
    button.classList.add('btn-loading');
  } else {
    button.disabled = false;
    button.classList.remove('btn-loading');
  }
}
```

**Visual**: Spinning indicator replaces text

### Empty States

**Structure**:
- Centered layout
- Large icon (64x64px, 50% opacity)
- Heading + description
- Optional CTA button

**Example**:
```html
<div class="empty-state">
  <svg>...</svg>
  <h3>No users found</h3>
  <p>Get started by adding your first user</p>
</div>
```

---

## Best Practices

### Do's ✅

1. **Use SVG icons** from Heroicons, not emojis
2. **Provide visual feedback** for all user actions
3. **Show loading states** during async operations
4. **Use toast notifications** instead of alerts
5. **Maintain consistent spacing** using CSS variables
6. **Test with keyboard navigation** for accessibility
7. **Validate forms** with clear error messages
8. **Use semantic HTML** (nav, main, section)
9. **Add aria-labels** to icon-only buttons
10. **Test responsive** at 375px, 768px, 1024px

### Don'ts ❌

1. ❌ Don't use emojis as UI icons
2. ❌ Don't use browser `alert()` or `confirm()` dialogs
3. ❌ Don't forget loading states on buttons
4. ❌ Don't skip focus states on interactive elements
5. ❌ Don't use colors alone to convey meaning
6. ❌ Don't hardcode spacing values
7. ❌ Don't mix inconsistent border radius
8. ❌ Don't forget hover states on clickable elements
9. ❌ Don't use generic error messages
10. ❌ Don't submit forms without validation feedback

---

## Component Checklist

Before implementing any component, ensure:

- [ ] Uses design system colors
- [ ] Follows spacing scale
- [ ] Has proper hover/focus states
- [ ] Works with keyboard navigation
- [ ] Includes loading states (if applicable)
- [ ] Has error states (if applicable)
- [ ] Uses SVG icons (not emojis)
- [ ] Meets 4.5:1 contrast ratio
- [ ] Responsive on mobile
- [ ] Has proper ARIA labels

---

## JavaScript Utilities

### Toast Notification

```javascript
showToast(message, type) // types: success, error, warning
```

### Button Loading State

```javascript
setButtonLoading(button, true/false)
```

### Modal Control

```javascript
openModal(modalId)
closeModal(modalId)
```

### User Count

```javascript
updateUserCount(count)
```

---

## Files Structure

```
src/main/resources/
├── static/
│   ├── css/
│   │   └── style.css          # Complete design system
│   └── js/
│       ├── users.js           # Admin dashboard logic
│       └── user.js            # User profile logic
└── templates/
    ├── login.html             # Login page
    ├── users.html             # Admin dashboard
    └── user.html              # User profile
```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Features Used**:
- CSS Variables (custom properties)
- Flexbox & Grid
- backdrop-filter (graceful degradation)
- CSS animations

---

## Performance

**Optimizations**:
- CSS variables reduce redundancy
- Single font family (Inter)
- Inline SVG icons (no external requests)
- Minimal JavaScript dependencies
- Efficient DOM updates

**Lighthouse Score Target**:
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 90+

---

## Maintenance

**Regular Reviews**:
1. Audit color contrast ratios
2. Test keyboard navigation
3. Review loading state consistency
4. Check mobile responsiveness
5. Validate ARIA labels
6. Test with screen readers
7. Monitor console for errors

**Updates**:
- Keep design tokens in sync across files
- Document any custom modifications
- Test changes across all pages
- Maintain accessibility standards

---

## Credits

**Design System**: Professional Admin Dashboard
**Icons**: Heroicons (heroicons.com)
**Typography**: Inter by Rasmus Andersson (rsms.me/inter)
**Inspiration**: Modern SaaS dashboards (Tailwind UI, Stripe)

---

Last Updated: 2026-01-20
