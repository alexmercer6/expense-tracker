// src/routes/addExpenseItem.ts
import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
  app,
} from '@azure/functions';
import {
  createExpenseItem,
  createExpenseItems,
  updateExpenseItemById,
} from '../services/expenseItemService';
import { ExpenseItem } from '../entities/ExpenseItem.entity';

export async function addExpenseItems(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const expenseItemData = (await req.json()) as ExpenseItem[];
    const expenseItems = await createExpenseItems(expenseItemData);
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

app.http('addExpenseItems', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'add-expenses',
  handler: addExpenseItems,
});
