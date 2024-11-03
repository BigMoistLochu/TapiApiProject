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


export function addHateoasLinks(req, res, next) {
    const baseUrl = `http://${req.get('host')}/api`;

    const hateoasLinks = {
        cars: [
            { rel: 'get', method: 'GET', href: `${baseUrl}/cars` },
            { rel: 'post', method: 'POST', href: `${baseUrl}/cars` },
            { rel: 'put', method: 'PUT', href: `${baseUrl}/cars/{id}` },
            { rel: 'patch', method: 'PATCH', href: `${baseUrl}/cars/{id}` }
        ],
        engines: [
            { rel: 'get', method: 'GET', href: `${baseUrl}/engines` },
            { rel: 'post', method: 'POST', href: `${baseUrl}/engines` },
            { rel: 'put', method: 'PUT', href: `${baseUrl}/engines/{id}` },
            { rel: 'patch', method: 'PATCH', href: `${baseUrl}/engines/{id}` }
        ],
        manufacturers: [
            { rel: 'get', method: 'GET', href: `${baseUrl}/manufacturers` },
            { rel: 'post', method: 'POST', href: `${baseUrl}/manufacturers` },
            { rel: 'put', method: 'PUT', href: `${baseUrl}/manufacturers/{id}` },
            { rel: 'patch', method: 'PATCH', href: `${baseUrl}/manufacturers/{id}` }
        ]
    };

    if (req.path.startsWith('/api/cars')) {
        res.locals.hateoas = hateoasLinks.cars;
    } else if (req.path.startsWith('/api/engines')) {
        res.locals.hateoas = hateoasLinks.engines;
    } else if (req.path.startsWith('/api/manufacturers')) {
        res.locals.hateoas = hateoasLinks.manufacturers;
    }

    next();
}

