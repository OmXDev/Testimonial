"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = __importDefault(require("./router/user.route"));
const db_1 = __importDefault(require("./utils/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const space_route_1 = __importDefault(require("./router/space.route"));
dotenv_1.default.config({});
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['content-type', 'Authorization'],
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/user', user_route_1.default);
app.use('/api/user', space_route_1.default);
// Server setup
app.listen(port, () => {
    (0, db_1.default)();
    console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});
