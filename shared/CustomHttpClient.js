const Request = require('request');

const _tryGet = (opt) => {
    return new Promise((res, rej) => {
        opt.method = 'GET';
        Request(opt, (err, response, body) => {
            if (err) {
                return rej(err);
            }
            res(body);
        });

    });
}

exports.TryGet = _tryGet;