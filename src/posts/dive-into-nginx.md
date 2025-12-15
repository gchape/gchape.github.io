# A Guide to Nginx

So you want to learn about Nginx? Cool. Let's dive in without all the corporate jargon.

## What Even Is Nginx?

Nginx (say it like "engine-ex") is basically the Swiss Army knife of web servers. It's fast, doesn't eat all your RAM, and can handle a stupid amount of concurrent connections. People use it for serving websites, routing traffic, load balancing—you name it.

---

## Root vs Alias: The Path Thing That Confuses Everyone

This trip me up when I started with Nginx :)

### The `root` Directive (Adds to the Path)

When you use `root`, Nginx takes your root path and *adds* the request URI to it. Here's what I mean:

```nginx
server {
  listen 80;
  root /var/www/website.com/html;

  location /admin/ {
    root /var/www/locked;
  }
}
```

If someone visits `http://localhost/admin/secret.html`, Nginx looks for the file at `/var/www/locked/admin/secret.html`. See how it kept the `/admin/` part? That's the key thing—root *appends* the whole URI.

I thought root replaces the path. It doesn't. That's what alias is for.

### The `alias` Directive (Swaps the Path)

Alias actually replaces the matched location with your target directory:

```nginx
location /admin/ {
  alias /var/www/locked/;
}
```

Now `http://localhost/admin/secret.html` serves from `/var/www/locked/secret.html`. The `/admin/` part got swapped out.

**Pro tip:** Always add that trailing slash with alias. Seriously, this will bite you if you forget:

```nginx
# This will break in weird ways
location /admin/ {
  alias /var/www/locked;
}

# Do this instead
location /admin/ {
  alias /var/www/locked/;
}
```

### When to Use Which?

- Use `root` when your URL structure matches your file structure
- Use `alias` when you want a URL to point somewhere completely different

Here's a real example—say you have user uploads on a separate drive:

```nginx
location /uploads/ {
  alias /mnt/storage/user-files/;
  autoindex on;
}
```

---

## Index Files (The Homepage Stuff)

When someone hits a directory URL like `/admin/`, Nginx needs to know what file to show them. That's what the `index` directive does:

```nginx
server {
  root /var/www/html;
  index index.html index.htm;
}
```

You can list multiple files, and Nginx tries them in order. First one that exists wins.

With alias, it works the same way:

```nginx
location /admin/ {
  alias /var/www/locked/;
  index index.html dashboard.html;
}
```

Request for `/admin/` checks for `/var/www/locked/index.html`, then `/var/www/locked/dashboard.html`.

---

## Custom Error Pages (Making 404s Less Ugly)

Nobody likes the default error pages. Let's fix that.

Basic setup:

```nginx
server {
  root /var/www/html;

  error_page 404 /errors/not_found.html;
  error_page 500 502 503 504 /errors/server_error.html;

  location ^~ /errors/ {
    internal;
  }
}
```

That `internal` directive is important—it means people can't just navigate to `/errors/not_found.html` directly. Only Nginx can serve it as an error page.

### Named Locations for Error Handling

Sometimes you want to do more than just show a static page:

```nginx
error_page 404 @notfound;

location @notfound {
  access_log /var/log/nginx/404.log;
  root /var/www/errors;
  rewrite ^ /404.html break;
}
```

### The SPA Trick

If you're building a single-page app (React, Vue, whatever), you probably want all routes to hit your index.html so the client-side router can take over:

```nginx
error_page 404 =200 /index.html;
```

That `=200` changes the status code from 404 to 200. Your app thinks everything's fine, handles the routing itself, and everyone's happy.

---

## Try Files: The Swiss Army Knife of Routing

`try_files` is super powerful once you get the hang of it. It lets you say "try this file, then this one, then this one, and if nothing works, do this fallback."

Basic example:

```nginx
location / {
  try_files $uri $uri.html $uri/ /index.html;
}
```

When someone requests `/about`:
1. Try `/about` (exact file)
2. Try `/about.html` 
3. Try `/about/` (directory)
4. Give up and serve `/index.html`

### Proxying as a Fallback

This is great for hybrid setups where you serve static files but proxy everything else:

```nginx
location / {
  try_files $uri @backend;
}

location @backend {
  proxy_pass http://127.0.0.1:8080;
  proxy_set_header Host $host;
}
```

### ⚠️ Security Warning

Don't do this:

```nginx
location / {
  try_files $uri $uri.php =404;
}
```

Why? If your PHP handler breaks, Nginx might serve the raw PHP source code. That means anyone can see your database passwords, API keys, and all your secrets. Not good.

Do this instead:

```nginx
location / {
  try_files $uri $uri/ =404;
}

location ~ \.php$ {
  fastcgi_pass unix:/var/run/php-fpm.sock;
  include fastcgi_params;
}
```

---

## Request Body Stuff (For Uploads and POST Requests)

### Buffer Size

This controls how much of a request body Nginx keeps in RAM:

```nginx
client_body_buffer_size 16k;
```

Anything bigger than this gets written to a temp file. For APIs with small JSON payloads, keep it small. For file uploads, bump it up:

```nginx
location /upload/ {
  client_body_buffer_size 128k;
}
```

### Forcing Files

Sometimes you want everything written to disk, not memory:

```nginx
client_body_in_file_only on;
```

Options:
- `on` - Always use files
- `off` - Use memory then files if needed (default)
- `clean` - Use files but delete them right after

Great for large file uploads:

```nginx
location /large-uploads/ {
  client_body_in_file_only on;
  client_max_body_size 5G;
}
```

### Temp File Location

You can specify where these temp files go:

```nginx
client_body_temp_path /mnt/ssd/nginx-temp 1 2;
```

Those numbers (1 2) create nested subdirectories. Why? Because having 10,000 files in one directory slows things down. The nested structure spreads them out:

- No levels = 1 directory
- `1` = 16 directories  
- `1 2` = 4,096 directories
- `1 2 3` = 16.7 million directories (probably overkill)

---

## HTTP Method Restrictions (Lock Down Your APIs)

The `limit_except` directive is a bit backwards at first, but it's super useful.

Here's the deal: you list the methods that are *allowed*, then inside the block you specify restrictions for everything else.

```nginx
location /admin/ {
  limit_except GET {
    allow 192.168.1.0/24;
    deny all;
  }
}
```

Translation: Everyone can GET. Only local network IPs can POST/PUT/DELETE/etc.

### Making APIs Read-Only

```nginx
location /api/ {
  limit_except GET HEAD OPTIONS {
    deny all;
  }
}
```

Now your API is read-only for everyone. All write operations get a 403.

### Combining with Authentication

```nginx
location /content/ {
  limit_except GET HEAD {
    auth_basic "Login Required";
    auth_basic_user_file /etc/nginx/.htpasswd;
  }
}
```

Anyone can view, but you need to log in to modify stuff.

### Webhook Endpoints

This is handy for webhooks where only certain IPs should be allowed:

```nginx
location /webhooks/github {
  limit_except POST {
    deny all;
  }

  allow 192.30.252.0/22;
  allow 185.199.108.0/22;
  deny all;
}
```

---

## Rate Limiting (Stop People from Killing Your Server)

### Basic Bandwidth Limits

```nginx
location /downloads/ {
  limit_rate 500k;
}
```

Each connection gets 500 KB/s max. Important: that's *per connection*. If someone opens 3 connections, they get 1.5 MB/s total. Keep that in mind.

### Delayed Limiting

Let people download the first chunk fast, then throttle them:

```nginx
location /videos/ {
  limit_rate_after 10m;
  limit_rate 500k;
}
```

First 10 MB is full speed, then it drops to 500 KB/s. Perfect for video streaming—quick initial buffer, then steady playback.

### Real-World Examples

**Free vs premium tiers:**

```nginx
location /free/ {
  limit_rate 128k;
}

location /premium/ {
  limit_rate 2m;
}
```

**Throttle bots:**

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

**Different rates for different endpoints:**

```nginx
location /api/bulk/ {
  limit_rate 512k;
}

location /api/realtime/ {
  limit_rate 5m;
}
```

### Request Rate Limiting

For limiting requests per second (not bandwidth), use `limit_req`:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
  limit_req zone=api burst=20 nodelay;
}
```

This allows 10 requests per second, with a burst of 20 before it starts blocking.

---

## Putting It All Together

Here's a complete config that combines everything:

```nginx
http {
  # Rate limiting zones
  limit_req_zone $binary_remote_addr zone=general:10m rate=50r/s;
  limit_req_zone $binary_remote_addr zone=strict:10m rate=5r/s;
  limit_conn_zone $binary_remote_addr zone=addr:10m;

  server {
    listen 80;
    server_name example.com;
    root /var/www/html;

    # Connection limits
    limit_conn addr 10;
    client_max_body_size 100m;

    # Main site
    location / {
      limit_req zone=general burst=100 nodelay;
      limit_rate_after 1m;
      limit_rate 1m;
      try_files $uri $uri/ /index.html;
    }

    # Download area
    location /downloads/ {
      limit_req zone=general burst=10;
      limit_rate_after 5m;
      limit_rate 500k;
    }

    # API with strict limits
    location /api/ {
      limit_req zone=strict burst=10 nodelay;
      limit_rate 2m;

      limit_except GET POST {
        deny all;
      }

      proxy_pass http://api_backend;
    }

    # Admin panel (locked down)
    location /admin/ {
      limit_except GET {
        allow 192.168.1.0/24;
        deny all;
      }

      auth_basic "Admin Area";
      auth_basic_user_file /etc/nginx/.htpasswd;
      alias /var/www/admin/;
    }

    # File uploads
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

    # Custom error pages
    error_page 404 /errors/404.html;
    error_page 500 502 503 504 /errors/500.html;

    location ^~ /errors/ {
      internal;
    }
  }
}
```

---

## Quick Tips

- Always test your config with `nginx -t` before reloading
- Use HTTPS in production (Let's Encrypt is free!)
- Keep an eye on your logs—they'll tell you what's breaking
- Start simple and add complexity as you need it
- Comment your config—future you will thank present you
- When in doubt, check the [official docs](https://nginx.org/en/docs/)

---

## Size Units Reference

Just in case you forget:

- No unit = bytes
- `k` or `K` = kilobytes
- `m` or `M` = megabytes  
- `g` or `G` = gigabytes

So `500k` = 500 KB, `2m` = 2 MB, you get the idea.

---

That's pretty much the essentials. Nginx has a ton more features, but master these and you'll be in good shape. Now go configure something!
