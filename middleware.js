export function isValidContentTypeHeader(req, res, next) {

    const contentType = req.headers['content-type'];
    if (contentType !== 'application/json') {
        return res.status(415).json({ error: 'Invalid Content-Type. Only application/json is allowed.' });
    }

    next();
}

export function isValidAcceptHeader(req, res, next) {

    const accept = req.headers['accept'];
    if (accept !== 'application/json') {
        return res.status(415).json({ error: 'Invalid Content-Type. Only application/json is allowed.' });
    }

    next();
}

// export function isCacheValid(req, res, next) {
//     const cacheKey = req.headers['cache-key']; // Klucz cache z nagłówka
//     const cachedBodyHash = req.headers['cached-body-hash']; // Hash ciała z nagłówka

//     // Oblicz hash aktualnego body
//     const currentBodyHash = crypto.createHash('sha256').update(JSON.stringify(req.body)).digest('hex');

//     // Sprawdź, czy hash w nagłówku odpowiada aktualnemu hashowi
//     if (cachedBodyHash && cachedBodyHash === currentBodyHash) {
//         return res.status(304).send(); // 304 Not Modified
//     }

//     // Ustaw aktualny hash w nagłówku na przyszłość
//     res.setHeader('Current-Body-Hash', currentBodyHash);
//     next();
// }

