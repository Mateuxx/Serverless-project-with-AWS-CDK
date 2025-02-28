import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";


//Its always a good practice to create this client outsiede the handler function cause we can reused by multiples lambda invocations
const dynamodbClient = new DynamoDBClient({})

//we receive a  a event from the APIGatewayProxyEvent and a context?
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: String;

    try {
        switch (event.httpMethod) {
            case "GET":
                message = "Hello from GET!!"
                break;

            case "POST":
                const response = postSpaces(event, dynamodbClient);
                return response;

            default:
                break;
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }

    }

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }
    console.log(event)

    return response;
}

export { handler }