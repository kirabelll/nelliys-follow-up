# Nelliys Coffee Registration System

A modern, full-stack registration system built with Next.js for Nelliys Coffee business. This application provides a comprehensive registration form for potential clients and partners, along with an admin dashboard for managing registrations.

## 🚀 Features

### Registration Form
- **Comprehensive Form Fields**: Name, company details, contact information, industry, country selection
- **International Phone Input**: Country code selector with 180+ countries
- **Smart Dropdowns**: Industry selection, country selection, and source tracking
- **Form Validation**: Client-side and server-side validation with Zod
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Theme toggle for better user experience

### Admin Dashboard
- **Registration Management**: View all registrations in a clean interface
- **Advanced Filtering**: Filter by industry, country, source, follow-up status, and date range
- **Search Functionality**: Search across names, emails, companies, and job titles
- **Responsive Sidebar**: Collapsible filter panel for mobile and desktop
- **Real-time Updates**: Live filtering and search results

### Technical Features
- **Database Integration**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript implementation
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: shadcn/ui component library
- **Authentication Ready**: Structured for easy auth integration
- **Error Handling**: Comprehensive error handling and retry logic

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.4 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 5.22.0
- **Styling**: Tailwind CSS 4.0
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database (Supabase account recommended)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nelliys-follow
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="your-postgresql-connection-string"

# Supabase (Optional)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="your-supabase-anon-key"
```

### 4. Database Setup

```bash
# Generate Prisma client
pnpm prisma generate

# Push database schema
pnpm prisma db push

# Or run the SQL manually in your database
# See database-setup.sql for the complete schema
```

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
nelliys-follow/
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/               # API routes
│   │   └── registration/  # Registration endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main registration form
├── components/
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx # Theme provider
├── lib/
│   └── prisma.ts         # Database client
├── prisma/
│   └── schema.prisma     # Database schema
├── database-setup.sql    # Manual database setup
└── README.md
```

## 🎯 Usage

### Registration Form
1. Navigate to the home page (`/`)
2. Fill out the comprehensive registration form
3. Select industry, country, and source from dropdowns
4. Submit the form to save to database

### Admin Dashboard
1. Navigate to `/admin`
2. View all registrations in card format
3. Use the sidebar filters to narrow down results:
   - Search by name, email, company
   - Filter by industry, country, source
   - Filter by follow-up status
   - Filter by date range
4. Click the filter button on mobile to access filters

## 🔧 Configuration

### Database Schema
The application uses a single `registrations` table with the following fields:
- Personal info: name, email, jobTitle
- Company info: companyName, industry, country
- Contact: mobileNumber, officePhone, website
- Address: officeAddress
- Tracking: sourceEvent, followUp, followUpDate
- Additional: comment, createdAt, updatedAt

### Form Validation
All form fields include comprehensive validation:
- Required field validation
- Email format validation
- Phone number format validation
- String length limits
- URL format validation for websites

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📊 Features in Detail

### Phone Input Component
- Country code selector with flags
- 180+ countries supported
- Automatic formatting
- Validation for international numbers

### Industry & Country Selection
- 21 predefined industry categories
- 195 countries worldwide
- Searchable dropdowns
- Consistent data entry

### Source Tracking
- 44 different source options
- Marketing attribution tracking
- ROI analysis capabilities
- Customer journey insights

### Admin Filtering
- Real-time search and filtering
- Multiple filter combinations
- Export-ready data structure
- Mobile-responsive interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software for Nelliys Coffee.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `/docs` (if available)

## 🔄 Version History

- **v1.0.0** - Initial release with registration form and admin dashboard
- **v1.1.0** - Added advanced filtering and phone input improvements
- **v1.2.0** - Enhanced country and source selection dropdowns

---

Built with ❤️ for Nelliys Coffee
