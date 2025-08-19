# Hash Navigation Implementation Guide

Your hash navigation system is now ready! Here's how to use it:

## Features Implemented

✅ **URL Hash Synchronization** - Sections automatically sync with URL hash
✅ **Browser Back/Forward Support** - Works with browser navigation
✅ **Shareable URLs** - Users can share direct links to sections
✅ **Initial Page Load Restoration** - Automatically scrolls to hash on page load
✅ **Optional Hash Updates** - Control when URLs should be updated
✅ **Stacking Cards Integration** - Special support for your card navigation

## Basic Usage

### 1. Initialize Hash Navigation (Add to your main layout or header)

```tsx
import { useHashNavigation } from "@/hooks/useHashNavigation"

function YourComponent() {
  // This hook automatically handles hash changes and restoration
  const { navigateToSection, currentHash } = useHashNavigation()
  
  const handleSectionClick = (sectionId: string) => {
    navigateToSection(sectionId) // Updates URL and scrolls
  }
}
```

### 2. Navigate to Sections

```tsx
// Method 1: Navigate with hash update (recommended for menu items)
navigateToSection("stacking-cards-0", { immediate: false, closeMenu: true })

// Method 2: Scroll without updating hash (for programmatic scrolling)
scrollToElement("section-id", { updateHash: false })

// Method 3: Navigate to specific stacking cards
const { navigateToCard } = useStackingCardsHashNavigation()
navigateToCard(2, true) // Goes to card 2 and updates URL to #stacking-cards-2
```

### 3. Reading Current State

```tsx
const { currentHash, syncEnabled } = useHashNavigation()

// Check if we're currently on a specific section
const isOnSection = currentHash === "interior-architecture"

// Get card index from hash
const { getCardFromHash } = useStackingCardsHashNavigation()
const cardIndex = getCardFromHash(currentHash || "")
```

## Integration Examples

### Header/Menu Integration

```tsx
// In your Header component
import { useHashNavigation } from "@/hooks/useHashNavigation"

export function Header() {
  const { navigateToSection, currentHash } = useHashNavigation()
  // ... your existing code
  
  const handleMenuItemClick = (sectionId: string) => {
    navigateToSection(sectionId, { closeMenu: true })
  }
}
```

### Stacking Cards Integration

```tsx
// In your stacking cards component
import { useStackingCardsHashNavigation } from "@/hooks/useHashNavigation"

export function StackingCards() {
  const { navigateToCard, currentCard } = useStackingCardsHashNavigation()
  
  const handleCardClick = (index: number) => {
    navigateToCard(index) // Updates URL to #stacking-cards-{index}
  }
}
```

## URL Examples

Your URLs will now look like:
- `https://yoursite.com/residences#stacking-cards-0` - First residence card
- `https://yoursite.com/citys-park#open-pools` - Open pools section
- `https://yoursite.com/citys-members-club#cinema` - Cinema section

## Advanced Usage

### Disable Hash Sync Temporarily

```tsx
const { disableSync, enableSync } = useHashNavigation()

// Disable during animations or special scrolling
disableSync()
// ... do your special scrolling
enableSync()
```

### Listen to Hash Changes

```tsx
const { currentHash } = useHashNavigation()

useEffect(() => {
  // React to hash changes
  console.log("User navigated to:", currentHash)
}, [currentHash])
```

## Migration from Existing Code

Your existing scroll functionality remains unchanged:
- `scrollToElement()` still works as before
- `scrollToCard()` still works as before
- All existing stores and hooks are backward compatible

The new hash navigation is additive - it doesn't break existing functionality.

## Testing

1. Navigate to any section using your menu
2. Check that the URL updates with the correct hash
3. Copy the URL and open in a new tab - should scroll to the same section
4. Use browser back/forward buttons - should navigate between sections
5. Test on mobile - hash navigation works across all devices

That's it! Your section tracking with URL hash parameters is now fully implemented and ready to use.
