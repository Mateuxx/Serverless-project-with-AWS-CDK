import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { ApiStack } from "./stacks/ApiStack";
import { LambdaStack } from "./stacks/LamdaStack";
import { UiDeploymentStack } from "./stacks/UiDeploymentStack";
import { AuthStack } from "./stacks/AuthStack";

// Main CDK app configuration file that:
// - Creates DynamoDB table (DataStack)
// - Sets up Lambda functions (LambdaStack)
// - Configures API Gateway (ApiStack)
// All stacks are connected to work together as a serverless API
const app = new App();

const dataStack = new DataStack(app, "DataStack");
const lambdaStack = new LambdaStack(app, "LambdaStack", {
  spacesTable: dataStack.spacesTable,
});


const authStack = new AuthStack(app, 'AuthStack');
new ApiStack(app, "ApiStack", {
  spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration,
  userpool: authStack.userPool
});

new UiDeploymentStack(app, "UiDeploymentStack");
