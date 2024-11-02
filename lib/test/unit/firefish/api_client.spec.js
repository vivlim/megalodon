"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_client_1 = __importDefault(require("@/firefish/api_client"));
describe('api_client', function () {
    describe('mapReactions', function () {
        it('should work', function () {
            var emojis = [
                {
                    name: 'foxverified',
                    url: 'https://example.com/files/foxverified',
                    category: null
                },
                {
                    name: 'verificado',
                    url: 'https://example.com/files/verificado',
                    category: null
                },
                {
                    name: 'kawaii@firefish.example',
                    url: 'https://example.com/proxy/firefishexample/kawaii',
                    category: null
                },
                {
                    name: 'ablobcatnodfast@.',
                    url: 'https://example.com/files/ablobcatnodfast',
                    category: null
                }
            ];
            var reactions = {
                ':ablobcatnodfast@.:': 2,
                ':kawaii@firefish.example:': 1
            };
            var res = api_client_1.default.Converter.mapReactions(emojis, reactions);
            expect(res).toHaveLength(2);
            expect(res).toContainEqual({
                count: 2,
                me: false,
                name: 'ablobcatnodfast',
                url: 'https://example.com/files/ablobcatnodfast',
                static_url: 'https://example.com/files/ablobcatnodfast'
            });
            expect(res).toContainEqual({
                count: 1,
                me: false,
                name: 'kawaii@firefish.example',
                url: 'https://example.com/proxy/firefishexample/kawaii',
                static_url: 'https://example.com/proxy/firefishexample/kawaii'
            });
        });
        it('does not have emojis', function () {
            var emojis = [];
            var reactions = {
                ':ablobcatnodfast@.:': 2,
                ':kawaii@firefish.example:': 1
            };
            var res = api_client_1.default.Converter.mapReactions(emojis, reactions);
            expect(res).toHaveLength(2);
            expect(res).toContainEqual({
                count: 2,
                me: false,
                name: 'ablobcatnodfast'
            });
            expect(res).toContainEqual({
                count: 1,
                me: false,
                name: 'kawaii@firefish.example'
            });
        });
        it('reactions with me', function () {
            var emojis = [
                {
                    name: 'foxverified',
                    url: 'https://example.com/files/foxverified',
                    category: null
                },
                {
                    name: 'verificado',
                    url: 'https://example.com/files/verificado',
                    category: null
                },
                {
                    name: 'kawaii@firefish.example',
                    url: 'https://example.com/proxy/firefishexample/kawaii',
                    category: null
                },
                {
                    name: 'ablobcatnodfast@.',
                    url: 'https://example.com/files/ablobcatnodfast',
                    category: null
                }
            ];
            var reactions = {
                ':ablobcatnodfast@.:': 2,
                ':kawaii@firefish.example:': 1
            };
            var res = api_client_1.default.Converter.mapReactions(emojis, reactions, ':ablobcatnodfast@.:');
            expect(res).toHaveLength(2);
            expect(res).toContainEqual({
                count: 2,
                me: true,
                name: 'ablobcatnodfast',
                url: 'https://example.com/files/ablobcatnodfast',
                static_url: 'https://example.com/files/ablobcatnodfast'
            });
            expect(res).toContainEqual({
                count: 1,
                me: false,
                name: 'kawaii@firefish.example',
                url: 'https://example.com/proxy/firefishexample/kawaii',
                static_url: 'https://example.com/proxy/firefishexample/kawaii'
            });
        });
    });
});
