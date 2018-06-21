"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const awsConfig = {
    region: process.env.MOVIE_API_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
// console.log(awsConfig);
aws_sdk_1.default.config.update(awsConfig);
const dynamodb = new aws_sdk_1.default.DynamoDB();
const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient(); // subset of functionality of dynamodb
function createMovieTable() {
    dynamodb.createTable({
        TableName: "movies",
        KeySchema: [
            { AttributeName: "year", KeyType: "HASH" },
            { AttributeName: "title", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: "year", AttributeType: "N" },
            { AttributeName: "title", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 2,
            WriteCapacityUnits: 2
        }
    }, (err, data) => {
        if (err) {
            console.log(`Unable to creat table: \n ${JSON.stringify(err, undefined, 2)}`);
        }
        else {
            console.log(`Created table: \n ${JSON.stringify(data, undefined, 2)}`);
        }
    });
}
exports.createMovieTable = createMovieTable;
function saveMovie(movie) {
    return docClient
        .put({
        TableName: "movies",
        Item: movie
    })
        .promise();
}
exports.saveMovie = saveMovie;
function findAllByYear(year) {
    return docClient
        .query({
        TableName: "movies",
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames: {
            // for aliasing field names
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            // for aliasing actual values
            ":yyyy": year
        }
        // ReturnConsumedCapacity: 'TOTAL' // not needed but if you want to see this info it is there
    })
        .promise();
}
exports.findAllByYear = findAllByYear;
function findByYearAndTitle(year, title) {
    console.log(`finding movie with title: ${title}
  and year: ${year}`);
    return docClient
        .get({
        TableName: "movies",
        Key: {
            year: year,
            title: title
        }
    })
        .promise();
}
exports.findByYearAndTitle = findByYearAndTitle;
function update(movie) {
    return docClient
        .update({
        TableName: "movies",
        Key: {
            year: movie.year,
            title: movie.title
        },
        UpdateExpression: "set #rat = :r, #desc = :desc",
        ExpressionAttributeNames: {
            "#desc": "description",
            "#rat": "rating"
        },
        ExpressionAttributeValues: {
            ":r": movie.rating,
            ":desc": movie.description
        },
        ReturnValues: "UPDATED_NEW"
    })
        .promise();
}
exports.update = update;
//# sourceMappingURL=movie-dao.js.map