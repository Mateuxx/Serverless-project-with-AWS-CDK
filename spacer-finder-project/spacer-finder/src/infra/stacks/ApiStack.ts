import { Stack, StackProps } from 'aws-cdk-lib'
import { AuthorizationType, CognitoUserPoolsAuthorizer, Cors, LambdaIntegration, MethodOptions, ResourceOptions, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { IUserPool } from 'aws-cdk-lib/aws-cognito';
import { AuthorizationToken } from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';


//API Gateway 
/*
This file defines the API Gateway stack in AWS CDK. Let me break it down:

1. The ApiStack creates a REST API using AWS API Gateway
2. It receives a LambdaIntegration as a prop, which connects the API to our Lambda function
3. The flow works like this:
   - Client makes HTTP request to API Gateway endpoint
   - API Gateway forwards request to the connected Lambda function
   - Lambda processes request and sends response back through API Gateway to client

Key parts:
- RestApi creates the API Gateway instance
- api.root.addResource('spaces') creates the /spaces endpoint
- addMethod() connects HTTP methods (GET/POST/PUT/DELETE) to our Lambda
- props.spacesLambdaIntegration links the Lambda function that will handle requests

This creates a fully serverless API where API Gateway triggers our Lambda function
for each incoming request to process the CRUD operations on our DynamoDB table.
*/

interface ApiStackProps extends StackProps {
    spacesLambdaIntegration: LambdaIntegration
    userpool: IUserPool
}

export class ApiStack extends Stack {

    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'SpacesApi');

        const authorizer = new CognitoUserPoolsAuthorizer(this, 'SpacesApiAuthorizer', {
            cognitoUserPools:[props.userpool],
            identitySource: 'method.request.header.Authorization'
        });
        authorizer._attachToApi(api);

        const optionsWithAuth: MethodOptions = {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: authorizer.authorizerId
            }
        }

        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS
            }
        }

        const spacesResource = api.root.addResource('spaces', optionsWithCors);
        spacesResource.addMethod('GET', props.spacesLambdaIntegration, optionsWithAuth);
        spacesResource.addMethod('POST', props.spacesLambdaIntegration,optionsWithAuth);
        spacesResource.addMethod('PUT', props.spacesLambdaIntegration, optionsWithAuth);
        spacesResource.addMethod('DELETE', props.spacesLambdaIntegration, optionsWithAuth);
    }
}