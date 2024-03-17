"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = config_1.config.port || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send({ status: 'ok' });
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
