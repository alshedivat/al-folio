---
layout: post
title: "Why Your API Works in Postman but Fails in the Browser"
date: 2026-03-15 10:00:00
description: "An in-depth exploration of Cross-Origin Resource Sharing (CORS), preflight requests, and common pitfalls, accompanied by a hands-on demo."
tags: web-security browsers networking
categories: security-internals
mermaid:
  enabled: true
  zoomable: true
---

If you've ever built a modern web application, you've probably stared at a CORS error in your browser console wondering why your perfectly fine API call works in Postman but dies in the browser. This article breaks down exactly what's happening under the hood - from the Same-Origin Policy's origins in 1995, through preflight mechanics, credentials, common misconfigurations, and real-world deployment patterns.

I've also put together a hands-on demo project - [**demoCORS**](https://github.com/karankessy/demoCORS) - that you can clone and run locally to see every concept in action.

---

## 1. The Same-Origin Policy (SOP)

### Why it exists

The year is 1995. Netscape Navigator 2.0 introduces JavaScript into the browser. For the first time, code running in one browser tab can manipulate the DOM, read form data, and make HTTP requests. Immediately, a problem emerges: if a user has two tabs open - their bank at `bank.com` and a malicious site at `evil.com` - the malicious site's JavaScript could read data from the bank tab.

The **Same-Origin Policy** was introduced to prevent this. It is the foundational security boundary of the web platform: **code from one origin cannot read data from a different origin.**

It's important to understand what SOP does NOT do: it does not prevent requests from being _sent_. It prevents responses from being _read_. A page on `evil.com` can trigger a GET request to `bank.com`, and that request will arrive at the bank's server (potentially with cookies). What SOP prevents is `evil.com`'s JavaScript from reading the bank's response.

### What is an "origin"?

An origin is defined by three components:

> **Origin = scheme + host + port**

Let's examine concrete examples:

| URL                        | Scheme  | Host              | Port             | Origin                     |
| -------------------------- | ------- | ----------------- | ---------------- | -------------------------- |
| `https://example.com`      | `https` | `example.com`     | `443` (implicit) | `https://example.com`      |
| `https://api.example.com`  | `https` | `api.example.com` | `443`            | `https://api.example.com`  |
| `http://example.com`       | `http`  | `example.com`     | `80`             | `http://example.com`       |
| `https://example.com:8080` | `https` | `example.com`     | `8080`           | `https://example.com:8080` |

Every single one of these is a **different origin**:

- Row 1 vs Row 2: different **host** (`example.com` vs `api.example.com` - subdomains are different hosts)
- Row 1 vs Row 3: different **scheme** (`https` vs `http`)
- Row 1 vs Row 4: different **port** (`443` vs `8080`)

This is exactly the principle at work in the [demoCORS](https://github.com/karankessy/demoCORS) project: `http://localhost:3000` and `http://localhost:4000` differ in port, making them cross-origin.

### What SOP blocks

SOP restricts JavaScript's ability to read cross-origin responses from:

- `fetch()` and `XMLHttpRequest`
- Reading `<canvas>` pixels painted from cross-origin images
- Accessing `contentDocument` of cross-origin `<iframe>`s
- Reading responses from cross-origin `EventSource` (SSE)

SOP does **NOT** block:

- `<img src="...">` - images load cross-origin (but you can't read their pixels)
- `<script src="...">` - scripts load and execute cross-origin (the origin of JSONP and supply-chain attacks)
- `<link rel="stylesheet" href="...">` - stylesheets load cross-origin
- `<form action="...">` - forms can submit cross-origin (the origin of CSRF attacks)
- `<iframe src="...">` - iframes load cross-origin (but parent can't read content)

---

## 2. Why CORS Exists

SOP was designed for a 1990s web where pages were self-contained documents. The modern web is fundamentally different:

- **Single-Page Applications (SPAs)** serve a static frontend from `app.example.com` and call APIs at `api.example.com`
- **Microservices** expose multiple APIs on different domains or ports
- **Third-party integrations** require calling payment processors, analytics services, CDNs
- **Development environments** run frontends and backends on different ports (exactly like [demoCORS](https://github.com/karankessy/demoCORS): port 3000 and port 4000)

Without any mechanism to relax SOP, none of these architectures would work. You'd be forced to same-origin-proxy every API call through your frontend server.

**CORS (Cross-Origin Resource Sharing)** is that mechanism. It is a **protocol** - a set of HTTP headers - that allows a server to declare: "I trust requests from these specific origins."

The key insight is: **CORS is not a way to add security. It's a controlled way to remove a security restriction.** SOP is the default. CORS is the opt-out.

---

## 3. CORS Request Types

The CORS specification divides cross-origin requests into two categories based on their potential to cause side effects.

### Simple Requests

A request is "simple" (formally a request that doesn't trigger a preflight) when ALL of these conditions are met:

**Method** is one of:

- `GET`
- `HEAD`
- `POST`

**Headers** are limited to the CORS-safelisted set:

- `Accept`
- `Accept-Language`
- `Content-Language`
- `Content-Type` (with restrictions, see below)
- `Range` (with restrictions)

**Content-Type** (if present) is one of:

- `application/x-www-form-urlencoded`
- `multipart/form-data`
- `text/plain`

**No** `ReadableStream` body is used.
**No** event listeners are registered on the `XMLHttpRequest.upload` object.

**Why these conditions?** Because a simple request is no more dangerous than what an HTML `<form>` can already do. Forms can POST with `application/x-www-form-urlencoded` or `multipart/form-data` to any URL. SOP never blocked form submissions. So a "simple" CORS request adds no new attack surface - the browser just needs to check whether the server wants the _response_ shared.

In the [demoCORS](https://github.com/karankessy/demoCORS) project, the `fetch()` calls are simple GET requests with no custom headers:

```js
await fetch("http://localhost:4000/api/data");
```

This meets all simple request criteria, so **no preflight occurs**.

### Preflighted Requests

Any request that doesn't meet the "simple" criteria triggers a **preflight**. Common triggers include:

- Methods: `PUT`, `DELETE`, `PATCH`
- Headers: `Authorization`, `X-Custom-Header`, any custom header
- Content-Type: `application/json`

Before sending the actual request, the browser sends an `OPTIONS` request asking the server: "Will you accept this kind of request?"

The reason for preflight is safety: methods like `DELETE` or headers like `Authorization` can cause **side effects** on the server. The browser needs to verify the server actually expects these cross-origin requests _before_ sending them, because unlike simple requests, these operations couldn't be triggered by a plain HTML `<form>`.

### Full HTTP Flow - Preflighted Request

**Scenario:** A frontend at `https://app.example.com` sends a JSON POST to `https://api.example.com`.

#### Step 1: Preflight Request (Browser → Server)

```
OPTIONS /api/users HTTP/1.1
Host: api.example.com
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type, authorization
```

#### Step 2: Preflight Response (Server → Browser)

```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: content-type, authorization
Access-Control-Max-Age: 86400
```

#### Step 3: Actual Request (Browser → Server)

```
POST /api/users HTTP/1.1
Host: api.example.com
Origin: https://app.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...

{"name": "Karan", "role": "Developer"}
```

#### Step 4: Actual Response (Server → Browser)

```
HTTP/1.1 201 Created
Access-Control-Allow-Origin: https://app.example.com
Content-Type: application/json

{"id": 42, "name": "Karan", "role": "Developer"}
```

If the preflight response at Step 2 were missing `authorization` in `Access-Control-Allow-Headers`, the browser would **never send Step 3**. The actual request is completely blocked before it leaves the browser.

---

## 4. CORS Request Flow - Step by Step

Here's the complete decision tree the browser follows for every `fetch()` call:

```
JavaScript calls fetch(url, options)
         │
         ▼
┌─────────────────────────┐
│ Is the target origin the │
│ same as the page origin? │
└───────┬─────────┬────────┘
        │ Yes     │ No
        ▼         ▼
  [Normal HTTP  ┌──────────────────────┐
   request,     │ Is this a "simple"   │
   no CORS]     │ request?             │
                └──────┬────────┬──────┘
                       │ Yes    │ No
                       ▼        ▼
               [Send request  [Send OPTIONS
                directly with  preflight first]
                Origin header]       │
                       │             ▼
                       │      ┌───────────────────┐
                       │      │ Does preflight     │
                       │      │ response approve?  │
                       │      └──┬──────────┬──────┘
                       │         │ Yes      │ No
                       │         ▼          ▼
                       │    [Send actual  [Block. TypeError
                       │     request]      in JavaScript]
                       │         │
                       ▼         ▼
               ┌───────────────────────┐
               │ Does response contain │
               │ valid CORS headers?   │
               └──────┬─────────┬──────┘
                      │ Yes     │ No
                      ▼         ▼
              [Expose response  [Block response.
               to JavaScript]   TypeError in
                                JavaScript]
```

### The critical misconception

> **CORS does not prevent the request from reaching the server. It only controls whether the browser exposes the response to JavaScript.**

For simple requests, the server always receives and processes the request. The `Origin` header is present, but the server responds normally. Only then does the browser decide whether to hand the response to JavaScript.

This means **CORS is not a substitute for server-side authorization**. If your server processes a `DELETE /api/users/42` and only then sends back a response missing CORS headers, the record is already deleted - the browser just won't show the confirmation to the attacker's JavaScript.

For preflighted requests, the protection is stronger: the browser's OPTIONS preflight happens first, and if it fails, the actual `DELETE` is never sent. But you should **never** rely on preflight as your security boundary.

---

## 5. Preflight Mechanism - Deep Dive

### The OPTIONS request

When a browser determines that a request requires preflight, it constructs an `OPTIONS` request automatically. JavaScript code has **no control** over this - no ability to modify, suppress, or intercept the preflight.

**Example preflight request:**

```http
OPTIONS /api/data HTTP/1.1
Host: api.example.com
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: authorization, content-type
```

Key headers:

- `Origin`: The requesting page's origin (always present)
- `Access-Control-Request-Method`: The HTTP method the _actual_ request will use
- `Access-Control-Request-Headers`: The non-safelisted headers the _actual_ request will include

### Expected server response

The server must respond to the OPTIONS request with:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: authorization, content-type
Access-Control-Max-Age: 86400
```

### What happens when headers are missing

| Missing header                                                    | Result                                                            |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `Access-Control-Allow-Origin`                                     | Preflight fails. Actual request never sent.                       |
| `Access-Control-Allow-Methods` (doesn't include requested method) | Preflight fails.                                                  |
| `Access-Control-Allow-Headers` (doesn't include requested header) | Preflight fails.                                                  |
| `Access-Control-Max-Age`                                          | Preflight succeeds but browser repeats OPTIONS for every request. |

### Preflight caching

`Access-Control-Max-Age` tells the browser how many seconds to cache the preflight result. During that window, subsequent requests to the same URL with compatible methods and headers skip the OPTIONS check entirely.

**Without caching, every single API call generates two HTTP requests** - a significant performance tax. In the [demoCORS](https://github.com/karankessy/demoCORS) project, `Max-Age` is not configured, meaning every preflight is re-sent. In production, values of `86400` (24 hours) or `3600` (1 hour) are typical.

Note: Browsers impose their own maximum. Chrome caps at 7200 seconds (2 hours), regardless of what the server sends.

---

## 6. CORS Headers Explained - In Depth

### `Access-Control-Allow-Origin`

**Purpose:** The single most important CORS header. Declares which origin(s) may read the response.

**Valid values:**

- `*` - Any origin (but cannot be used with credentials)
- `https://specific-origin.com` - Exactly one origin
- (There is **no** native support for multiple origins in a single header value)

**The multiple-origin problem:** You cannot write:

```
Access-Control-Allow-Origin: https://a.com, https://b.com   ❌ INVALID
```

The spec only allows a single origin or `*`. To support multiple origins, the server must:

1. Read the `Origin` request header
2. Check it against an allowlist
3. If approved, reflect that specific origin in the response
4. Set `Vary: Origin` to prevent cache poisoning

This is exactly what the `cors` npm middleware does when given an array or function for the `origin` option.

**Edge case:** If the server sets `Access-Control-Allow-Origin: null`, the browser will match it against the `null` origin (used by sandboxed iframes, `file://` URLs, and redirected requests). This is dangerous because an attacker can craft a sandboxed iframe with `Origin: null` and exploit this match.

### `Access-Control-Allow-Methods`

**Purpose:** Sent only in preflight responses. Lists the HTTP methods the server accepts.

**Note:** For simple requests (GET, HEAD, POST), this header is not checked - the browser already knows those methods are inherently acceptable at the CORS level.

**Example:**

```
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH
```

### `Access-Control-Allow-Headers`

**Purpose:** Sent only in preflight responses. Lists the request headers the server accepts beyond the CORS-safelisted set.

**Example:**

```
Access-Control-Allow-Headers: Authorization, Content-Type, X-Request-ID
```

**Important:** As of the 2023 Fetch specification, `*` is a valid value for this header (and `Access-Control-Allow-Methods`), meaning "all headers/methods are allowed." However, this wildcard **does not apply** when `credentials: true` - in that case, every header must be explicitly listed.

### `Access-Control-Allow-Credentials`

**Purpose:** Tells the browser to include cookies, `Authorization` headers, and TLS client certificates in cross-origin requests.

**The cardinal rule:**

> When `Access-Control-Allow-Credentials: true` is set, `Access-Control-Allow-Origin` **MUST NOT** be `*`.

Browsers enforce this strictly. If a server sends both `Access-Control-Allow-Origin: *` and `Access-Control-Allow-Credentials: true`, the browser rejects the response. This prevents a server from accidentally exposing authenticated data to every site on the internet.

**Client side:** The `fetch()` call must also opt in:

```js
fetch(url, { credentials: "include" });
```

Without `credentials: 'include'`, the browser won't send cookies even if the server allows them.

### `Access-Control-Max-Age`

**Purpose:** Duration (in seconds) the browser may cache the preflight response.

**Example:**

```
Access-Control-Max-Age: 86400
```

**Browser limits:**

- Chrome: max 7200 (2 hours)
- Firefox: max 86400 (24 hours)
- Safari: max 604800 (7 days)

### `Access-Control-Expose-Headers`

**Purpose:** By default, JavaScript can only access these response headers: `Cache-Control`, `Content-Language`, `Content-Length`, `Content-Type`, `Expires`, `Pragma`. All other headers are hidden.

To expose custom response headers (e.g., `X-Request-ID`, `X-RateLimit-Remaining`), the server must include:

```
Access-Control-Expose-Headers: X-Request-ID, X-RateLimit-Remaining
```

---

## 7. Credentials and Cookies

### The problem

By default, `fetch()` does not send cookies or auth headers cross-origin. To include them:

**Client:**

```js
fetch("https://api.example.com/me", {
  credentials: "include", // Send cookies cross-origin
});
```

**Server must respond with:**

```
Access-Control-Allow-Origin: https://app.example.com  (NOT *)
Access-Control-Allow-Credentials: true
```

### Why `*` cannot work with credentials

If `Access-Control-Allow-Origin: *` were allowed with credentials, any website could:

1. Make a credentialed request to your API
2. The browser would send the user's cookies
3. The `*` would allow any origin to read the response
4. The attacker reads authenticated data

This is why browsers enforce the rule: **wildcard + credentials = rejected**.

### How `SameSite` cookies interact

Modern browsers also enforce `SameSite` cookie attributes:

- `SameSite=Strict`: Cookie is **never** sent cross-site
- `SameSite=Lax`: Cookie sent only for top-level navigations (GET), not for `fetch()`
- `SameSite=None; Secure`: Cookie is sent cross-site (required for CORS with credentials)

Even if CORS is correctly configured, a cookie with `SameSite=Lax` won't be included in a cross-origin `fetch()`. The cookie must be `SameSite=None; Secure`.

---

## 8. Common CORS Misconfigurations

### 1. Origin Reflection Without Validation

```js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
```

This reflects whatever origin the request sends. Combined with credentials, an attacker at `evil.com` can:

- Make a credentialed request to your API
- Your server reflects `evil.com` as the allowed origin
- The browser sends cookies and allows `evil.com` to read the response
- **Result: full data exfiltration**

**Severity: Critical**

### 2. Null Origin Allowance

```js
cors({ origin: "null" }); // or checking req.headers.origin === 'null'
```

The `null` origin can be crafted via:

- Sandboxed iframes: `<iframe sandbox="allow-scripts" src="data:text/html,...">`
- `file://` URLs
- Cross-origin redirects

An attacker embeds their exploit in a sandboxed iframe, which sends `Origin: null`, and the server approves it.

### 3. Regex Mistakes

```js
cors({ origin: /example\.com/ });
```

This matches `malicious-example.com`, `example.com.evil.com`, etc. The regex is not anchored.

**Correct:**

```js
cors({ origin: /^https:\/\/([a-z]+\.)?example\.com$/ });
```

### 4. Pre-domain Matching

```js
const allowed = ['https://app.example.com'];
const origin = req.headers.origin;
if (allowed.some(a => origin.includes(a))) { ... }
```

An attacker registers `https://app.example.com.evil.com` - the `includes()` check passes.

**Correct approach:** Use exact string matching or properly anchored regexes.

### 5. Wildcard Subdomain Trust

```js
cors({ origin: /^https:\/\/.*\.example\.com$/ });
```

This trusts every subdomain. If any subdomain has an XSS vulnerability (say, `user-content.example.com`), the attacker can leverage that XSS to make credentialed requests from a trusted origin.

---

## 9. CORS vs Other Browser Protections

### CORS vs CSRF

|                      | CORS                              | CSRF                            |
| -------------------- | --------------------------------- | ------------------------------- |
| **What it protects** | Reading responses                 | Performing unauthorized actions |
| **Mechanism**        | Response headers                  | Tokens, `SameSite` cookies      |
| **Who enforces**     | Browser (blocks response reading) | Server (validates tokens)       |
| **Attack vector**    | Cross-origin data theft           | Cross-origin action execution   |

CORS does not prevent CSRF. A form submission or a simple POST from an attacker's site will reach your server regardless of CORS settings. You need CSRF tokens or `SameSite` cookies separately.

### CORS vs CORB (Cross-Origin Read Blocking)

CORB is a **browser-side** defense (introduced in Chrome 68) that blocks certain cross-origin responses from even entering the renderer process - before CORS checks. It protects against Spectre-style side-channel attacks.

If a `<script>` tag requests an HTML or JSON resource cross-origin, CORB strips the body entirely, preventing even a Spectre attack from reading it from memory.

CORB is transparent and automatic. It does not replace CORS - it adds defense-in-depth.

### CORS vs CSP (Content Security Policy)

|                   | CORS                                     | CSP                                                    |
| ----------------- | ---------------------------------------- | ------------------------------------------------------ |
| **Direction**     | Controls who can **read from** me        | Controls what my page can **load**                     |
| **Configured by** | The server being called                  | The server serving the page                            |
| **Mechanism**     | `Access-Control-*` response headers      | `Content-Security-Policy` header                       |
| **Example**       | "Only `app.example.com` can read my API" | "My page can only load scripts from `cdn.example.com`" |

They protect from opposite directions. CSP says "I restrict what my page can do." CORS says "I restrict who can read my responses."

### Interaction

In a well-configured system:

- **CSP** prevents XSS by restricting script sources
- **CORS** prevents data theft by restricting response access
- **SameSite cookies** prevent CSRF by restricting cookie sending
- **CORB** prevents side-channel data leaks

These are layers of a defense-in-depth strategy, not alternatives to each other.

---

## 10. Practical Debugging

### Browser DevTools - The CORS Debugging Workflow

**Step 1: Open Network Tab**
Open DevTools (F12) → Network tab → reproduce the request.

**Step 2: Look for the OPTIONS request**
If preflight is involved, you'll see two requests:

1. `OPTIONS /api/data` - the preflight
2. `GET /api/data` (or POST, etc.) - the actual request

If only the OPTIONS appears and the actual request is missing, the preflight failed.

**Step 3: Inspect the preflight response headers**
Click the OPTIONS request and check Response Headers:

```
Access-Control-Allow-Origin: https://app.example.com   ← present?
Access-Control-Allow-Methods: GET, POST                 ← includes your method?
Access-Control-Allow-Headers: Authorization              ← includes your headers?
```

**Step 4: Check the Console**
Chrome provides detailed CORS error messages:

```
Access to fetch at 'http://localhost:4000/api/data' from origin
'http://localhost:3000' has been blocked by CORS policy: No
'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Step 5: Common mistakes to check**

- Is the `Origin` being sent? (Check request headers)
- Is the server responding with the correct `Access-Control-Allow-Origin`?
- Is there a redirect? (Redirects during CORS can fail)
- Are credentials being sent? (Check if `Access-Control-Allow-Credentials: true` is present)
- Is the status code 200/204 for the preflight? (Some servers return 403 for OPTIONS)

**Step 6: `curl` to isolate client vs server**
Test from the command line to determine if it's a server configuration issue:

```bash
curl -v -X OPTIONS \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" \
  http://localhost:4000/api/data
```

If the response includes correct CORS headers, the server is fine - the issue is in the browser-side code. If not, the server needs fixing.

---

## 11. Real-World Deployment Patterns

### Node.js / Express

The [demoCORS](https://github.com/karankessy/demoCORS) project uses the `cors` npm package, which is the standard for Express:

```js
const cors = require("cors");

// Production configuration
app.use(
  cors({
    origin: ["https://app.example.com", "https://staging.example.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  })
);
```

**Common mistake:** Using `cors()` with no options (allows `*`), then wondering why credentials don't work.

### Nginx

CORS is frequently handled at the reverse proxy level:

```nginx
server {
    location /api/ {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' $http_origin;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE';
            add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Max-Age' 86400;
            return 204;
        }

        add_header 'Access-Control-Allow-Origin' $http_origin always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;

        proxy_pass http://backend;
    }
}
```

**Common mistakes:**

- Forgetting the `always` directive (headers are not sent on error responses like 500)
- Using `$http_origin` without validation (origin reflection vulnerability)
- Not handling OPTIONS separately (the proxy forwards it to the backend, which may return 404)

### Cloud APIs (AWS API Gateway)

AWS API Gateway has built-in CORS support:

- Configured per endpoint via console or CloudFormation/SAM
- Automatically generates OPTIONS responses
- Easy to misconfigure by enabling "allow all origins" during development and forgetting to restrict in production

**Common mistake:** Setting `Access-Control-Allow-Origin: *` on API Gateway and adding `Authorization` headers. This works without credentials but breaks when `credentials: 'include'` is added.

### API Gateways (Kong, Envoy, Traefik)

Most API gateways provide CORS as a plugin or middleware:

```yaml
# Kong CORS plugin
plugins:
  - name: cors
    config:
      origins:
        - https://app.example.com
      methods:
        - GET
        - POST
      headers:
        - Authorization
        - Content-Type
      credentials: true
      max_age: 86400
```

**Advantage:** CORS is handled at the edge, and individual microservices don't need to implement it.

**Risk:** If the gateway handles CORS but a microservice also adds CORS headers, you get **duplicate headers** - and browsers may reject responses with multiple `Access-Control-Allow-Origin` values.

### Summary of Common Deployment Mistakes

| Mistake                                         | Consequence                                              |
| ----------------------------------------------- | -------------------------------------------------------- |
| `Access-Control-Allow-Origin: *` with auth APIs | Credentials cannot be used                               |
| Reflecting origin without validation            | Data theft via any malicious site                        |
| CORS on application but not on error responses  | CORS errors mask 500 errors, making debugging impossible |
| Duplicate CORS headers (gateway + app)          | Browser sees two `Allow-Origin` values and rejects       |
| Not handling OPTIONS at the proxy               | Preflight returns 404, all non-simple requests fail      |
| Allowing `null` origin                          | Exploitable via sandboxed iframes                        |
| Missing `Vary: Origin`                          | CDN/cache serves wrong origin header to wrong client     |

---

## Conclusion: A Mental Model for CORS

CORS is often perceived as an obstacle - an annoying error that appears in the console during development. But understanding it deeply reveals that it is an elegantly simple protocol:

1. **The browser is the enforcer.** Not the server, not JavaScript - the browser's security engine.
2. **The server is the policy declarer.** It communicates trust via response headers.
3. **JavaScript is the subject.** It can initiate requests but has no power to override CORS.
4. **CORS protects the response, not the request.** The server always receives the request (except when preflight fails).
5. **Preflight is an optimization for safety.** It prevents dangerous requests from being sent, not just their responses from being read.

When you encounter a CORS error, the debugging approach is mechanical:

1. What is my origin?
2. What origin does the server allow?
3. Do they match?
4. Am I triggering preflight? Does the server handle OPTIONS?
5. Am I sending credentials? Is the server configured for credentials?

If you can answer these five questions, you can debug any CORS issue.

---

## Try It Yourself

Clone the [**demoCORS**](https://github.com/karankessy/demoCORS) project to see these concepts in action:

```bash
git clone https://github.com/karankessy/demoCORS.git
cd demoCORS
npm install
npm start
```

Open `http://localhost:3000` and watch the **Network** tab in DevTools to see CORS headers and preflight requests in real time.

---

## Further Reading

- [MDN - Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Fetch Standard - CORS Protocol](https://fetch.spec.whatwg.org/#http-cors-protocol)
- [web.dev - Cross-Origin Resource Sharing](https://web.dev/articles/cross-origin-resource-sharing)
- [PortSwigger - CORS Misconfigurations](https://portswigger.net/web-security/cors)
- [OWASP - CORS Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/CORS_Cheat_Sheet.html)
