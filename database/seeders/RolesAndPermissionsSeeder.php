<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            // User management permissions
            ['name' => 'View Users', 'slug' => 'view-users', 'description' => 'Can view users'],
            ['name' => 'Create Users', 'slug' => 'create-users', 'description' => 'Can create users'],
            ['name' => 'Edit Users', 'slug' => 'edit-users', 'description' => 'Can edit users'],
            ['name' => 'Delete Users', 'slug' => 'delete-users', 'description' => 'Can delete users'],

            // Role management permissions
            ['name' => 'View Roles', 'slug' => 'view-roles', 'description' => 'Can view roles'],
            ['name' => 'Create Roles', 'slug' => 'create-roles', 'description' => 'Can create roles'],
            ['name' => 'Edit Roles', 'slug' => 'edit-roles', 'description' => 'Can edit roles'],
            ['name' => 'Delete Roles', 'slug' => 'delete-roles', 'description' => 'Can delete roles'],

            // Blog management permissions
            ['name' => 'View Blog Posts', 'slug' => 'view-blog-posts', 'description' => 'Can view blog posts'],
            ['name' => 'Create Blog Posts', 'slug' => 'create-blog-posts', 'description' => 'Can create blog posts'],
            ['name' => 'Edit Blog Posts', 'slug' => 'edit-blog-posts', 'description' => 'Can edit blog posts'],
            ['name' => 'Delete Blog Posts', 'slug' => 'delete-blog-posts', 'description' => 'Can delete blog posts'],

            // Portfolio management permissions
            ['name' => 'View Portfolio Projects', 'slug' => 'view-portfolio-projects', 'description' => 'Can view portfolio projects'],
            ['name' => 'Create Portfolio Projects', 'slug' => 'create-portfolio-projects', 'description' => 'Can create portfolio projects'],
            ['name' => 'Edit Portfolio Projects', 'slug' => 'edit-portfolio-projects', 'description' => 'Can edit portfolio projects'],
            ['name' => 'Delete Portfolio Projects', 'slug' => 'delete-portfolio-projects', 'description' => 'Can delete portfolio projects'],

            // Category management permissions
            ['name' => 'View Categories', 'slug' => 'view-categories', 'description' => 'Can view categories'],
            ['name' => 'Create Categories', 'slug' => 'create-categories', 'description' => 'Can create categories'],
            ['name' => 'Edit Categories', 'slug' => 'edit-categories', 'description' => 'Can edit categories'],
            ['name' => 'Delete Categories', 'slug' => 'delete-categories', 'description' => 'Can delete categories'],

            // Tag management permissions
            ['name' => 'View Tags', 'slug' => 'view-tags', 'description' => 'Can view tags'],
            ['name' => 'Create Tags', 'slug' => 'create-tags', 'description' => 'Can create tags'],
            ['name' => 'Edit Tags', 'slug' => 'edit-tags', 'description' => 'Can edit tags'],
            ['name' => 'Delete Tags', 'slug' => 'delete-tags', 'description' => 'Can delete tags'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }

        // Create roles
        $adminRole = Role::create([
            'name' => 'Administrator',
            'slug' => 'administrator',
            'description' => 'Administrator with full access',
        ]);

        $editorRole = Role::create([
            'name' => 'Editor',
            'slug' => 'editor',
            'description' => 'Editor with limited access',
        ]);

        $authorRole = Role::create([
            'name' => 'Author',
            'slug' => 'author',
            'description' => 'Author with minimal access',
        ]);

        // Assign all permissions to admin role
        $adminRole->permissions()->attach(Permission::all());

        // Assign specific permissions to editor role
        $editorRole->permissions()->attach(
            Permission::whereIn('slug', [
                'view-users',
                'view-blog-posts',
                'create-blog-posts',
                'edit-blog-posts',
                'view-portfolio-projects',
                'create-portfolio-projects',
                'edit-portfolio-projects',
                'view-categories',
                'create-categories',
                'edit-categories',
                'view-tags',
                'create-tags',
                'edit-tags',
            ])->get()
        );

        // Assign specific permissions to author role
        $authorRole->permissions()->attach(
            Permission::whereIn('slug', [
                'view-blog-posts',
                'create-blog-posts',
                'edit-blog-posts',
                'view-portfolio-projects',
                'create-portfolio-projects',
                'edit-portfolio-projects',
                'view-categories',
                'view-tags',
            ])->get()
        );

        // Assign admin role to admin user
        $adminUser = User::where('is_admin', true)->first();
        if ($adminUser) {
            $adminUser->roles()->attach($adminRole);
        }
    }
}
