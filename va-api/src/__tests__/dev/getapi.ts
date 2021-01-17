/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http = require('http');
const fs = require('fs');

async function downloadOpenAPISpec(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const request = http.get(
        'http://localhost:3000/openapi.json',
        (response: any) => {
          if (response.statusCode !== 200) {
            reject('Error code: ' + response.statusCode);
          }
          response.on('error', (error: any) => {
            reject(error);
          });
          const file = fs.createWriteStream('../openapi.json');
          response.pipe(file).on('finish', () => {
            resolve();
          });
        },
      );
      request.on('error', (err: any) => {
        reject(err);
      });
    } catch (e) {
      reject(e);
    }
  });
}

(async function () {
  try {
    await downloadOpenAPISpec();
    console.log('openapi.json updated');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
