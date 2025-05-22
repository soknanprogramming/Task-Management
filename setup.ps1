# Step 2: Initialize Node.js project (if package.json doesn't exist)
if (!(Test-Path "package.json")) {
    npm init -y
}

# Step 3: Install required dependencies
npm install express body-parser jsonwebtoken bcryptjs

# Step 4: Optionally install development tools
npm install --save-dev nodemon

# Step 5: Create folder structure
$folders = @("routes", "middleware")
foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder
    }
}

# Step 6: Create placeholder files if they don't exist
$files = @(
    "index.js",
    "data.js",
    "routes\tasks.js",
    "routes\users.js",
    "middleware\auth.js",
    "middleware\logger.js"
)

foreach ($file in $files) {
    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file
    }
}
