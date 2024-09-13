// src/routes/deleteExpenseItem.ts
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import { deleteExpenseItemById } from '../services/expenseItemService';

export async function deleteExpenseItem(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const id = Number(req.query.get('id'));
    const success = await deleteExpenseItemById(id);
    if (!success) {
      return {
        status: 404,
        body: 'Expense item not found',
      };
    }
    return {
      status: 200,
      body: 'Expense item deleted successfully',
    };
  } catch (error) {
    return {
      status: 500,
      body: 'Error deleting expense item',
    };
  }
}

app.http('deleteExpense', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'delete-expense',
  handler: deleteExpenseItem,
});
