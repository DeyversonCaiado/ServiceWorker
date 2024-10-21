# Dynamic Offline Cache with Service Worker

This project demonstrates how to implement a **Service Worker** to dynamically cache specific types of files (HTML, CSS, JavaScript, and images) from a website, ensuring offline access for users. The Service Worker intercepts network requests, caches files, and serves them from the cache when the user is offline.

## Features

- **Offline Support**: Allows the website to be fully functional even when the user is offline by caching important resources.
- **Dynamic File Caching**: Automatically fetches and caches all files (CSS, JS, images, and HTML) in a specified directory using a server-side script.
- **Automatic Cache Updates**: The Service Worker verifies if cached files have been updated on the server and refreshes the cache with new versions when changes are detected.
- **Efficient Resource Management**: Only caches necessary file types, avoiding unnecessary data usage by filtering extensions.

## How It Works

1. **Service Worker Installation**: On the initial visit, the Service Worker fetches a dynamically generated list of files from the server using a `list_files.php` script. The script returns only files with specific extensions (CSS, JS, HTML, images), which are then cached.
   
2. **File Updates Detection**: The Service Worker intercepts all fetch requests and checks whether the requested file has been updated on the server. If a newer version of the file is found, the cache is updated automatically.

3. **Offline Usage**: When the user is offline, the cached version of the requested files is served, ensuring that the site remains operational.

## Project Structure

.
- ├── index.html               # Main HTML file
- ├── styles.css               # Example CSS file
- ├── script.js                # Example JavaScript file
- ├── sw.js                    # Service Worker file
- ├── list_files.php           # PHP script to list all cacheable files dynamically
- └── assets/                  # Directory with image and other asset files
