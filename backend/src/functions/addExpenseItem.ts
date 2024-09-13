// src/routes/addExpenseItem.ts
import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
  app,
} from '@azure/functions';
import {
  createExpenseItem,
  updateExpenseItemById,
} from '../services/expenseItemService';
import { ExpenseItem } from '../entities/ExpenseItem.entity';

export async function addExpenseItem(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const expenseItemData = (await req.json()) as ExpenseItem;
    const expenseItems = await createExpenseItem(expenseItemData);
    return {
      status: 201,
      jsonBody: { expenseItems },
    };
  } catch (error) {
    context.log('Error adding expense item:', error);
    return {
      status: 500,
      body: 'Error adding expense item',
    };
  }
}

app.http('addExpenseItem', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'add-expense',
  handler: addExpenseItem,
});
