# Out of Archives - E-commerce Platform

## Project Overview
Out of Archives is a sustainable streetwear e-commerce platform based in Dubai. The platform features unique mascot-inspired designs and focuses on eco-friendly materials and practices.

## Key Features

### Frontend Features
- Responsive design for all device sizes
- Product browsing with filtering and sorting
- Product detail pages with size selection and image gallery
- Shopping cart functionality
- Wishlist for saving favorite items
- User authentication (sign up, sign in, password reset)
- User account management
- Checkout process with address management
- Order history and tracking
- Multiple payment method options
- Newsletter subscription
- Contact form
- About us and commitment pages

### Design Elements
- Modern, clean UI with focus on product imagery
- Mascot-themed branding throughout the site
- Orange accent color with neutral base palette
- Responsive typography and spacing
- Mobile-first approach to ensure great experience on all devices

### User Experience Improvements
- Cross-out for out-of-stock products
- "Buy Again" functionality in order history
- Multiple address management in checkout
- UAE-specific phone number and postal code validation
- Promo code application in cart
- Order status tracking
- Wishlist functionality
- Product recommendations

## Technology Stack
- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui component library
- Vercel for deployment

## Features

- Responsive design with mobile-first approach
- Product browsing and filtering
- Product details with image gallery
- Shopping cart functionality with promo code support
- Wishlist functionality
- User authentication (sign in/sign up with email and Google)
- Checkout process with guest checkout option
- Order history with "Buy Again" functionality
- Mobile-optimized interface with responsive layouts
- Contact form
- Newsletter subscription

## Pages Implemented

1. **Homepage** (`app/page.tsx`)
   - Hero section
   - Featured products carousel (horizontal scrolling on mobile)
   - Brand story section
   - Mascot showcase
   - Sustainability section
   - Newsletter signup

2. **Products Page** (`app/products/page.tsx`)
   - Product grid with filtering and sorting
   - List/grid view toggle
   - Add to wishlist functionality
   - Mobile-friendly filters
   - Out of stock indication

3. **Product Detail Page** (`app/products/[id]/page.tsx`)
   - Image gallery
   - Product information
   - Size selection
   - Quantity adjustment
   - Add to cart/wishlist
   - Product tabs (Description, Materials & Care, Shipping)
   - Related products
   - Share product functionality

4. **Cart Page** (`app/cart/page.tsx`)
   - Cart items list
   - Quantity adjustment
   - Remove items
   - Promo code application
   - Order summary
   - Checkout button with authentication check

5. **Checkout Page** (`app/checkout/page.tsx`)
   - Address selection/input
   - Payment method selection
   - Order summary
   - Guest checkout option
   - Address saving for registered users

6. **Wishlist Page** (`app/wishlist/page.tsx`)
   - Saved items
   - Add to cart functionality
   - Remove from wishlist

7. **Account Pages**
   - Profile management
   - Address book
   - Order history with order details
   - "Buy Again" functionality

8. **Contact Page** (`app/contact/page.tsx`)
   - Contact information
   - Contact form
   - Map integration

9. **About Page** (`app/about/page.tsx`)
   - Brand story
   - Values
   - Team section
   - Sustainability commitment

10. **Our Commitment Page** (`app/our-commitment/page.tsx`)
    - Detailed sustainability practices
    - Environmental initiatives
    - Ethical manufacturing

## Components

- **Header** (`components/header.tsx`) - Navigation with mobile menu
- **Footer** (`components/footer.tsx`) - Site links and payment methods
- **ProductCard** (`components/product-card.tsx`) - Reusable product card with wishlist
- **MascotShowcase** (`components/mascot-showcase.tsx`) - Interactive mascot display
- **NewsletterSignup** (`components/newsletter-signup.tsx`) - Email subscription form
- **Authentication** (`components/auth/*`) - Sign in/sign up forms with Google integration
- **Checkout** (`components/checkout/*`) - Checkout forms for guest and authenticated users

## Implementation Notes

### Authentication

The authentication system is set up with a dialog-based approach that can be triggered from multiple places:
- Header user icon
- Cart checkout button (if not signed in)
- Wishlist page (if not signed in)

The system supports both email/password and Google authentication.

### Mobile Optimization

- Horizontal scrolling product carousel on mobile
- Responsive navigation with hamburger menu
- Optimized product grid for different screen sizes
- Touch-friendly UI elements
- Adaptive logo sizing for small mobile displays

### Payment Options

- Credit/Debit Cards (Visa, Mastercard, American Express)
- Apple Pay
- Support for promo codes and discounts

### Design System

- Apple-inspired aesthetics with clean typography and ample white space
- Orange accent color (#f97316) for brand identity
- Consistent rounded corners and subtle animations
- Dark mode support

## Next Steps for Backend Implementation

1. **Database Setup**:
   - Set up a database for products, users, orders, and wishlist items
   - Create schemas/models for each entity

2. **Authentication**:
   - Implement NextAuth.js for authentication
   - Set up Google OAuth provider
   - Create API routes for user management

3. **Product Management**:
   - Create API routes for fetching products
   - Implement filtering, sorting, and search functionality
   - Set up product inventory management

4. **Cart & Checkout**:
   - Implement cart state management (server or client-side)
   - Create API routes for order processing
   - Integrate payment gateway (Telr, Apple Pay)

5. **Wishlist**:
   - Implement wishlist functionality with database storage
   - Create API routes for adding/removing items

6. **Forms**:
   - Set up API routes for contact form submission
   - Implement newsletter subscription with email service

7. **Deployment**:
   - Deploy to Vercel or your preferred hosting platform
   - Set up environment variables for API keys and secrets
   - Configure CI/CD pipeline

## Future Enhancements
- Backend integration with database
- Payment gateway integration
- User reviews and ratings
- Advanced filtering and search
- Inventory management
- Admin dashboard
- Analytics and reporting

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

The following environment variables will be needed:
- Authentication provider keys
- Payment gateway credentials
- API endpoints

