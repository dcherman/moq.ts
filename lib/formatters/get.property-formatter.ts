import {GetPropertyExpression} from '../expressions';

export class GetPropertyExpressionFormatter{

    public format(expression: GetPropertyExpression): string{
        return `Getter of \'${expression.name}\'`;
    }
}