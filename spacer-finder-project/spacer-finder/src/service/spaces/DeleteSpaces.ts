import { DeleteItemCommand, DynamoDBClient, GetItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


export async function deleteSpaces(event: APIGatewayProxyEvent, dynamodbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters) {

        if ("id" in event.queryStringParameters) {

            const spaceId = event.queryStringParameters["id"];

            //delete the item from our dynamodb table
            const deleteResult = await dynamodbClient.send(new DeleteItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    'id': { S: spaceId }
                }
            }))

            return {
                statusCode: 200, //ok
                body: JSON.stringify("Space deleted successfully")
            }
            
        
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify("Missing Parameters")
            }
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify("Missing Parameters")
        }
    }

    // return {
    //     statusCode: 200,
} 