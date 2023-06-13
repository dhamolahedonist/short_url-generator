"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const dotenv_1 = __importDefault(require("dotenv"));
const shortUrlRoutes_1 = __importDefault(require("./routes/shortUrlRoutes"));
const path_1 = __importDefault(require("path"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
dotenv_1.default.config();
(0, db_1.default)();
exports.app = (0, express_1.default)();
const hostname = Object(process.env.HOSTNAME);
const port = parseInt(process.env.PORT || "3000");
exports.app.use(express_1.default.json());
exports.app.set("view engine", "ejs");
exports.app.set("views", path_1.default.join(__dirname, "views"));
exports.app.use(express_1.default.urlencoded({ extended: false }));
const limiter = (0, express_rate_limit_1.default)({
  windowMs: 60 * 1000,
  max: 100,
  handler: (request, response) => {
    response.redirect("/");
  },
});
exports.app.use(limiter);
exports.app.use("/", shortUrlRoutes_1.default);
exports.server = exports.app.listen(port, hostname, () => {
  console.log(
    `Express server is started at http://${hostname}: ${process.env.PORT}`
  );
});
