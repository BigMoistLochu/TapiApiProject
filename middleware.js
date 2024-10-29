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

