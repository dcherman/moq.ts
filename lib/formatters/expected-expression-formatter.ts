import {ExpectedExpressions} from '../expected-expressions/expected-expressions';
import {ExpressionFormatter} from './expression-formatter';
import {expressionFormatterFactory} from './factories';

export function expectedExpressionFormatterFactory (): ExpectedExpressionFormatter {
    return new ExpectedExpressionFormatter(expressionFormatterFactory());
}

export class ExpectedExpressionFormatter {

    constructor(private expressionFormatter: ExpressionFormatter) {

    }

    public format(expected: ExpectedExpressions<any>, timesMessage: string, haveBeenCalledTimes: number, mockName?: string): string {
        const expressionDescription = this.expressionFormatter.format(expected);
        const mockDescription = mockName !== undefined ? ` of ${mockName}` : '';
        return `${expressionDescription}${mockDescription} ${timesMessage.toLowerCase()}, but was called ${haveBeenCalledTimes} time(s)`;
    }
}