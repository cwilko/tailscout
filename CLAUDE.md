# TailScout Project - Claude Development Notes

## Project Overview
TailScout is a UK-based charity pet search and rescue service with both a main website and mobile app for community-driven drone-based pet recovery.

## Project Structure

### Main Website
- **Location**: `/Users/cwilkin/Documents/Development/repos/tailscout/`
- **URL**: http://localhost/
- **Files**:
  - `index.html` - Main website
  - `styles.css` - Website styling with original brand colors
  - `script.js` - Interactive functionality
  - `logo3.png` - Current logo with transparent background

### Mobile App
- **Location**: `/Users/cwilkin/Documents/Development/repos/tailscout/tailscout-mobile-app/`
- **URL**: http://localhost/tailscout-mobile-app/
- **Files**:
  - `index.html` - Mobile app interface
  - `mobile-styles.css` - Mobile-specific styling
  - `mobile-app.js` - App functionality
  - `manifest.json` - PWA configuration

## How to Access

### Main Website
Visit: **http://localhost/**

### Mobile App
Visit: **http://localhost/tailscout-mobile-app/**

**Best Experience**: 
- Open in mobile browser or use browser dev tools
- Set viewport to mobile (iPhone/Android)
- For full mobile experience, add to home screen (PWA)

## Brand Colors

### Original Brand Colors (Currently Used)
- **Primary Red**: #ff6b6b (coral/salmon red)
- **Primary Teal**: #4ecdc4 (bright teal/cyan)  
- **Supporting Blue**: #45b7d1 (light blue)
- **Text**: #ffffff (white), #b8c5d6 (light blue-gray)
- **Background**: Dark gradient (#0f0f23 → #1a1a2e → #16213e)

### Test Brand Colors (Available on test page)
- **Yellow**: #FCBF05
- **White**: #FFFFFF
- **Blue**: #3D84BF  
- **Blue Muted**: #7F97AC
- **Test Page**: http://localhost/test-brand-colors.html

## Mobile App Features

### Core Functionality
1. **Report Lost Pet**
   - Detailed pet information form
   - Media upload (photos/videos)
   - GPS location capture
   - Emergency priority options

2. **Local Pet Alerts**
   - 1-mile radius notifications
   - Filter by pet type
   - Emergency alerts highlighted

3. **Spot a Pet**
   - Report sightings with exact GPS
   - Upload evidence photos/videos
   - Immediate drone deployment coordination

4. **Voluntary Donations**
   - Government-funded project with community support
   - Impact visualization (£25 = 1hr drone time)
   - One-time or recurring contributions

### Technical Features
- **PWA Ready**: Installable as mobile app
- **Offline Support**: Service worker implementation
- **Push Notifications**: Real-time alert system
- **Location Services**: GPS integration for precise reporting
- **Responsive Design**: Mobile-first interface

## Key Development Notes

### Logo Implementation
- Using `logo3.png` with transparent background
- Original brand color scheme maintained
- Clean styling without CSS filters

### Mobile App Architecture
- Government/charity branding throughout
- Community-driven messaging
- Emergency contact integration (0800-TAILSCOUT)
- Analytics tracking for engagement

### Form Validation
- Real-time field validation
- Location services integration
- Media upload previews
- Loading states and success feedback

## Recent Changes
- Added mobile app in separate folder
- Implemented comprehensive pet reporting system
- Created location-based alert system
- Added donation system with government funding messaging
- Updated logo to logo3.png across both platforms

## Testing Access
Access the mobile app at http://localhost/tailscout-mobile-app/ and test on mobile viewport for best experience.