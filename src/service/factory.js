const extendPromise = (promise) => {
    promise.success = function (fn) {
        promise.then((response) => {
            fn(response);
        });
        return promise;
    };
    promise.fail = function (fn) {
        promise.then(null, (error) => {
            fn(error);
        });
        return promise;
    }
};

const requestApi = (url, param, type) => {
    let promise = new Promise((resolve, reject) => {
        fetch(url, {
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
    extendPromise(promise);
    return promise;
};

const requestFakeApi = (url, param, type) => {
    let promise = new Promise((resolve, reject) => {
        let success = setTimeout(() => {
            resolve({ "data": url });
        }, 2500);
        let fail = setTimeout(() => {
            reject({ "data": { "code": "333", "msg": "访问错误" } });
        })
    });
    extendPromise(promise);
    return promise;
};

module.exports = {
    requestApi: requestApi,
    requestFakeApi: requestFakeApi
};
