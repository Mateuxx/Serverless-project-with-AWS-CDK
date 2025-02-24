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
    
    public readonly helloLambdaIntegration: LambdaIntegration
    
    constructor(scope: Construct, id: string, props?: LambdaStackProps) {
        super(scope, id, props);

        // Data stack resources
        //This function is the one that solve all the problems
       const helloLambda = new NodejsFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_20_X,
            handler: "handler",
            entry: (join(__dirname, '..', '..', 'service', 'hello.ts')),
            environment : {
                TABLE_NAME: props.spacesTable.tableName
            }
        })

        //We need to get some policies to acess the aws s3 resources
        helloLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions:[
                's3:ListAllMyBuckets',
                's3:ListBucket'
            ],
            resources: ["*"] //bad practice, we are getting all 
        }))

        this.helloLambdaIntegration = new LambdaIntegration(helloLambda)
        
    }
    
}