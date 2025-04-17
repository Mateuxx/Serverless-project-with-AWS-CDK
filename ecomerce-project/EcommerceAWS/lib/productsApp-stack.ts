import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class ProductsAppStack extends Stack {
  // referencia da lambda dentro dessa stack 
  //exportar função para usar em outra stack ou passa por uma api gateway (o que é o que queremos aqui!!!)
  readonly prodructsFetchHandler: lambdaNodeJS.NodejsFunction;

  // scope - onde vai ser inserido
  // props - algumas propriedades
  // id a id dessa parada memo
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.prodructsFetchHandler = new lambdaNodeJS.NodejsFunction(
      this,
      "ProductsFetchFunction",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        functionName: "ProductsFetchFunction",
        entry: "lambda/products/productsFetchFunction.ts", //caminho de aonde está a minha lambda de fatoo
        handler: "handler",
        memorySize: 512, // memoria que a funcção lamda tem que ter
        timeout: Duration.seconds(5),
        bundling: {
          minify: true, //deixar a função lambda mais otimizada possivel
          sourceMap: false,
        },
      }
    );
  }
}
