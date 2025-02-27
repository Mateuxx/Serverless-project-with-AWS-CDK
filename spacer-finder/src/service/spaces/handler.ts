import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { stringify } from "querystring";


//we receive a  a event from the APIGatewayProxyEvent and a context?
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: String;

    switch (event.httpMethod) {
        case "GET":
            message = "Hello from GET!!"
            break;
        case "POST":
            message = "Hello from POST!!"
            break;

        default:
            break;
    }


    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }
    console.log(event)

    return response;
}

export { handler }