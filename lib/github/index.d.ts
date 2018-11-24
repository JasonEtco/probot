/// <reference types="bunyan" />
import Octokit from '@octokit/rest';
import { Logger } from './logging';
/**
 * the [@octokit/rest Node.js module](https://github.com/octokit/rest.js),
 * which wraps the [GitHub API](https://developer.github.com/v3/) and allows
 * you to do almost anything programmatically that you can do through a web
 * browser.
 * @see {@link https://github.com/octokit/rest.js}
 */
export declare function GitHubAPI(options?: Options): GitHubAPI;
export interface Options extends Octokit.Options {
    debug?: boolean;
    logger: Logger;
    limiter?: any;
}
export interface RequestOptions {
    baseUrl?: string;
    method: string;
    url: string;
    headers: any;
    query?: string;
    variables?: Variables;
}
export interface Result {
    headers: {
        status: string;
    };
}
export interface OctokitError extends Error {
    code: number;
    status: string;
}
export interface GitHubAPI extends Octokit {
    paginate: (res: Promise<Octokit.AnyResponse>, callback: (response: Promise<Octokit.AnyResponse>, done?: () => void) => void) => Promise<any[]>;
    hook: {
        error: (when: 'request', callback: (error: OctokitError, options: RequestOptions) => void) => void;
        before: (when: 'request', callback: (result: Result, options: RequestOptions) => void) => void;
        after: (when: 'request', callback: (result: Result, options: RequestOptions) => void) => void;
    };
    request: (RequestOptions: RequestOptions) => Promise<Octokit.AnyResponse>;
    query: (query: string, variables?: Variables, headers?: Headers) => Promise<any>;
}
export interface Headers {
    [key: string]: string;
}
export interface Variables {
    [key: string]: any;
}
export { GraphQLError, GraphQLQueryError } from './graphql';
