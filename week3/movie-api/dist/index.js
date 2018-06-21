"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const movie_router_1 = require("./routers/movie-router");
const user_router_1 = require("./routers/user-router");
const app = express_1.default();
const port = 3001;
app.set("port", port);
const sess = {
    secret: "keyboard cat",
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
};
// set up express to attach sessions
app.use(express_session_1.default(sess));
// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(express_1.default.static(path_1.default.join(__dirname, "static")));
// log the request being made
app.use((req, res, next) => {
    console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
    next();
});
// use the body parser to convert request json
app.use(body_parser_1.default.json());
// allow cross origins
app.use((req, resp, next) => {
    process.env.MOVIE_API_STAGE === "prod"
        ? resp.header("Access-Control-Allow-Origin", process.env.DEMO_APP_URL)
        : resp.header("Access-Control-Allow-Origin", "http://localhost:9001");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    resp.header("Access-Control-Allow-Credentials", "true");
    next();
});
// endpoint just to test
app.get("/test-endpoint", (req, res) => {
    res.json({ content: "hello" });
});
/*******************************************************************************
 * ROUTERS
 *******************************************************************************/
app.use("/movies", movie_router_1.movieRouter);
app.use("/users", user_router_1.userRouter);
// start up the app
const server = app.listen(port, () => {
    console.log(`App is running at http://localhost:${app.get("port")}`);
});
module.exports = server;
//# sourceMappingURL=index.js.map