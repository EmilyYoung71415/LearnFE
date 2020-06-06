/**
 * @file Promise-Based XHR
 */
function makeRequest(url, method) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            // Only run if the request is complete
            if (request.readyState !== 4) return;
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                resolve(request);
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };
        request.open(method || 'GET', url, true);
        request.send();
    });
};