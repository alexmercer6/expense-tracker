// src/routes/getExpenseItems.ts
import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
  app,
} from '@azure/functions';
import { getExpenseItemById } from '../services/expenseItemService';

export async function getExpenseItem(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const items = await getExpenseItemById(Number(req.params.id));
    return {
      status: 200,
      jsonBody: { expenseItems: items },
    };
  } catch (error) {
    context.log('Error fetching expense items:', error);
    return {
      status: 500,
      body: 'Error fetching expense items',
    };
  }
}

app.http('getExpenseItem', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'get-expense:id',
  handler: getExpenseItem,
});
