/// <reference types="node" />
import { WebSocketInterface } from '../megalodon';
import { EventEmitter } from 'events';
export default class WebSocket extends EventEmitter implements WebSocketInterface {
    constructor(_url: string, _stream: string, _params: string | undefined, _accessToken: string, _userAgent: string);
    start(): void;
    stop(): void;
}
