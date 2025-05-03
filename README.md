# Portfolio Management System

A Laravel + Inertia + React application for managing portfolio projects and blog posts with a modern, responsive interface and comprehensive admin dashboard.

## Features

### Portfolio Management

- Create, edit, and manage portfolio projects
- Support for unlimited project images with 5MB file upload limit
- Image management with reordering and featured image selection
- Project categorization with brandings and industries
- Featured projects highlighting on the frontend
- Project filtering by branding and industry

### Blog Management

- Comprehensive blog post creation and editing
- Rich text content with HTML tag support
- Featured images and separate thumbnail images for blog cards
- Category and tag management for better organization
- Blog post filtering by category, tag, and search terms
- Related posts functionality based on categories and tags
- SEO-friendly URLs with automatic slug generation

### User Management & Security

- Role-based access control system
- Granular permissions for different user types
- Pre-configured roles (Administrator, Editor, Author)
- Admin-only user creation (no public registration)
- Secure authentication with Laravel's built-in features
- Password reset functionality

### Admin Dashboard

- Comprehensive admin interface for all content management
- Intuitive navigation with sidebar and breadcrumbs
- Data tables with sorting, filtering, and pagination
- Consistent form design across all admin sections
- Preview functionality for blog posts and portfolio items

### Theme & Appearance

- Dark mode support with dark blue (#081d40) background
- Light mode with off-white backgrounds and light blue text
- System preference detection for automatic theme switching
- Custom fonts: Library-3-AM for titles and Univia for body text
- Responsive design for all screen sizes
- Mobile-friendly navigation and content layout

### Technical Features

- Built with Laravel, Inertia.js, and React
- Tailwind CSS v4 for styling
- SPA (Single Page Application) experience with Inertia
- Optimized for performance with proper caching
- SEO-friendly URLs and metadata
- Deployment support for Vercel, InfinityFreeHost, and shared hosting

## Local Development

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd portfolio-management-system
    ```

2. **Install dependencies**:

    ```bash
    composer install
    npm install
    ```

3. **Set up environment**:

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. **Run migrations and seed the database**:

    ```bash
    php artisan migrate --seed
    ```

5. **Link storage for file uploads**:

    ```bash
    php artisan storage:link
    ```

6. **Start the development server**:

    ```bash
    php artisan serve
    ```

7. **Start the Vite development server**:
    ```bash
    npm run dev
    ```

## Deployment

The application is designed to be deployed to various hosting environments:

- **Vercel**: For serverless deployment
- **InfinityFreeHost**: For free hosting options
- **Shared Hosting**: For traditional hosting environments

Follow the specific deployment instructions for your chosen platform.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
