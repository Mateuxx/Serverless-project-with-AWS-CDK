import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function as LambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';

export class LambdaStack extends Stack {
    
    public readonly helloLambdaIntegration: LambdaIntegration
    
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Data stack resources
       const helloLambda = new LambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_20_X,
            handler: "hello.main",
            code: Code.fromAsset(join(__dirname, '..', '..', 'service'))
        })

        this.helloLambdaIntegration = new LambdaIntegration(helloLambda)
        
    }
    
}