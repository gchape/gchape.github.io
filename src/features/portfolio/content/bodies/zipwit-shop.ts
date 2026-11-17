export default `## Shopping in Georgian and English

Zipwit Shop brings clothing and footwear listings into a storefront with product search, filters, SKU selection, and a visitor cart. Georgian is the default language, with English available throughout the shopping experience.

Accounts support email verification, password resets, optional social sign-in, and saved addresses. Checkout supports U.S. delivery addresses, frozen USD/GEL totals, private bank-transfer receipt uploads, and pending orders.

## Catalog and order boundaries

The app uses **React and TanStack Start**, with TypeScript, PostgreSQL, Drizzle, and a Redis Cluster. Redis owns the live catalog, search summaries, prices, stock, and carts. PostgreSQL stores accounts, addresses, checkout drafts, payment evidence, orders, and notification jobs.

Catalog writes update product records and search summaries atomically on their shard. Checkout persists order and payment data transactionally, with a separate notification worker. Docker Compose and Nginx support development and production deployment.

## Current status

Browsing, accounts, addresses, carts, and bank-transfer checkout are implemented. Production hosting and warehouse shipping rates still need configuration. Payment verification and fulfillment are manual; there is no card processor, stock reservation, or order-management dashboard.

The repository includes unit tests, Redis Search checks, and Redis Cluster integration checks. See the [project README](https://github.com/zipwit/zipwit-shop#readme) and [checkout guide](https://github.com/zipwit/zipwit-shop/blob/main/docs/checkout.md) for setup and operational details.

[Back to the Zipwit organization overview](/portfolio/zipwit).`;
