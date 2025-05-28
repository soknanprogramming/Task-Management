if (!(Test-Path "package.json")) {
    npm init -y
}

npm install express body-parser jsonwebtoken bcryptjs
npm install --save-dev nodemon

$folders = @("routes", "middleware")
foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder
    }
}

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
