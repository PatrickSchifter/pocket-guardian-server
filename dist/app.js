"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config/config");
const cors_1 = __importDefault(require("cors"));
const ip_1 = __importDefault(require("ip")); // Importe o pacote ip
const app = (0, express_1.default)();
const port = config_1.config.port || 3030;
const serverIp = ip_1.default.address(); // Use o método address() para obter o IP
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send({ status: 'ok' });
});
app.listen(port, () => {
    console.log(`running on ip: ${serverIp} and port ${port}`); // Exiba o IP e a porta
});
exports.default = app;
