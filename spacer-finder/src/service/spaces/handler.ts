import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GettSpaces";
import { updateSpaces } from "./updateSpaces";


//Its always a good practice to create this client outsiede the handler function cause we can reused by multiples lambda invocations
const dynamodbClient = new DynamoDBClient({})

//we receive a  a event from the APIGatewayProxyEvent and a context?
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: String;

    try {
        switch (event.httpMethod) {
            case "GET":
                const getResponse = await getSpaces(event, dynamodbClient);
                return getResponse;

            case "POST":
                const postResponse = await postSpaces(event, dynamodbClient);
                return postResponse;

                case "PUT":
                    const putResponse = await updateSpaces(event, dynamodbClient);
                    return putResponse;
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
    //this is a response to the API Gateway
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }
    console.log(event)

    return response;
}

export { handler }