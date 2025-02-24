import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Context } from "aws-lambda";
import { v4 } from "uuid";

// We receive a http event by the api gateway(GET OR POST)
async function handler (event: APIGatewayProxyEvent, context: Context) {
    // The result from the request with the right format that AWS expect (back to the client)
    const response: APIGatewayProxyResultV2 = {
        statusCode: 200,
        body: JSON.stringify('Hello from lambda! this is the id: ' + v4())
    }
    console.log(event)

    return response;
}

export {handler}