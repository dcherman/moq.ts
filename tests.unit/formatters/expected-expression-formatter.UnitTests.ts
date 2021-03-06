import {GetPropertyExpression} from '../../lib/expressions';
import {ExpressionFormatter} from '../../lib/formatters/expression-formatter';
import {getName} from '../getName';
import {ExpectedExpressionFormatter} from '../../lib/formatters/expected-expression-formatter';

describe('Expected expression message formatter', () => {
    function expressionFormatterFactory(): ExpressionFormatter {
        return jasmine.createSpyObj('expression formatter', [getName<ExpressionFormatter>(instance => instance.format)]);
    }

    it('Returns formatted description for verify message with mock name', ()=> {
        const mockName = 'mockName';
        const timesMessage = 'Should be called once';
        const haveBeenCalledTimes = 2;
        const expressionDescription = 'expression description';

        const expression = new GetPropertyExpression('name');
        const expressionFormatter = expressionFormatterFactory();

        (<jasmine.Spy>expressionFormatter.format).and.returnValue(expressionDescription);

        const formatter = new ExpectedExpressionFormatter(expressionFormatter);
        const actual = formatter.format(expression, timesMessage, haveBeenCalledTimes, mockName);

        expect(actual).toBe(`${expressionDescription} of ${mockName} ${timesMessage.toLowerCase()}, but was called ${haveBeenCalledTimes} time(s)`);
        expect(expressionFormatter.format).toHaveBeenCalledWith(expression);
    });

    it('Returns formatted description for verify message without mock name', ()=> {
        const timesMessage = 'Should be called once';
        const haveBeenCalledTimes = 2;
        const expressionDescription = 'expression description';

        const expression = new GetPropertyExpression('name');
        const expressionFormatter = expressionFormatterFactory();

        (<jasmine.Spy>expressionFormatter.format).and.returnValue(expressionDescription);

        const formatter = new ExpectedExpressionFormatter(expressionFormatter);
        const actual = formatter.format(expression, timesMessage, haveBeenCalledTimes);

        expect(actual).toBe(`${expressionDescription} ${timesMessage.toLowerCase()}, but was called ${haveBeenCalledTimes} time(s)`);
        expect(expressionFormatter.format).toHaveBeenCalledWith(expression);
    });

});