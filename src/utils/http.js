import https from "https";
import http from "http";

export function httpsRequest(url, params) {
  return new Promise(function (resolve, reject) {
    var request = https.request(url, params, function (response) {
      var data = [];

      response.on("data", (chunk) => {
        data.push(chunk);
      });

      response.on("end", () => {
        resolve([response.statusCode, response.headers["content-type"], Buffer.concat(data)]);
      });
    });

    request.on("error", (error) => {
      reject([500, error]);
    });

    request.end();
  });
}

export function httpRequest(url, params) {
  return new Promise(function (resolve, reject) {
    var request = http.request(url, params, function (response) {
      var data = [];

      response.on("data", (chunk) => {
        data.push(chunk);
      });

      response.on("end", () => {
        resolve([response.statusCode, response.headers["content-type"], Buffer.concat(data)]);
      });
    });

    request.on("error", (error) => {
      reject([500, error]);
    });

    request.end();
  });
}

export function httpProxy(url, params = {}) {
  const constructedUrl = new URL(url);

  if (constructedUrl.protocol === "https:") {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    return httpsRequest(constructedUrl, {
      agent: httpsAgent,
      ...params,
    });
  } else {
    return httpRequest(constructedUrl, params);
  }
}
