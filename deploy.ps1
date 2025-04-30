# Create a deployment directory
New-Item -Path "deployment" -ItemType Directory -Force

# Copy necessary files and directories
Copy-Item -Path "app" -Destination "deployment/" -Recurse -Force
Copy-Item -Path "bootstrap" -Destination "deployment/" -Recurse -Force
Copy-Item -Path "config" -Destination "deployment/" -Recurse -Force
Copy-Item -Path "database" -Destination "deployment/" -Recurse -Force
Copy-Item -Path "lang" -Destination "deployment/" -Recurse -Force
Copy-Item -Path "public" -Destination "deployment/" -Recurse -Force
Copy-Item -Path "resources" -Destination "deployment/" -Recurse -Force
Copy-Item -Path "routes" -Destination "deployment/" -Recurse -Force
Copy-Item -Path "storage" -Destination "deployment/" -Recurse -Force
Copy-Item -Path "vendor" -Destination "deployment/" -Recurse -Force
Copy-Item -Path ".env.example" -Destination "deployment/.env" -Force
Copy-Item -Path "artisan" -Destination "deployment/" -Force
Copy-Item -Path "composer.json" -Destination "deployment/" -Force
Copy-Item -Path "composer.lock" -Destination "deployment/" -Force
Copy-Item -Path "package.json" -Destination "deployment/" -Force

# Create necessary directories
New-Item -Path "deployment/storage/app/public" -ItemType Directory -Force
New-Item -Path "deployment/storage/framework/cache" -ItemType Directory -Force
New-Item -Path "deployment/storage/framework/sessions" -ItemType Directory -Force
New-Item -Path "deployment/storage/framework/testing" -ItemType Directory -Force
New-Item -Path "deployment/storage/framework/views" -ItemType Directory -Force
New-Item -Path "deployment/storage/logs" -ItemType Directory -Force

Write-Host "Deployment package created in the 'deployment' directory."
