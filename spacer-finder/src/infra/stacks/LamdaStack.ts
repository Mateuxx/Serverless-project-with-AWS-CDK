import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Runtime} from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
    spacesTable: ITable
}   

export class LambdaStack extends Stack {
    
    public readonly spacesLambdaIntegration: LambdaIntegration
    
    constructor(scope: Construct, id: string, props?: LambdaStackProps) {
        super(scope, id, props);

       const spacesLambda = new NodejsFunction(this, 'SpacesLambda', {
            runtime: Runtime.NODEJS_20_X,
            handler: "handler",
            entry: (join(__dirname, '..', '..', 'service', 'spaces', 'handler.ts')),
            environment : {
                TABLE_NAME: props.spacesTable.tableName
            }
        });

        // we are giving the permissions that our lambda que get to do things
        spacesLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources:[props.spacesTable.tableArn],
            //actions that our lambda can have on spacesTable DB
            actions: [
                'dynamodb:PutItem',
                'dynamodb:Scan',
                'dynamodb:GetItem',
                'dynamodb:UpdateItem',
                'dynamodb:DeleteItem'
            ]
        }))

        this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda)
        
    }
    
} 