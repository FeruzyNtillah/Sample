# Microsoft ITAD Recycling Dashboard

A comprehensive dashboard for managing IT Asset Disposition (ITAD) recycling operations, built with modern web technologies.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **AlignUI v1.2** component library
- **TanStack Query v5** for server state management
- **Zustand** for client state management
- **React Hook Form + Zod** for form validation
- **Recharts** for data visualization
- **Sonner** for toast notifications
- **Axios** for HTTP requests
- **date-fns** for date formatting
- **SheetJS (xlsx)** for Excel file processing

## Features

### Core Functionality
- **Authentication System** - Secure login/logout with JWT tokens
- **Dashboard Overview** - Real-time KPIs and metrics
- **Job Management** - Track and manage recycling jobs
- **Document Management** - Invoice and PO document handling
- **Payment Notifications** - Monitor payment status
- **Import Wizard** - Excel file upload and validation
- **Request Management** - Handle incoming requests
- **Analytics & Reporting** - Executive KPIs and SLA reporting

### User Management
- **User Profiles** - Complete profile management with password changes
- **Role-Based Access** - Admin, Viewer, and Supplier roles
- **Settings Management** - User and supplier configuration

### UI/UX Features
- **Responsive Design** - Mobile-first approach with sidebar navigation
- **Dark Theme** - Consistent dark mode throughout
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - Comprehensive error boundaries and user feedback
- **Form Validation** - Real-time validation with helpful error messages

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/FeruzyNtillah/Sample.git
cd Sample/ms-recycling-dashboard

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://5a5tknk1ik.execute-api.us-east-2.amazonaws.com
```

### Development

```bash
# Start the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── layout.tsx     # Dashboard layout with sidebar
│   │   ├── page.tsx       # Dashboard home
│   │   ├── profile/       # User profile page
│   │   ├── settings/      # Settings pages
│   │   └── ...           # Other dashboard pages
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading page
│   ├── not-found.tsx     # 404 page
│   └── global-error.tsx   # Global error page
├── components/            # React components
│   ├── shared/           # Reusable UI components
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── PageLoader.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── Skeleton.tsx
│   │   ├── PageHeader.tsx
│   │   └── Sidebar.tsx
│   └── modules/         # Page-specific components
│       ├── settings/     # Settings components
│       ├── dashboard/    # Dashboard components
│       └── ...           # Other page components
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication hook
│   └── useSettings.ts   # Settings API hooks
├── lib/                 # Utilities and configurations
│   ├── api.ts          # API service configuration
│   ├── axios.ts        # Axios instance setup
│   ├── formatters.ts   # Date and number formatting
│   └── helpers.ts     # Utility functions
├── stores/             # Zustand state stores
│   └── authStore.ts   # Authentication state
├── types/              # TypeScript type definitions
│   └── auth.ts       # Authentication types
└── middleware.ts      # Next.js middleware for auth
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Docker

```bash
# Build Docker image
docker build -t ms-recycling-dashboard .

# Run container
docker run -p 3000:3000 ms-recycling-dashboard
```

## Development Credentials

For development and testing:

- **Email**: admin@msrecyclers.com
- **Password**: admin123

## API Documentation

The API documentation is available at:
https://5a5tknk1ik.execute-api.us-east-2.amazonaws.com/docs

## Key Components

### Authentication Flow
- JWT-based authentication with automatic token refresh
- Protected routes with middleware
- Persistent login state across sessions

### Data Management
- Real-time data fetching with TanStack Query
- Optimistic updates for better UX
- Comprehensive error handling and retry logic

### Responsive Design
- Mobile-first approach with hamburger menu
- Tablet and desktop optimized layouts
- Touch-friendly interactions

### Form Handling
- React Hook Form for efficient form management
- Zod schema validation
- Real-time validation feedback

## Performance Optimizations

- **Code Splitting** - Automatic with Next.js App Router
- **Image Optimization** - Next.js Image component
- **Caching Strategy** - TanStack Query caching
- **Bundle Analysis** - Optimized imports and dependencies

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software for Microsoft ITAD Recycling operations.

## Support

For support and questions:
- Internal Microsoft Teams channel
- Email: ms-recycling-support@microsoft.com

---

**Built with ❤️ for Microsoft ITAD Recycling Operations**
