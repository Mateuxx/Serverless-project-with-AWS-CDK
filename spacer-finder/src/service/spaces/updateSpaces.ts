import { DynamoDBClient, GetItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb"; 
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


export async function updateSpaces (event: APIGatewayProxyEvent, dynamodbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    //if i have a query string parameters i enter here 
    if (event.queryStringParameters && ("id" in event.queryStringParameters) && event.body) {

        //from a jason to a js object 
        const parsedBody = JSON.parse(event.body);
        
        console.log ("Parsed body: " + parsedBody)

        // we get the id from the query string parameters
        const spaceId = event.queryStringParameters["id"];
        // we get the key and value from the body ? the firts key of the objet - mateus, what it is key dude?
        const requestBodyKey = Object.keys(parsedBody)[0];
        // we get the value from the body the actual value of the key  location 
        const requestBodyValue = parsedBody[requestBodyKey];

        //update the item 
        const updateResult = await dynamodbClient.send(new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id' : {S: spaceId}
            },
            // especificie out the attribute that we want to update
            // these a "marcadores de posição" -  i can give any names i want
            UpdateExpression: 'set #zzzNew = :new',
            ExpressionAttributeValues : {
                ':new': {S: requestBodyValue}
            },
            ExpressionAttributeNames: {
                '#zzzNew': requestBodyKey
            }, 
            ReturnValues: 'UPDATED_NEW'
        }))

        return {
            statusCode: 204, // no content
            body: JSON.stringify(updateResult.Attributes)
        }

        
    }
    return {
        statusCode: 400, // bad request
        body: JSON.stringify("Missing parameters, please provide id and body")
    }
} 