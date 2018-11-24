import { WebhookEvent, WebhookPayloadWithRepository } from '@octokit/webhooks';
import { GitHubAPI } from './github';
import { LoggerWithTarget } from './wrap-logger';
/**
 * The context of the event that was triggered, including the payload and
 * helpers for extracting information can be passed to GitHub API calls.
 *
 *  ```js
 *  module.exports = app => {
 *    app.on('push', context => {
 *      context.log('Code was pushed to the repo, what should we do with it?');
 *    });
 *  };
 *  ```
 *
 * @property {github} github - A GitHub API client
 * @property {payload} payload - The webhook event payload
 * @property {logger} log - A logger
 */
export declare class Context implements WebhookEvent {
    name: string;
    id: string;
    payload: WebhookPayloadWithRepository;
    protocol?: 'http' | 'https';
    host?: string;
    url?: string;
    github: GitHubAPI;
    log: LoggerWithTarget;
    constructor(event: WebhookEvent, github: GitHubAPI, log: LoggerWithTarget);
    readonly event: string;
    /**
     * Return the `owner` and `repo` params for making API requests against a
     * repository.
     *
     * ```js
     * const params = context.repo({path: '.github/config.yml'})
     * // Returns: {owner: 'username', repo: 'reponame', path: '.github/config.yml'}
     * ```
     *
     * @param object - Params to be merged with the repo params.
     *
     */
    repo<T>(object?: T): {
        owner: string;
        repo: string;
    } & T;
    /**
     * Return the `owner`, `repo`, and `number` params for making API requests
     * against an issue or pull request. The object passed in will be merged with
     * the repo params.
     *
     * ```js
     * const params = context.issue({body: 'Hello World!'})
     * // Returns: {owner: 'username', repo: 'reponame', number: 123, body: 'Hello World!'}
     * ```
     *
     * @param object - Params to be merged with the issue params.
     */
    issue<T>(object?: T): {
        number: any;
    } & {
        owner: string;
        repo: string;
    } & T;
    /**
     * Returns a boolean if the actor on the event was a bot.
     * @type {boolean}
     */
    readonly isBot: boolean;
    /**
     * Reads the app configuration from the given YAML file in the `.github`
     * directory of the repository.
     *
     * For example, given a file named `.github/config.yml`:
     *
     * ```yml
     * close: true
     * comment: Check the specs on the rotary girder.
     * ```
     *
     * You app can read that file from the target repository:
     *
     * ```js
     * // Load config from .github/config.yml in the repository
     * const config = await context.config('config.yml')
     *
     * if (config.close) {
     *   context.github.issues.comment(context.issue({body: config.comment}))
     *   context.github.issues.edit(context.issue({state: 'closed'}))
     * }
     * ```
     *
     * You can also use a `defaultConfig` object:
     *
     * ```js
     * // Load config from .github/config.yml in the repository and combine with default config
     * const config = await context.config('config.yml', {comment: 'Make sure to check all the specs.'})
     *
     * if (config.close) {
     *   context.github.issues.comment(context.issue({body: config.comment}));
     *   context.github.issues.edit(context.issue({state: 'closed'}))
     * }
     * ```
     *
     * @param fileName - Name of the YAML file in the `.github` directory
     * @param defaultConfig - An object of default config options
     * @return Configuration object read from the file
     */
    config<T>(fileName: string, defaultConfig?: T): Promise<T | null>;
}
