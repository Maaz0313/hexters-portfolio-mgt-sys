# Portfolio Management System

A Laravel + Inertia + React application for managing portfolio projects and blog posts.

## Features

- Portfolio project management
- Blog post management
- Admin dashboard
- Responsive design
- SEO-friendly URLs

## Deployment to Vercel

This application is configured for deployment on Vercel. Follow these steps to deploy:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy the application**:
   ```bash
   vercel
   ```

4. **Set up environment variables**:
   After the initial deployment, set up the required environment variables in the Vercel dashboard:
   - `APP_KEY`: Your Laravel application key (already in .env.production)
   - `DB_CONNECTION`: Your database connection (mysql, pgsql, etc.)
   - `DB_HOST`: Your database host
   - `DB_PORT`: Your database port
   - `DB_DATABASE`: Your database name
   - `DB_USERNAME`: Your database username
   - `DB_PASSWORD`: Your database password

5. **Deploy with production settings**:
   ```bash
   vercel --prod
   ```

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

4. **Run migrations**:
   ```bash
   php artisan migrate
   ```

5. **Start the development server**:
   ```bash
   php artisan serve
   ```

6. **Start the Vite development server**:
   ```bash
   npm run dev
   ```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
