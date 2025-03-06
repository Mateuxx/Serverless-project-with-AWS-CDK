import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { parseJson } from "../shared/Utils";


export async function postSpaces (event: APIGatewayProxyEvent, dynamodbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    //uuid lib - v4()
    const randomId = v4();
    
    //we receive the body and then we parse it 
    const item = parseJson(event.body);
    console.log(item);

    //insert an id on dynamoDB
    const result = await dynamodbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            id: {
                S: randomId
            },
            location : {
                S: item.location
            }
        }
    }));

    console.log(result)

    return {
        statusCode: 201,
        body: JSON.stringify({id: randomId})
    }
}