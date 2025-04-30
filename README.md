# Portfolio Management System

A Laravel + Inertia + React application for managing portfolio projects and blog posts.

## Features

- Portfolio project management
- Blog post management
- Admin dashboard
- Responsive design
- SEO-friendly URLs

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
