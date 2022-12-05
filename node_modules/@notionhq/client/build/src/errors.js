"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRequestError = exports.APIResponseError = exports.UnknownHTTPResponseError = exports.isHTTPResponseError = exports.RequestTimeoutError = exports.isNotionClientError = exports.ClientErrorCode = exports.APIErrorCode = void 0;
const utils_1 = require("./utils");
/**
 * Error codes returned in responses from the API.
 */
var APIErrorCode;
(function (APIErrorCode) {
    APIErrorCode["Unauthorized"] = "unauthorized";
    APIErrorCode["RestrictedResource"] = "restricted_resource";
    APIErrorCode["ObjectNotFound"] = "object_not_found";
    APIErrorCode["RateLimited"] = "rate_limited";
    APIErrorCode["InvalidJSON"] = "invalid_json";
    APIErrorCode["InvalidRequestURL"] = "invalid_request_url";
    APIErrorCode["InvalidRequest"] = "invalid_request";
    APIErrorCode["ValidationError"] = "validation_error";
    APIErrorCode["ConflictError"] = "conflict_error";
    APIErrorCode["InternalServerError"] = "internal_server_error";
    APIErrorCode["ServiceUnavailable"] = "service_unavailable";
})(APIErrorCode = exports.APIErrorCode || (exports.APIErrorCode = {}));
/**
 * Error codes generated for client errors.
 */
var ClientErrorCode;
(function (ClientErrorCode) {
    ClientErrorCode["RequestTimeout"] = "notionhq_client_request_timeout";
    ClientErrorCode["ResponseError"] = "notionhq_client_response_error";
})(ClientErrorCode = exports.ClientErrorCode || (exports.ClientErrorCode = {}));
/**
 * Base error type.
 */
class NotionClientErrorBase extends Error {
}
/**
 * @param error any value, usually a caught error.
 * @returns `true` if error is a `NotionClientError`.
 */
function isNotionClientError(error) {
    return (0, utils_1.isObject)(error) && error instanceof NotionClientErrorBase;
}
exports.isNotionClientError = isNotionClientError;
/**
 * Narrows down the types of a NotionClientError.
 * @param error any value, usually a caught error.
 * @param codes an object mapping from possible error codes to `true`
 * @returns `true` if error is a `NotionClientError` with a code in `codes`.
 */
function isNotionClientErrorWithCode(error, codes) {
    return isNotionClientError(error) && error.code in codes;
}
/**
 * Error thrown by the client if a request times out.
 */
class RequestTimeoutError extends NotionClientErrorBase {
    constructor(message = "Request to Notion API has timed out") {
        super(message);
        this.code = ClientErrorCode.RequestTimeout;
        this.name = "RequestTimeoutError";
    }
    static isRequestTimeoutError(error) {
        return isNotionClientErrorWithCode(error, {
            [ClientErrorCode.RequestTimeout]: true,
        });
    }
    static rejectAfterTimeout(promise, timeoutMS) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new RequestTimeoutError());
            }, timeoutMS);
            promise
                .then(resolve)
                .catch(reject)
                .then(() => clearTimeout(timeoutId));
        });
    }
}
exports.RequestTimeoutError = RequestTimeoutError;
class HTTPResponseError extends NotionClientErrorBase {
    constructor(args) {
        super(args.message);
        this.name = "HTTPResponseError";
        const { code, status, headers, rawBodyText } = args;
        this.code = code;
        this.status = status;
        this.headers = headers;
        this.body = rawBodyText;
    }
}
const httpResponseErrorCodes = {
    [ClientErrorCode.ResponseError]: true,
    [APIErrorCode.Unauthorized]: true,
    [APIErrorCode.RestrictedResource]: true,
    [APIErrorCode.ObjectNotFound]: true,
    [APIErrorCode.RateLimited]: true,
    [APIErrorCode.InvalidJSON]: true,
    [APIErrorCode.InvalidRequestURL]: true,
    [APIErrorCode.InvalidRequest]: true,
    [APIErrorCode.ValidationError]: true,
    [APIErrorCode.ConflictError]: true,
    [APIErrorCode.InternalServerError]: true,
    [APIErrorCode.ServiceUnavailable]: true,
};
function isHTTPResponseError(error) {
    if (!isNotionClientErrorWithCode(error, httpResponseErrorCodes)) {
        return false;
    }
    return true;
}
exports.isHTTPResponseError = isHTTPResponseError;
/**
 * Error thrown if an API call responds with an unknown error code, or does not respond with
 * a property-formatted error.
 */
class UnknownHTTPResponseError extends HTTPResponseError {
    constructor(args) {
        var _a;
        super({
            ...args,
            code: ClientErrorCode.ResponseError,
            message: (_a = args.message) !== null && _a !== void 0 ? _a : `Request to Notion API failed with status: ${args.status}`,
        });
        this.name = "UnknownHTTPResponseError";
    }
    static isUnknownHTTPResponseError(error) {
        return isNotionClientErrorWithCode(error, {
            [ClientErrorCode.ResponseError]: true,
        });
    }
}
exports.UnknownHTTPResponseError = UnknownHTTPResponseError;
const apiErrorCodes = {
    [APIErrorCode.Unauthorized]: true,
    [APIErrorCode.RestrictedResource]: true,
    [APIErrorCode.ObjectNotFound]: true,
    [APIErrorCode.RateLimited]: true,
    [APIErrorCode.InvalidJSON]: true,
    [APIErrorCode.InvalidRequestURL]: true,
    [APIErrorCode.InvalidRequest]: true,
    [APIErrorCode.ValidationError]: true,
    [APIErrorCode.ConflictError]: true,
    [APIErrorCode.InternalServerError]: true,
    [APIErrorCode.ServiceUnavailable]: true,
};
/**
 * A response from the API indicating a problem.
 * Use the `code` property to handle various kinds of errors. All its possible values are in `APIErrorCode`.
 */
class APIResponseError extends HTTPResponseError {
    constructor() {
        super(...arguments);
        this.name = "APIResponseError";
    }
    static isAPIResponseError(error) {
        return isNotionClientErrorWithCode(error, apiErrorCodes);
    }
}
exports.APIResponseError = APIResponseError;
function buildRequestError(response, bodyText) {
    const apiErrorResponseBody = parseAPIErrorResponseBody(bodyText);
    if (apiErrorResponseBody !== undefined) {
        return new APIResponseError({
            code: apiErrorResponseBody.code,
            message: apiErrorResponseBody.message,
            headers: response.headers,
            status: response.status,
            rawBodyText: bodyText,
        });
    }
    return new UnknownHTTPResponseError({
        message: undefined,
        headers: response.headers,
        status: response.status,
        rawBodyText: bodyText,
    });
}
exports.buildRequestError = buildRequestError;
function parseAPIErrorResponseBody(body) {
    if (typeof body !== "string") {
        return;
    }
    let parsed;
    try {
        parsed = JSON.parse(body);
    }
    catch (parseError) {
        return;
    }
    if (!(0, utils_1.isObject)(parsed) ||
        typeof parsed["message"] !== "string" ||
        !isAPIErrorCode(parsed["code"])) {
        return;
    }
    return {
        ...parsed,
        code: parsed["code"],
        message: parsed["message"],
    };
}
function isAPIErrorCode(code) {
    return typeof code === "string" && code in apiErrorCodes;
}
//# sourceMappingURL=errors.js.map