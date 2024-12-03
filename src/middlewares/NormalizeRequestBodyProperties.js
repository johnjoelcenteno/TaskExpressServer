exports.NormalizeRequestBody = (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        req.body = Object.keys(req.body).reduce((acc, key) => {
            const normalizedKey = key.charAt(0).toLowerCase() + key.slice(1);
            acc[normalizedKey] = req.body[key];
            return acc;
        }, {});
    }

    next();
}

