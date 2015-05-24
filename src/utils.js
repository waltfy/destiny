'use strict';
import _ from 'lodash';

function DestinyError(message) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name; // function name as error name
    this.message = message;
}

export const UTILS = {
    indentity: x => x,
    noop: () => {},
    error: message => {
        throw new DestinyError(message);
    },
    assignMap: obj => _.partialRight(_.assign, obj),
    json: res => res.json(),
    unwrapDestinyResponse: res => {
        if (res.Response && res.Response.data) {
            return res.Response.data;
        } else if (res.Response) {
            return res.Response;
        } else {
            return res;
        }
    },
    METHODS: [
            'POST',
            'GET'
        ]
        .reduce((fold, method) => {
            fold[method] = method;
            return fold;
        }, {}),
    HEADERS: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
