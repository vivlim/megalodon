/// <reference types="node" />
/// <reference types="ws" />
import WS from 'isomorphic-ws';
import { EventEmitter } from 'events';
import { WebSocketInterface } from '../megalodon';
export default class Streaming extends EventEmitter implements WebSocketInterface {
    url: string;
    stream: string;
    params: string | null;
    parser: Parser;
    headers: {
        [key: string]: string;
    };
    private _accessToken;
    private _reconnectInterval;
    private _reconnectMaxAttempts;
    private _reconnectCurrentAttempts;
    private _connectionClosed;
    private _client;
    private _pongReceivedTimestamp;
    private _heartbeatInterval;
    private _pongWaiting;
    constructor(url: string, stream: string, params: string | undefined, accessToken: string, userAgent: string);
    start(): void;
    private _startWebSocketConnection;
    stop(): void;
    private _resetConnection;
    private _resetRetryParams;
    private _reconnect;
    private _connect;
    private _clearBinding;
    private _bindSocket;
    private _setupParser;
    private _checkAlive;
}
export declare class Parser extends EventEmitter {
    parse(ev: WS.MessageEvent): void;
}