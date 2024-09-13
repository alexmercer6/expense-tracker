import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
  app,
} from '@azure/functions';
import { ExpenseItem } from '../entities/ExpenseItem.entity';
import { updateExpenseItemById } from '../services/expenseItemService';

export async function updateExpenseItem(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const expenseItemData = (await req.json()) as ExpenseItem;
    const id = Number(req.query.get('id'));
    const updatedItems = await updateExpenseItemById(id, expenseItemData);
    if (!updatedItems) {
      return {
        status: 404,
        body: 'Expense item not found',
      };
    }
    return {
      status: 200,
      jsonBody: { expenseItems: updatedItems },
    };
  } catch (error) {
    return {
      status: 500,
      body: 'Error updating expense item',
    };
  }
}

app.http('updateExpenseItem', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'update-expense',
  handler: updateExpenseItem,
});
