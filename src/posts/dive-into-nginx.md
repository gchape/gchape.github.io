---
title: Dive into Nginx
description: A comprehensive guide to Nginx configuration, covering web server basics, security, and performance optimization.
permalink: posts/{{ title | slug }}/index.html
date: "2025-11-12"
tags: [nginx, tutorial, configuration, security, performance]
---

## Table of Contents

1. [What is Nginx?](#what-is-nginx)
2. [Path Mapping: `root` vs `alias`](#path-mapping-root-vs-alias)
3. [Serving Index Files](#serving-index-files)
4. [Custom Error Pages](#custom-error-pages)
5. [Advanced Routing with `try_files`](#advanced-routing-with-try_files)
6. [Client Request Body Handling](#client-request-body-handling)
7. [HTTP Method Restrictions](#http-method-restrictions)
8. [Rate Limiting and Bandwidth Control](#rate-limiting-and-bandwidth-control)

---

## What is Nginx?

Nginx (pronounced as "Engine-X") is an open-source software that acts both as a web server and a reverse proxy. It is known for its speed, scalability, and ability to handle many concurrent connections with low resource consumption.

**Key Features:**

- High-performance web server
- Reverse proxy and load balancer
- Low memory footprint
- Event-driven architecture
- HTTP/2 and WebSocket support

---

## Path Mapping: `root` vs `alias`

Understanding the difference between `root` and `alias` is crucial for serving files correctly.

### Using `root` (Appends Path)

The `root` directive **appends the entire request URI** to the specified path.

```nginx
http {
  server {
    listen 80;
    server_name localhost;
    root /var/www/website.com/html;

    location /admin/ {
      root /var/www/locked;
    }
  }
}
```

**Path Resolution:**

| Request URL                          | File Served From                    |
| ------------------------------------ | ----------------------------------- |
| `http://localhost/admin/secret.html` | `/var/www/locked/admin/secret.html` |

⚠️ **Common Mistake:** Many developers assume `root` replaces the path, but it **appends** the location path to the root.

✅ **Use root when:** You want to maintain the URI structure within your file system.

### Using `alias` (Replaces Path)

The `alias` directive **replaces** the matching location path with the target directory.

```nginx
http {
  server {
    listen 80;
    server_name localhost;
    root /var/www/website.com/html;

    location /admin/ {
      alias /var/www/locked/;
    }
  }
}
```

**Path Resolution:**

| Request URL                          | File Served From              |
| ------------------------------------ | ----------------------------- |
| `http://localhost/admin/secret.html` | `/var/www/locked/secret.html` |

✅ **Use alias when:** You want a URI path to map to a completely different directory structure.

⚠️ **Critical:** Always include the **trailing slash** when using `alias` with directories:

```nginx
# WRONG - Will cause path resolution issues
location /admin/ {
  alias /var/www/locked;
}

# CORRECT
location /admin/ {
  alias /var/www/locked/;
}
```

### Practical Examples

**Serving user uploads from a separate partition:**

```nginx
location /uploads/ {
  alias /mnt/storage/user-files/;
  autoindex on;
}
```

**Multiple admin panels from different directories:**

```nginx
location /admin-v1/ {
  alias /var/www/admin/legacy/;
}

location /admin-v2/ {
  alias /var/www/admin/current/;
}
```

---

## Serving Index Files

When a URL points to a directory, Nginx can automatically serve an index file.

### With `root`

```nginx
server {
  listen 80;
  root /var/www/html;
  index index.html index.htm;

  location /admin/ {
    root /var/www/locked;
    index index.html admin.html;
  }
}
```

- Request: `http://localhost/admin/`
- File served: `/var/www/locked/admin/index.html`

### With `alias`

```nginx
server {
  listen 80;
  root /var/www/html;
  index index.html;

  location /admin/ {
    alias /var/www/locked/;
    index index.html dashboard.html;
  }
}
```

- Request: `http://localhost/admin/`
- File served: `/var/www/locked/index.html`

**Pro Tip:** You can specify multiple index files. Nginx will try them in order and serve the first one that exists.

---

## Custom Error Pages

The `error_page` directive allows you to handle HTTP errors gracefully by serving custom pages, redirecting, or changing response codes.

### Basic Syntax

```nginx
error_page code1 [code2 ...] [=replacement_code] [@named_location | URI];
```

**Parameters:**

- `code1, code2 ...` → HTTP status codes to handle (404, 500, etc.)
- `=replacement_code` → Optional new status code to return
- `@named_location` → Jump to a named location block
- `URI` → Path to custom error page

### Example 1: Custom HTML Error Pages

```nginx
server {
  listen 80;
  root /var/www/html;

  error_page 404 /errors/not_found.html;
  error_page 500 502 503 504 /errors/server_error.html;
  error_page 403 /errors/forbidden.html;

  location ^~ /errors/ {
    internal;
  }
}
```

The `internal` directive ensures error pages can't be accessed directly via URL.

### Example 2: Named Location with Logging

```nginx
server {
  listen 80;

  error_page 404 @notfound;

  location @notfound {
    access_log /var/log/nginx/404.log;
    root /var/www/errors;
    rewrite ^ /404.html break;
  }
}
```

### Example 3: Fallback to Homepage

```nginx
server {
  listen 80;

  # Return 200 status and show homepage for 404s
  error_page 404 =200 /index.html;
}
```

This technique is useful for single-page applications (SPAs) where the client-side router handles all paths.

### Recursive Error Pages

Controls whether Nginx should process error pages recursively if an error page itself triggers another error.

```nginx
recursive_error_pages on | off;
```

**Contexts:** `http`, `server`, `location`

**Default:** `off`

**Example:**

```nginx
server {
  listen 80;
  recursive_error_pages on;

  error_page 404 /404.html;
  error_page 500 /500.html;
}
```

---

## Advanced Routing with `try_files`

The `try_files` directive attempts multiple file paths in sequence, allowing for flexible routing strategies.

### Syntax

```nginx
try_files file1 [file2 ...] fallback;
```

### Example 1: Static Site with Fallback

```nginx
location / {
  try_files $uri $uri.html $uri/ /index.html;
}
```

**How it works:**

1. Try the exact URI: `/about` → `/var/www/html/about`
2. Try with `.html`: `/about` → `/var/www/html/about.html`
3. Try as directory: `/about` → `/var/www/html/about/`
4. Fallback to: `/index.html`

### Example 2: Multiple Extensions

```nginx
location / {
  try_files $uri $uri.html $uri.xml $uri.json @proxy;
}

location @proxy {
  proxy_pass http://127.0.0.1:8080;
}
```

### Example 3: API Gateway Pattern

```nginx
location /api/ {
  try_files $uri @backend;
}

location @backend {
  proxy_pass http://backend_servers;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
}
```

### Example 4: Static Assets with CDN Fallback

```nginx
location /assets/ {
  try_files $uri @cdn;
}

location @cdn {
  proxy_pass https://cdn.example.com;
  proxy_cache my_cache;
}
```

#### ⚠️ Security Warning

**Never use `try_files` with executable extensions if they should be processed:**

```nginx
# ❌ DANGEROUS - May serve raw PHP source code
location / {
  try_files $uri $uri.php =404;
}

# ✅ SAFE - Properly configured
location / {
  try_files $uri $uri/ =404;
}

location ~ \.php$ {
  fastcgi_pass unix:/var/run/php-fpm.sock;
  include fastcgi_params;
}
```

Serving raw source code exposes sensitive information like database credentials and business logic.

---

## Client Request Body Handling

Optimize how Nginx handles request bodies, especially important for file uploads and POST requests.

### `client_body_buffer_size`

Sets the maximum buffer size for reading client request bodies into memory.

```nginx
http {
  client_body_buffer_size 16k;
}
```

**Key Points:**

- Default: 8k or 16k (depends on platform)
- Requests larger than this buffer are written to temporary files
- Smaller values reduce memory usage but increase disk I/O
- Units: bytes, `k` (kilobytes), or `m` (megabytes)

**Optimization Examples:**

```nginx
# For API servers with small JSON payloads
location /api/ {
  client_body_buffer_size 8k;
}

# For file upload endpoints
location /upload/ {
  client_body_buffer_size 128k;
}
```

### `client_body_in_file_only`

Forces Nginx to store request bodies in temporary files rather than memory.

```nginx
client_body_in_file_only on | off | clean;
```

**Options:**

- `on` → Always store in a file (never in memory)
- `off` → Buffer in memory first, then file if too large (default)
- `clean` → Store in file and delete immediately after processing

**Use Cases:**

```nginx
# For large file upload service
location /large-uploads/ {
  client_body_in_file_only on;
  client_max_body_size 5G;
}

# For temporary file processing
location /process/ {
  client_body_in_file_only clean;
}
```

### `client_body_temp_path`

Specifies where temporary files for client request bodies are stored.

```nginx
client_body_temp_path /tmp/nginx-client-body 1 2;
```

**Syntax:**

```nginx
client_body_temp_path path [level1 [level2 [level3]]];
```

**Multi-Level Directory Structure:**

The numeric levels create nested subdirectories to prevent too many files in one directory:

| Configuration | Total Directories        | When to Use                |
| ------------- | ------------------------ | -------------------------- |
| No levels     | 1                        | Low traffic, few uploads   |
| `1`           | 16                       | Small to medium sites      |
| `1 2`         | 16 × 256 = 4,096         | Medium to high traffic     |
| `1 2 3`       | 16 × 256 × 4,096 = 16.7M | High traffic, many uploads |

**Example with custom path:**

```nginx
http {
  # Use fast SSD for temporary files
  client_body_temp_path /mnt/ssd/nginx-temp 1 2;
  client_body_buffer_size 32k;
  client_body_in_file_only off;
}
```

### Complete Upload Configuration Example

```nginx
server {
  listen 80;
  server_name upload.example.com;

  # Allow large file uploads
  client_max_body_size 10G;

  # Use reasonable memory buffer
  client_body_buffer_size 128k;

  # Timeout for slow uploads
  client_body_timeout 300s;

  # Use fast storage for temp files
  client_body_temp_path /mnt/ssd/uploads-temp 1 2;

  location /upload/ {
    # Files over 128k go to disk
    client_body_in_file_only clean;

    proxy_pass http://upload_backend;
    proxy_request_buffering off;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
  }
}
```

---

## HTTP Method Restrictions

The `limit_except` directive allows you to restrict HTTP methods to specific clients, enhancing security.

### Basic Syntax

```nginx
limit_except METHOD1 [METHOD2...] {
  allow | deny | auth_basic | auth_basic_user_file | proxy_pass | perl;
}
```

**Context:** `location` blocks only

### How It Works

The logic is **inverse**:

- Methods listed in `limit_except` are **allowed for everyone**
- Methods **not listed** are subject to restrictions inside the block

### Example 1: Protecting Admin Routes

```nginx
location /admin/ {
  # Everyone can read (GET/HEAD)
  # Only local network can modify (POST/PUT/DELETE)
  limit_except GET {
    allow 192.168.1.0/24;
    allow 10.0.0.0/8;
    deny all;
  }
}
```

**Result:**

- Anyone can GET/HEAD
- Local IPs can use POST, PUT, DELETE, PATCH
- External IPs get `403 Forbidden` for POST, PUT, DELETE, PATCH

### Example 2: Read-Only API for Public

```nginx
location /api/ {
  limit_except GET HEAD OPTIONS {
    deny all;
  }
}
```

All clients can only perform safe operations. Write operations return `403 Forbidden`.

### Example 3: Authentication for Modifications

```nginx
location /content/ {
  limit_except GET HEAD {
    auth_basic "Content Editing Area";
    auth_basic_user_file /etc/nginx/.htpasswd;
  }
}
```

- ✅ Anyone can view content
- 🔒 Only authenticated users can POST/PUT/DELETE

### Example 4: Combining with IP Restrictions

```nginx
location /api/admin/ {
  limit_except GET {
    # Allow only specific admin IP with authentication
    satisfy all;

    allow 203.0.113.50;
    deny all;

    auth_basic "Admin API";
    auth_basic_user_file /etc/nginx/admin.htpasswd;
  }
}
```

### Example 5: Webhook Endpoint

```nginx
location /webhooks/github {
  # Only allow POST from GitHub's IP ranges
  limit_except POST {
    deny all;
  }

  allow 192.30.252.0/22;
  allow 185.199.108.0/22;
  allow 140.82.112.0/20;
  deny all;

  proxy_pass http://webhook_processor;
}
```

### Important Notes

1. **GET implies HEAD:** Allowing GET automatically allows HEAD requests
2. **Error code:** Forbidden requests return HTTP `403`
3. **Case sensitive:** Use uppercase method names (GET, POST, etc.)
4. **Common methods:** GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD

---

## Rate Limiting and Bandwidth Control

Control bandwidth usage and prevent abuse with rate limiting directives.

### `limit_rate`: Transfer Speed Limits

Limits the transfer rate for individual client connections.

**Syntax:**

```nginx
limit_rate size;
```

**Contexts:** `http`, `server`, `location`, `if`

**Example:**

```nginx
location /downloads/ {
  limit_rate 500k;
}
```

Each connection is limited to 500 KB/s.

### Understanding Per-Connection Limits

⚠️ **Critical Concept:** Limits apply **per connection**, not per user.

If a user opens 3 connections with `limit_rate 500k;`:

- Connection 1: 500 KB/s
- Connection 2: 500 KB/s
- Connection 3: 500 KB/s
- **Total bandwidth:** 1.5 MB/s

### `limit_rate_after`: Delayed Rate Limiting

Allows fast initial transfer before rate limiting kicks in.

**Syntax:**

```nginx
limit_rate_after size;
```

**Example:**

```nginx
location /videos/ {
  limit_rate_after 10m;
  limit_rate 500k;
}
```

**Behavior:**

1. First 10 MB: Maximum speed (no limit)
2. After 10 MB: Limited to 500 KB/s

Perfect for media streaming where you want quick initial buffering.

### Practical Use Cases

#### 1. Prevent Bandwidth Hogging

```nginx
location /downloads/ {
  limit_rate_after 5m;
  limit_rate 250k;
}
```

Small files download quickly; large files are throttled.

#### 2. Tiered Service Based on User Type

```nginx
# Free tier
location /free/ {
  limit_rate 128k;
}

# Premium tier
location /premium/ {
  limit_rate 2m;
}

# Enterprise tier (no limit)
location /enterprise/ {
  # No rate limiting
}
```

#### 3. Video Streaming Optimization

```nginx
location ~* \.(mp4|webm|mkv)$ {
  # Quick initial buffer
  limit_rate_after 20m;

  # Then steady stream
  limit_rate 1m;

  # Allow seeking
  mp4;
}
```

#### 4. Dynamic Rate Limiting with Variables

```nginx
map $http_user_agent $rate_limit {
  default 1m;
  ~*bot 100k;
  ~*spider 100k;
}

location /content/ {
  limit_rate $rate_limit;
}
```

#### 5. API Rate Limiting by Endpoint

```nginx
location /api/bulk/ {
  # Slower for bulk operations
  limit_rate 512k;
}

location /api/realtime/ {
  # Faster for real-time data
  limit_rate 5m;
}
```

#### 6. Geographic Rate Limiting

```nginx
geo $limit_rate {
  default 1m;

  # Faster for local users
  192.168.0.0/16 10m;
  10.0.0.0/8 10m;

  # Slower for specific countries (if using GeoIP)
  # country_US 2m;
  # country_EU 2m;
}

location /assets/ {
  limit_rate $limit_rate;
}
```

### Size Unit Reference

| Unit       | Meaning   | Example             |
| ---------- | --------- | ------------------- |
| (none)     | Bytes     | `1024` = 1024 bytes |
| `k` or `K` | Kilobytes | `500k` = 500 KB     |
| `m` or `M` | Megabytes | `2m` = 2 MB         |
| `g` or `G` | Gigabytes | `1g` = 1 GB         |

### Advanced: Request-Based Rate Limiting

For request rate limiting (requests per second), use the `limit_req` module:

```nginx
# Define rate limit zone
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

server {
  location /api/ {
    # Allow burst of 20 requests, then limit to 10 req/s
    limit_req zone=api burst=20 nodelay;

    # Also limit bandwidth
    limit_rate_after 1m;
    limit_rate 2m;
  }
}
```

### Complete Security and Performance Example

```nginx
http {
  # Request rate limiting
  limit_req_zone $binary_remote_addr zone=general:10m rate=50r/s;
  limit_req_zone $binary_remote_addr zone=strict:10m rate=5r/s;

  # Connection limiting
  limit_conn_zone $binary_remote_addr zone=addr:10m;

  server {
    listen 80;
    server_name example.com;

    # Global limits
    limit_conn addr 10;
    client_max_body_size 100m;

    # Public content - moderate limits
    location / {
      limit_req zone=general burst=100 nodelay;
      limit_rate_after 1m;
      limit_rate 1m;
    }

    # Downloads - strict bandwidth control
    location /downloads/ {
      limit_req zone=general burst=10;
      limit_rate_after 5m;
      limit_rate 500k;
    }

    # API - strict rate and method limits
    location /api/ {
      limit_req zone=strict burst=10 nodelay;
      limit_rate 2m;

      limit_except GET POST {
        deny all;
      }

      proxy_pass http://api_backend;
    }

    # Admin panel - IP restricted
    location /admin/ {
      limit_except GET {
        allow 192.168.1.0/24;
        deny all;
      }

      auth_basic "Admin Area";
      auth_basic_user_file /etc/nginx/.htpasswd;

      alias /var/www/admin/;
    }

    # Large file uploads - optimized
    location /upload/ {
      limit_except POST {
        deny all;
      }

      client_max_body_size 5G;
      client_body_buffer_size 128k;
      client_body_timeout 300s;
      client_body_temp_path /mnt/ssd/uploads 1 2;

      proxy_pass http://upload_service;
      proxy_request_buffering off;
    }
  }
}
```

---

## Summary Reference

### Path Mapping

| Directive | Behavior               | Use Case                             |
| --------- | ---------------------- | ------------------------------------ |
| `root`    | Appends URI to path    | Maintain URI structure in filesystem |
| `alias`   | Replaces URI with path | Map URI to different directory       |

### Error Handling

| Directive               | Purpose                      |
| ----------------------- | ---------------------------- |
| `error_page`            | Custom error pages           |
| `recursive_error_pages` | Allow error pages for errors |
| `try_files`             | Attempt multiple file paths  |

### Request Body

| Directive                  | Purpose            |
| -------------------------- | ------------------ |
| `client_body_buffer_size`  | Memory buffer size |
| `client_body_in_file_only` | Force file storage |
| `client_body_temp_path`    | Temp file location |

### Security

| Directive        | Purpose                   |
| ---------------- | ------------------------- |
| `limit_except`   | Restrict HTTP methods     |
| `allow` / `deny` | IP-based access control   |
| `auth_basic`     | HTTP Basic authentication |

### Performance

| Directive          | Purpose                           |
| ------------------ | --------------------------------- |
| `limit_rate`       | Bandwidth limiting per connection |
| `limit_rate_after` | Delayed bandwidth limiting        |
| `limit_req`        | Request rate limiting             |
| `limit_conn`       | Connection limiting               |

---

## Best Practices

1. **Always use HTTPS** in production
2. **Test configurations** with `nginx -t` before reloading
3. **Use specific location matches** for better performance
4. **Implement rate limiting** to prevent abuse
5. **Set appropriate timeouts** for your use case
6. **Monitor logs** regularly for security and performance issues
7. **Use named locations** for cleaner error handling
8. **Keep security headers** in a separate include file
9. **Document your configuration** with comments
10. **Regular security audits** of access rules and methods

---

## Additional Resources

- [Official Nginx Documentation](https://nginx.org/en/docs/)
- [Nginx Configuration Generator](https://nginxconfig.io/)
- [SSL Configuration Guide](https://ssl-config.mozilla.org/)
- [Security Headers Reference](https://securityheaders.com/)
