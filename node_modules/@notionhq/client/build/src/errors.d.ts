import { SupportedResponse } from "./fetch-types";
/**
 * Error codes returned in responses from the API.
 */
export declare enum APIErrorCode {
    Unauthorized = "unauthorized",
    RestrictedResource = "restricted_resource",
    ObjectNotFound = "object_not_found",
    RateLimited = "rate_limited",
    InvalidJSON = "invalid_json",
    InvalidRequestURL = "invalid_request_url",
    InvalidRequest = "invalid_request",
    ValidationError = "validation_error",
    ConflictError = "conflict_error",
    InternalServerError = "internal_server_error",
    ServiceUnavailable = "service_unavailable"
}
/**
 * Error codes generated for client errors.
 */
export declare enum ClientErrorCode {
    RequestTimeout = "notionhq_client_request_timeout",
    ResponseError = "notionhq_client_response_error"
}
/**
 * Error codes on errors thrown by the `Client`.
 */
export declare type NotionErrorCode = APIErrorCode | ClientErrorCode;
/**
 * Base error type.
 */
declare abstract class NotionClientErrorBase<Code extends NotionErrorCode> extends Error {
    abstract code: Code;
}
/**
 * Error type that encompasses all the kinds of errors that the Notion client will throw.
 */
export declare type NotionClientError = RequestTimeoutError | UnknownHTTPResponseError | APIResponseError;
/**
 * @param error any value, usually a caught error.
 * @returns `true` if error is a `NotionClientError`.
 */
export declare function isNotionClientError(error: unknown): error is NotionClientError;
/**
 * Error thrown by the client if a request times out.
 */
export declare class RequestTimeoutError extends NotionClientErrorBase<ClientErrorCode.RequestTimeout> {
    readonly code = ClientErrorCode.RequestTimeout;
    readonly name = "RequestTimeoutError";
    constructor(message?: string);
    static isRequestTimeoutError(error: unknown): error is RequestTimeoutError;
    static rejectAfterTimeout<T>(promise: Promise<T>, timeoutMS: number): Promise<T>;
}
declare type HTTPResponseErrorCode = ClientErrorCode.ResponseError | APIErrorCode;
declare class HTTPResponseError<Code extends HTTPResponseErrorCode> extends NotionClientErrorBase<Code> {
    readonly name: string;
    readonly code: Code;
    readonly status: number;
    readonly headers: SupportedResponse["headers"];
    readonly body: string;
    constructor(args: {
        code: Code;
        status: number;
        message: string;
        headers: SupportedResponse["headers"];
        rawBodyText: string;
    });
}
export declare function isHTTPResponseError(error: unknown): error is UnknownHTTPResponseError | APIResponseError;
/**
 * Error thrown if an API call responds with an unknown error code, or does not respond with
 * a property-formatted error.
 */
export declare class UnknownHTTPResponseError extends HTTPResponseError<ClientErrorCode.ResponseError> {
    readonly name = "UnknownHTTPResponseError";
    constructor(args: {
        status: number;
        message: string | undefined;
        headers: SupportedResponse["headers"];
        rawBodyText: string;
    });
    static isUnknownHTTPResponseError(error: unknown): error is UnknownHTTPResponseError;
}
/**
 * A response from the API indicating a problem.
 * Use the `code` property to handle various kinds of errors. All its possible values are in `APIErrorCode`.
 */
export declare class APIResponseError extends HTTPResponseError<APIErrorCode> {
    readonly name = "APIResponseError";
    static isAPIResponseError(error: unknown): error is APIResponseError;
}
export declare function buildRequestError(response: SupportedResponse, bodyText: string): APIResponseError | UnknownHTTPResponseError;
export {};
//# sourceMappingURL=errors.d.ts.map