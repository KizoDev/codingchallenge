"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
describe('GET /', () => {
    it('responds with status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/');
        expect(response.status).toBe(200);
    }));
    it('serves index.html', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/');
        expect(response.text).toContain('<!DOCTYPE html>');
    }));
});
describe('GET /filming-locations', () => {
    it('responds with status 200 and JSON data', () => __awaiter(void 0, void 0, void 0, function* () {
        const searchTerm = 'Inception';
        const response = yield (0, supertest_1.default)(app_1.default).get(`/filming-locations?searchTerm=${searchTerm}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                title: expect.any(String),
                locations: expect.any(String),
                director: expect.any(String),
                release_year: expect.any(String)
            })
        ]));
    }));
    it('responds with status 500 when search term is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/filming-locations');
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Search term is required.');
    }));
    it('responds with status 500 when external API request fails', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(app_1.default.locals, 'axios').mockRejectedValueOnce(new Error('API request failed'));
        const searchTerm = 'Inception';
        const response = yield (0, supertest_1.default)(app_1.default).get(`/filming-locations?searchTerm=${searchTerm}`);
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('API request failed');
    }));
});
