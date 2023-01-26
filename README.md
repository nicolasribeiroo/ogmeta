# Nery ogmeta

This is a small microservice we use at Nery to generate Open Graph images for our pages.

---

## Endpoints:

- GET `/api/og` - Returns an Open Graph image for the given URL.

  - Requires `title` and `description` query parameters.
  - Optionally add `&dark=true` for dark mode
