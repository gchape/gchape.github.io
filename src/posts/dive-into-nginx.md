# Nginx Guide

Nginx (pronounced "engine-ex") is a fast, efficient web server that handles lots of concurrent connections without eating your RAM. It's used for serving sites, routing traffic, and load balancing.

## Root vs Alias

This trips up a lot of people at first.

**root** - Adds the request path to your root directory:

```nginx
location /admin/ {
  root /var/www/locked;
}
```

Request for `/admin/secret.html` looks at `/var/www/locked/admin/secret.html`. Notice it kept the `/admin/` part.

**alias** - Replaces the matched location:

```nginx
location /admin/ {
  alias /var/www/locked/;
}
```

Same request now looks at `/var/www/locked/secret.html`. The `/admin/` got swapped out.

Always add the trailing slash with alias or things break.

Use root when your URL structure matches your files. Use alias when you want different paths.

## Index Files

When someone visits a directory like `/admin/`, Nginx needs to know what file to show:

```nginx
server {
  root /var/www/html;
  index index.html index.htm;
}
```

It tries each file in order and uses the first one it finds.

## Error Pages

Basic setup:

```nginx
server {
  error_page 404 /errors/not_found.html;
  error_page 500 502 503 504 /errors/server_error.html;

  location ^~ /errors/ {
    internal;
  }
}
```

The `internal` directive prevents direct access to error pages.

For single-page apps, redirect all 404s to index.html:

```nginx
error_page 404 =200 /index.html;
```

The `=200` changes the status code so your app can handle routing.

## Try Files

`try_files` lets you define fallbacks:

```nginx
location / {
  try_files $uri $uri.html $uri/ /index.html;
}
```

For `/about` it tries: exact file, then `.html` extension, then directory, finally fallback to index.

Great for static-first setups with API fallback:

```nginx
location / {
  try_files $uri @backend;
}

location @backend {
  proxy_pass http://127.0.0.1:8080;
}
```

## Request Body Handling

Control how much stays in memory:

```nginx
client_body_buffer_size 16k;
```

Anything larger gets written to disk. Bump it up for file uploads:

```nginx
location /upload/ {
  client_body_buffer_size 128k;
  client_max_body_size 5G;
}
```

Specify temp file location:

```nginx
client_body_temp_path /mnt/ssd/nginx-temp 1 2;
```

The numbers create nested directories to avoid too many files in one folder.

## Method Restrictions

`limit_except` lists allowed methods, then restricts everything else:

```nginx
location /admin/ {
  limit_except GET {
    allow 192.168.1.0/24;
    deny all;
  }
}
```

Everyone can GET. Only local IPs can POST/PUT/DELETE.

Make an API read-only:

```nginx
location /api/ {
  limit_except GET HEAD OPTIONS {
    deny all;
  }
}
```

## Rate Limiting

Limit bandwidth per connection:

```nginx
location /downloads/ {
  limit_rate 500k;
}
```

Let the first chunk download fast, then throttle:

```nginx
location /videos/ {
  limit_rate_after 10m;
  limit_rate 500k;
}
```

Limit requests per second:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
  limit_req zone=api burst=20 nodelay;
}
```

## Complete Example

```nginx
http {
  limit_req_zone $binary_remote_addr zone=general:10m rate=50r/s;

  server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    
    client_max_body_size 100m;

    location / {
      limit_req zone=general burst=100 nodelay;
      try_files $uri $uri/ /index.html;
    }

    location /api/ {
      limit_rate 2m;
      
      limit_except GET POST {
        deny all;
      }

      proxy_pass http://api_backend;
    }

    location /admin/ {
      limit_except GET {
        allow 192.168.1.0/24;
        deny all;
      }

      auth_basic "Admin Area";
      auth_basic_user_file /etc/nginx/.htpasswd;
      alias /var/www/admin/;
    }

    error_page 404 /errors/404.html;
    error_page 500 502 503 504 /errors/500.html;

    location ^~ /errors/ {
      internal;
    }
  }
}
```

## Quick Tips

- Test configs with `nginx -t` before reloading
- Use HTTPS in production
- Watch your logs
- Start simple, add complexity as needed
- Comment your configs
- Check the [official docs](https://nginx.org/en/docs/) when stuck

## Size Units

- No unit = bytes
- `k` or `K` = kilobytes
- `m` or `M` = megabytes
- `g` or `G` = gigabytes
