/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface BaseCard
 */
export interface BaseCard {
    /**
     * 
     * @type {string}
     * @memberof BaseCard
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof BaseCard
     */
    'path': string;
    /**
     * 
     * @type {string}
     * @memberof BaseCard
     */
    'description': string;
}
/**
 * 
 * @export
 * @interface BodySubmitPostGamePost
 */
export interface BodySubmitPostGamePost {
    /**
     * 
     * @type {Array<string>}
     * @memberof BodySubmitPostGamePost
     */
    'selected_cards': Array<string>;
    /**
     * 
     * @type {Player}
     * @memberof BodySubmitPostGamePost
     */
    'role': Player;
    /**
     * 
     * @type {Throw}
     * @memberof BodySubmitPostGamePost
     */
    'throw_choice': Throw;
}


/**
 * 
 * @export
 * @interface GameEndState
 */
export interface GameEndState {
    /**
     * 
     * @type {Player}
     * @memberof GameEndState
     */
    'winner': Player;
    /**
     * 
     * @type {string}
     * @memberof GameEndState
     */
    'tie_breaker'?: string | null;
}


/**
 * 
 * @export
 * @interface GameState
 */
export interface GameState {
    /**
     * 
     * @type {PlayerState}
     * @memberof GameState
     */
    'host_state': PlayerState;
    /**
     * 
     * @type {PlayerState}
     * @memberof GameState
     */
    'guest_state': PlayerState;
}
/**
 * 
 * @export
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
    /**
     * 
     * @type {Array<ValidationError>}
     * @memberof HTTPValidationError
     */
    'detail'?: Array<ValidationError>;
}
/**
 * 
 * @export
 * @interface LobbyState
 */
export interface LobbyState {
    /**
     * 
     * @type {string}
     * @memberof LobbyState
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof LobbyState
     */
    'last_update': string;
    /**
     * 
     * @type {LobbyStatus}
     * @memberof LobbyState
     */
    'status'?: LobbyStatus;
    /**
     * 
     * @type {PlayerOptions}
     * @memberof LobbyState
     */
    'guest': PlayerOptions;
    /**
     * 
     * @type {PlayerOptions}
     * @memberof LobbyState
     */
    'host': PlayerOptions;
    /**
     * 
     * @type {Array<GameState>}
     * @memberof LobbyState
     */
    'game_history'?: Array<GameState>;
    /**
     * 
     * @type {GameEndState}
     * @memberof LobbyState
     */
    'end'?: GameEndState | null;
}


/**
 * 
 * @export
 * @enum {string}
 */

export const LobbyStatus = {
    Created: 'created',
    Playing: 'playing',
    Showdown: 'showdown'
} as const;

export type LobbyStatus = typeof LobbyStatus[keyof typeof LobbyStatus];


/**
 * 
 * @export
 * @enum {string}
 */

export const Player = {
    Host: 'host',
    Guest: 'guest'
} as const;

export type Player = typeof Player[keyof typeof Player];


/**
 * 
 * @export
 * @interface PlayerOptions
 */
export interface PlayerOptions {
    /**
     * 
     * @type {Array<BaseCard>}
     * @memberof PlayerOptions
     */
    'available': Array<BaseCard>;
    /**
     * 
     * @type {Array<BaseCard>}
     * @memberof PlayerOptions
     */
    'selected'?: Array<BaseCard>;
    /**
     * 
     * @type {Throw}
     * @memberof PlayerOptions
     */
    'throw'?: Throw | null;
}


/**
 * 
 * @export
 * @interface PlayerState
 */
export interface PlayerState {
    /**
     * 
     * @type {Throw}
     * @memberof PlayerState
     */
    'throw': Throw;
    /**
     * 
     * @type {Array<string>}
     * @memberof PlayerState
     */
    'status_effects'?: Array<string>;
    /**
     * 
     * @type {BaseCard}
     * @memberof PlayerState
     */
    'played_card'?: BaseCard | null;
}


/**
 * 
 * @export
 * @enum {string}
 */

export const Throw = {
    Rock: 'Rock',
    Paper: 'Paper',
    Scissors: 'Scissors',
    Nothing: 'Nothing'
} as const;

export type Throw = typeof Throw[keyof typeof Throw];


/**
 * 
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     * 
     * @type {Array<ValidationErrorLocInner>}
     * @memberof ValidationError
     */
    'loc': Array<ValidationErrorLocInner>;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'msg': string;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'type': string;
}
/**
 * 
 * @export
 * @interface ValidationErrorLocInner
 */
export interface ValidationErrorLocInner {
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create Game
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createGameCreateGameGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/create-game`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Game
         * @param {string} gameId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGameGetGameGet: async (gameId: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'gameId' is not null or undefined
            assertParamExists('getGameGetGameGet', 'gameId', gameId)
            const localVarPath = `/get-game`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (gameId !== undefined) {
                localVarQueryParameter['game_id'] = gameId;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Join Game
         * @param {string} gameId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        joinGameJoinGameGet: async (gameId: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'gameId' is not null or undefined
            assertParamExists('joinGameJoinGameGet', 'gameId', gameId)
            const localVarPath = `/join-game`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (gameId !== undefined) {
                localVarQueryParameter['game_id'] = gameId;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Submit
         * @param {string} gameId 
         * @param {BodySubmitPostGamePost} bodySubmitPostGamePost 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        submitPostGamePost: async (gameId: string, bodySubmitPostGamePost: BodySubmitPostGamePost, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'gameId' is not null or undefined
            assertParamExists('submitPostGamePost', 'gameId', gameId)
            // verify required parameter 'bodySubmitPostGamePost' is not null or undefined
            assertParamExists('submitPostGamePost', 'bodySubmitPostGamePost', bodySubmitPostGamePost)
            const localVarPath = `/post-game`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (gameId !== undefined) {
                localVarQueryParameter['game_id'] = gameId;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(bodySubmitPostGamePost, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create Game
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createGameCreateGameGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LobbyState>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createGameCreateGameGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.createGameCreateGameGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Get Game
         * @param {string} gameId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getGameGetGameGet(gameId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LobbyState>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getGameGetGameGet(gameId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.getGameGetGameGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Join Game
         * @param {string} gameId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async joinGameJoinGameGet(gameId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LobbyState>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.joinGameJoinGameGet(gameId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.joinGameJoinGameGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Submit
         * @param {string} gameId 
         * @param {BodySubmitPostGamePost} bodySubmitPostGamePost 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async submitPostGamePost(gameId: string, bodySubmitPostGamePost: BodySubmitPostGamePost, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LobbyState>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.submitPostGamePost(gameId, bodySubmitPostGamePost, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.submitPostGamePost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary Create Game
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createGameCreateGameGet(options?: RawAxiosRequestConfig): AxiosPromise<LobbyState> {
            return localVarFp.createGameCreateGameGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Game
         * @param {string} gameId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGameGetGameGet(gameId: string, options?: RawAxiosRequestConfig): AxiosPromise<LobbyState> {
            return localVarFp.getGameGetGameGet(gameId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Join Game
         * @param {string} gameId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        joinGameJoinGameGet(gameId: string, options?: RawAxiosRequestConfig): AxiosPromise<LobbyState> {
            return localVarFp.joinGameJoinGameGet(gameId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Submit
         * @param {string} gameId 
         * @param {BodySubmitPostGamePost} bodySubmitPostGamePost 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        submitPostGamePost(gameId: string, bodySubmitPostGamePost: BodySubmitPostGamePost, options?: RawAxiosRequestConfig): AxiosPromise<LobbyState> {
            return localVarFp.submitPostGamePost(gameId, bodySubmitPostGamePost, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary Create Game
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public createGameCreateGameGet(options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).createGameCreateGameGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Game
     * @param {string} gameId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getGameGetGameGet(gameId: string, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getGameGetGameGet(gameId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Join Game
     * @param {string} gameId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public joinGameJoinGameGet(gameId: string, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).joinGameJoinGameGet(gameId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Submit
     * @param {string} gameId 
     * @param {BodySubmitPostGamePost} bodySubmitPostGamePost 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public submitPostGamePost(gameId: string, bodySubmitPostGamePost: BodySubmitPostGamePost, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).submitPostGamePost(gameId, bodySubmitPostGamePost, options).then((request) => request(this.axios, this.basePath));
    }
}



