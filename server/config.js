// Ensure require('dotenv').config() is run before this module is required
exports.NODE_ENV = process.env.NODE_ENV || 'development'
exports.PORT = Number.parseInt(process.env.PORT, 10) || 3000
// exports.DATABASE_URL =
//     process.env.DATABASE_URL || 'postgres://localhost:5432/koa-skeleton'

// If true, then Koa will trust the X-Forwarded-Host header
// For example, use this if you're behind Cloudflare
//
// https://github.com/koajs/koa/blob/f875eb0c3077105391d16c44c1a9e3f6924791d2/docs/api/request.md#requesthost
exports.TRUST_PROXY = process.env.TRUST_PROXY === 'true'

// Set the HOSTNAME in production for basic CSRF prevention
//
// Ex: example.com, subdomain.example.com
exports.HOSTNAME = process.env.HOSTNAME
if (!exports.HOSTNAME) {
    console.warn(
        'Warn: CSRF checks are disabled since there is no HOSTNAME environment variable provided'
    )
}

// //////////////////////////////////////////////////////////

// Output config object in development to help with sanity-checking
if (exports.NODE_ENV === 'development' || exports.NODE_ENV === 'test') {
    console.log(exports)
}