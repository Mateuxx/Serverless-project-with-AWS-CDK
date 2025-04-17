import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DataStack extends Stack {
    
    //interface that represents a table in the DynamoDB
    //Type is Itable cause can be used in other stacks, but no changed
    public readonly spacesTable: ITable

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        //Creates de the table of DynamoDB
        this.spacesTable =  new Table(this, "SpacesTable", {
            partitionKey : {
                name: 'id',
                type: AttributeType.STRING //type of the partitionKey
            },
            tableName : 'SpaceStack'
        })

    }
    
}