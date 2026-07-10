"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const health_1 = __importDefault(require("./routes/health"));
const resourceRoutes_1 = __importDefault(require("./routes/resourceRoutes"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(health_1.default);
app.use(resourceRoutes_1.default);
// Compute Codespaces-aware API base URL and expose it on the app
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.locals.API_BASE_URL = API_BASE_URL;
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl: API_BASE_URL });
});
app.use((0, cors_1.default)());
async function start() {
    try {
        await (0, database_1.connectToDatabase)();
    }
    catch (err) {
        console.error('Database connection failed. Server will still start but DB queries may fail.');
    }
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
start();
exports.default = app;
