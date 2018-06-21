"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieService = __importStar(require("../services/movie-service"));
const auth_middleware_1 = require("../security/auth-middleware");
exports.movieRouter = express_1.default.Router();
exports.movieRouter.get('/title/:title/year/:year', (req, resp) => {
    movieService.findByYearAndTitle(parseInt(req.params.year), req.params.title)
        .then(data => {
        resp.json(data.Item);
    })
        .catch(err => {
        console.log(err);
        resp.sendStatus(500);
    });
});
exports.movieRouter.get('/year/:year', [
    auth_middleware_1.authMiddleware('admin', 'employee'),
    (req, resp, next) => {
        movieService.findAllByYear(parseInt(req.params.year))
            .then(data => {
            resp.json(data.Items);
        })
            .catch(err => {
            console.log(err);
            resp.sendStatus(500);
        });
    }
]);
exports.movieRouter.put('', (req, resp) => {
    movieService.update(req.body)
        .then(data => {
        resp.json(data);
    })
        .catch(err => {
        console.log(err);
        resp.sendStatus(500);
    });
});
exports.movieRouter.post('', [
    auth_middleware_1.authMiddleware('admin'),
    (req, resp) => {
        console.log(req.body);
        movieService.save(req.body)
            .then(data => {
            resp.json(data);
        })
            .catch(err => {
            console.log(err);
            resp.sendStatus(500);
        });
    }
]);
//# sourceMappingURL=movie-router.js.map