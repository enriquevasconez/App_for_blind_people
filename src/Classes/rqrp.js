export class RQRS {
    constructor(resource) {
        this.URI = process.env.REACT_APP_URI;
        this.contentType = 'application/json'
        this.APIKEY = process.env.REACT_APP_API_KEY_BK;
        this.resource = resource;
        this.headers = {
            'Content-type': this.contentType,
            "x-api-key": this.APIKEY
        }
    }

    excectPromise = (promise) => {
        return new Promise(
            (resolve, reject) => {
                promise
                    .then(
                        resp => {
                            if (resp.status >= 300) {
                                console.log(resp);
                                resp.json().then(
                                    result => {
                                        console.log(result, "here")
                                        reject(result?.detail);
                                    }
                                ).catch(
                                    (error) => {
                                        reject("Validate your internet connection", error);
                                    }
                                )
                            }
                            else {
                                resolve(resp);
                            }
                        }
                    ).catch(
                        err => {
                            reject(err);
                        }
                    )
            }
        );
    }

    get = (params) => {
        const queryParams = params?.queryParams || {}
        const subResourse = params?.subResourse || undefined
        const uri = this.parseUri(queryParams, subResourse);
        console.log("URI", uri);
        return this.excectPromise(
            fetch(
                uri,
                {
                    headers: this.headers
                }
            )
        );
    }

    post = (params) => {
        const queryParams = params?.queryParams || {}
        const bodyParams = params?.bodyParams || {}
        const subResourse = params?.subResourse || undefined
        const uri = this.parseUri(queryParams, subResourse);
        console.log("URI", uri, bodyParams);
        return this.excectPromise(
            fetch(
                uri,
                {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify(bodyParams)
                }
            )
        );
    };

    patch = (params) => {
        const queryParams = params?.queryParams || {}
        const bodyParams = params?.bodyParams || {}
        const subResourse = params?.subResourse || undefined
        const uri = this.parseUri(queryParams, subResourse);
        return this.excectPromise(
            fetch(
                uri,
                {
                    method: 'PATCH',
                    headers: this.headers,
                    body: JSON.stringify(bodyParams)
                }
            )
        );
    };

    parseUri = (queryParams = {}, subResourse = undefined) => {
        let uri = `${this.URI}/${this.resource}`;
        uri = subResourse != null ? uri + `/${subResourse}` : uri;
        let queryParamsList = Object.entries(queryParams);
        queryParamsList.forEach(
            (element, index) => {
                queryParamsList[index] = `${element[0]}=${element[1]}`;
            }
        );
        queryParamsList = queryParamsList.join('&');
        uri = uri + `?${queryParamsList}`;
        return uri;
    }
}

// let test = new RQRS("user");
// test.get({ subResourse: 1, queryParams:{from:0, size:10} });