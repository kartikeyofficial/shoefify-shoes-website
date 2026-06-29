
# Shoefify.shop — Implementation Plan

Premium shoe e-commerce site inspired by wearcomet.com. Warm minimal aesthetic, serif display + clean sans, generous whitespace.

## 1. Branding & Contact

- Site name: **Shoefify** (domain `shoefify.shop`)
- Support / help email: **shoefify.shop@gmail.com** — shown on `/contact` and `/help`, used as the "from" alias in app copy.
- All page titles, meta, footer, logo say "Shoefify".

## 2. Authentication — Email + OTP only

- Signup form fields: **Name** + **Email** (no password).
- Login: enter email → 6-digit OTP sent → enter OTP → in.
- Powered by Supabase email OTP (passwordless). More secure than a hardcoded password.
- Profile: name, email, avatar (upload to `avatars` bucket), phone (optional).

**Admin account:** the email `rajputkartikey10@gmail.com` is the ONLY admin. A DB trigger on signup auto-assigns the `admin` role if the email matches; everyone else becomes `customer`. You sign in with the same OTP flow — no separate password screen, no hardcoded credentials in code.

## 3. Database 

- `profiles` (id, full_name, email, avatar_url, phone)
- `user_roles` (user_id, role: `admin` | `customer`) + `has_role()` security-definer fn
- `categories` (slug, name, image_url) — seeded: Men, Women, Sneakers, Formal, Sports, Kids
- `products` (name, slug, description, price, compare_at_price, category_id, brand, images[], is_featured, is_active)
- `product_variants` (product_id, size, stock)
- `cart_items` (user_id, product_id, variant_id, qty)
- `orders` (user_id, total, payment_method `razorpay`|`cod`, payment_status, order_status `pending`→`packed`→`shipped`→`out_for_delivery`→`delivered`|`cancelled`, shipping_address jsonb, razorpay_order_id, razorpay_payment_id, tracking_note)
- `order_items` (order_id, product_id, variant_id, qty, price_at_purchase)
- `support_messages` (user_id nullable, name, email, type `suggestion`|`report`|`question`, subject, message, status `new`|`in_review`|`resolved`, created_at) — for the help/feedback feature

RLS: users see only their data; admin (via `has_role`) gets full CRUD. Public read on products/categories.

Storage buckets: `product-images` (public), `avatars` (public).

## 4. Storefront routes

- `/` — hero carousel (3-4 generated lifestyle shoe shots), category tiles, featured grid, brand story strip, newsletter
- `/shop` and `/shop/$category` — grid + filters (size, price, brand) + sort
- `/product/$slug` — gallery, size picker, add-to-cart, related
- `/cart`, `/checkout`
- `/account` (profile + avatar), `/account/orders`, `/account/orders/$id` (status timeline)
- `/help` — FAQ + **feedback form** (suggestions, bug reports, questions) → writes to `support_messages`; also shows support email `shoefify.shop@gmail.com`
- `/about`, `/contact`
- `/login`, `/signup`

Each route has its own SEO `<head>`.

## 5. Admin routes (gated by `has_role('admin')`)

- `/admin` — dashboard (orders today, revenue, low stock)
- `/admin/products` — CRUD + image upload + variant sizes
- `/admin/categories` — CRUD
- `/admin/orders` — list, filter, update status through full pipeline, mark payment received, add tracking note
- `/admin/messages` — view + respond to `support_messages` (mark new/in_review/resolved)
- `/admin/users` — list users

## 6. Payments — Razorpay + COD

**Heads-up:** the link you shared (`razorpay.me/@kumarkartikey`) is a Razorpay payment-page link, NOT API credentials. I'll build for two modes — you pick at the checkout step:

### Mode A — Integrated checkout (recommended)
1. You generate real keys at Razorpay Dashboard → Settings → API Keys (`rzp_test_xxx` + secret).
2. Server fn creates Razorpay order; frontend opens Razorpay Checkout modal (UPI, cards, netbanking, wallets all on by default).
3. Server fn verifies HMAC-SHA256 signature → marks order paid.
4. Public webhook `/api/public/razorpay-webhook` as async fallback.
5. Secrets needed: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`.

### Mode B — Payment-link fallback
- "Pay now" button opens your `razorpay.me/@kumarkartikey` link in a new tab.
- Order is created with `payment_status='awaiting_manual_verification'`.
- You confirm each payment in `/admin/orders` after seeing the Razorpay email.

### COD
Order created directly; `payment_status='cod_pending'`; admin marks paid on delivery.

## 7. Design (Comet-inspired)

- Palette tokens (oklch in `styles.css`):
  - bg `#F5F1EA` warm off-white
  - foreground `#1A1A1A` charcoal
  - accent `#8B6F47` clay
  - secondary `#2D3B2D` deep olive
- Display: Cormorant / Instrument Serif. Body: Inter / Work Sans.
- Sticky minimal nav (logo, links, cart + avatar). Full-bleed hero carousel. Square product cards. Quiet footer.

## 8. Tech

TanStack Start file routes · TanStack Query + `createServerFn` + `requireSupabaseAuth` · Zod validation · cart in DB (localStorage merge for guests) · sonner toasts.

## 9. What you need to do

1. Approve Lovable Cloud (I'll prompt).
2. After build, sign up with `rajputkartikey10@gmail.com` to receive admin role automatically.
3. At checkout step: tell me Mode A (and paste real Razorpay API keys when I prompt) or Mode B (use your payment link).

## 10. Out of scope (v1)

Coupons, reviews, wishlist, multi-currency, marketing emails.

---

Reply **"go"** to start the build.
