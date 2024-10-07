// src/controllers/csvController.ts
import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
  app,
} from '@azure/functions';
import { parseAndSaveCsv } from '../services/parseAndSaveCsv';

export const parseCsvFile = async (
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> => {
  try {
    let csvData = '';
    console.log('FIRE');

    if (req.body instanceof ReadableStream) {
      // Convert ReadableStream to string
      const reader = req.body.getReader();
      let chunk = await reader.read();

      while (!chunk.done) {
        csvData += new TextDecoder().decode(chunk.value);
        chunk = await reader.read();
      }
    } else if (typeof req.body === 'string') {
      // If body is already a string, use it directly
      csvData = req.body;
    } else {
      return {
        status: 400,
        body: 'Invalid CSV data',
      };
    }

    if (!csvData) {
      return {
        status: 400,
        body: 'Invalid CSV data',
      };
    }

    // Call the service to parse and save the CSV data
    await parseAndSaveCsv(csvData);

    return {
      status: 200,
      body: 'CSV data processed successfully',
    };
  } catch (error) {
    context.error('Error processing CSV file:', error);
    return {
      status: 500,
      body: 'Error processing CSV file',
    };
  }
};

// Registering the Azure Function
app.http('parseCsvFile', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'parse-csv',
  handler: parseCsvFile,
});
