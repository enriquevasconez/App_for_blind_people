require('dotenv').config()

export class RQRS {
    constructor(resource) {
        this.URI = process.env.URI;
        this.contentType = 'application/json'
        this.APIKEY = process.env.APIKEY;
        this.resource = resource;
        this.headers = {
            'Content-type': this.contentType,
            "x-api-key": this.APIKEY
        }
    }

    get = (params) => {
        const queryParams = params.queryParams || {}
        const subResourse = params.subResourse || undefined
        const uri = this.parseUri(queryParams, subResourse);
        return fetch(
            uri,
            {
                headers: this.headers
            }
        );
    }

    post = (params) => {
        const queryParams = params.queryParams || {}
        const bodyParams = params.bodyParams || {}
        const subResourse = params.subResourse || undefined
        const uri = this.parseUri(queryParams, subResourse);
        return fetch(
            uri,
            {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(bodyParams)
            }
        );
    };

    patch = (params) => {
        const queryParams = params.queryParams || {}
        const bodyParams = params.bodyParams || {}
        const subResourse = params.subResourse || undefined
        const uri = this.parseUri(queryParams, subResourse);
        return fetch(
            uri,
            {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(bodyParams)
            }
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