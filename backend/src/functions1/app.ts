// src/app.ts
// import { app } from '@azure/functions';

// import { getExpenseItem, getExpenseItems } from '../functions/getExpenseItem';
// import { addExpenseItem, updateExpenseItem } from '../functions/addExpenseItem';
// import { deleteExpenseItem } from '../functions/deleteExpenseItem';

// Register HTTP routes for Azure Functions
// app.http('getExpenseItems', {
//   methods: ['GET'],
//   authLevel: 'anonymous',
//   route: 'get-expenses',
//   handler: getExpenseItems,
// });

// app.http('get-expense:id', {
//   methods: ['GET'],
//   authLevel: 'anonymous',
//   handler: getExpenseItem,
// });

// app.http('add-expense', {
//   methods: ['POST'],
//   authLevel: 'anonymous',
//   handler: addExpenseItem,
// });

// app.http('update-expense', {
//   methods: ['POST'],
//   authLevel: 'anonymous',
//   handler: updateExpenseItem,
// });

// app.http('delete-expense', {
//   methods: ['POST'],
//   authLevel: 'anonymous',
//   handler: deleteExpenseItem,
// });
