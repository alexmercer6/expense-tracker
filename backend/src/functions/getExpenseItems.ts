// src/routes/getExpenseItems.ts
import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
  app,
} from '@azure/functions';
import { getExpenseItemsService } from '../services/expenseItemService';

export async function getExpenseItems(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const timePeriod = req.query.get('timePeriod');
    const referenceDate = req.query.get('referenceDate');

    const result = await getExpenseItemsService(timePeriod, referenceDate);

    return {
      status: 200,
      jsonBody: result,
    };
  } catch (error) {
    context.log('Error fetching expense items:', error);
    return {
      status: 500,
      body: 'Error fetching expense items',
    };
  }
}

app.http('getExpenseItems', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'get-expenses',
  handler: getExpenseItems,
});
