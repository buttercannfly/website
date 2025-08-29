# Favicon Configuration

This directory contains the favicon files for the AIPex website.

## Files

- `favicon.svg` - Modern SVG favicon with Chrome icon design and AI elements
- `favicon.ico` - Traditional ICO format favicon for older browsers

## Features

The favicon design includes:
- Chrome browser icon elements
- AI representation with small dots
- Blue color scheme matching the website theme
- Scalable SVG format for crisp display at any size

## Browser Support

- **Modern browsers**: Use SVG favicon for crisp, scalable display
- **Older browsers**: Fall back to ICO format
- **iOS/Safari**: Use ICO format for Apple touch icon
- **Safari pinned tabs**: Use SVG with custom color

## Configuration

The favicon is configured in `app/layout.tsx` with multiple formats for maximum compatibility:

```typescript
icons: [
  {
    rel: 'icon',
    url: '/favicon/favicon.svg',
    type: 'image/svg+xml',
  },
  {
    rel: 'icon',
    url: '/favicon/favicon.ico',
    type: 'image/x-icon',
    sizes: '32x32',
  },
  {
    rel: 'shortcut icon',
    url: '/favicon/favicon.ico',
    type: 'image/x-icon',
  },
  {
    rel: 'apple-touch-icon',
    url: '/favicon/favicon.ico',
    sizes: '180x180',
  },
  {
    rel: 'mask-icon',
    url: '/favicon/favicon.svg',
    color: '#3B82F6',
  }
]
```
