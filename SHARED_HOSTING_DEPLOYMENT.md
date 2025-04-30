# Deploying to Shared Hosting

This guide will help you deploy your Laravel+Inertia+React application to a shared hosting environment.

## Prerequisites

- A shared hosting account with PHP 8.2+ support
- MySQL database
- FTP access to your hosting account
- SSH access (optional but helpful)

## Deployment Steps

### 1. Upload Files

1. Connect to your shared hosting using FTP
2. Upload all files from the `deployment` directory to your hosting account
   - If your hosting provider requires the site to be in a specific directory (like `public_html`), upload the contents there
   - Make sure to include hidden files like `.htaccess`

### 2. Configure Database

1. Create a new MySQL database through your hosting control panel
2. Create a database user and assign it to the database
3. Update the `.env` file with your database credentials:
   ```
   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   ```

### 3. Configure Application URL

1. Update the `APP_URL` in the `.env` file to match your domain:
   ```
   APP_URL=https://your-domain.com
   ```

### 4. Set Directory Permissions

Set the correct permissions for these directories:
- `storage` directory: 755 recursively
- `bootstrap/cache` directory: 755
- `storage/framework` directory: 755 recursively
- `storage/logs` directory: 755

If you have SSH access, you can run:
```
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

### 5. Run Migrations

If you have SSH access, navigate to your application directory and run:
```
php artisan migrate
```

If you don't have SSH access:
1. Create a temporary PHP file in your public directory (e.g., `migrate.php`) with the following content:
   ```php
   <?php
   
   // Path to the application
   require __DIR__.'/../vendor/autoload.php';
   $app = require_once __DIR__.'/../bootstrap/app.php';
   
   // Run the migrations
   $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
   $kernel->call('migrate', ['--force' => true]);
   
   echo "Migrations completed successfully!";
   ```
2. Access this file through your browser: `https://your-domain.com/migrate.php`
3. Delete the file after migrations are complete

### 6. Create Storage Symlink

If you have SSH access, run:
```
php artisan storage:link
```

If you don't have SSH access, create a temporary PHP file (e.g., `symlink.php`) with:
```php
<?php

// Path to the application
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';

// Create the symlink
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->call('storage:link');

echo "Storage link created successfully!";
```

### 7. Test Your Application

Visit your domain in a web browser to ensure everything is working correctly.

## Troubleshooting

### 500 Internal Server Error

- Check the `.htaccess` file is uploaded correctly
- Ensure PHP version is 8.2 or higher
- Check file permissions
- Look for error logs in the `storage/logs` directory

### Database Connection Issues

- Verify database credentials in the `.env` file
- Check if your hosting provider requires a specific host other than `localhost`
- Ensure your database user has the necessary permissions

### Missing Assets

- Make sure the `public/build` directory was uploaded with all assets
- Check if the storage symlink was created correctly

### White Screen / Blank Page

- Enable debugging temporarily by setting `APP_DEBUG=true` in the `.env` file
- Check PHP error logs provided by your hosting

## Maintenance

### Updating Your Application

1. Make changes locally and test
2. Run `npm run build` to build frontend assets
3. Upload the updated files to your hosting via FTP
4. If database schema changed, run migrations

### Clearing Cache

If you have SSH access, run:
```
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

If you don't have SSH access, create a temporary PHP file (e.g., `clear-cache.php`) with:
```php
<?php

// Path to the application
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';

// Clear cache
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->call('cache:clear');
$kernel->call('config:clear');
$kernel->call('route:clear');
$kernel->call('view:clear');

echo "Cache cleared successfully!";
```
