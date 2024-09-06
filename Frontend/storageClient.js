// storageClient.ts
import { Storage } from '@google-cloud/storage';
import path from 'path';

// Path to your service account key file
const keyFilename = path.join(__dirname, 'service-key.json');

const storage = new Storage({ keyFilename });

// Replace 'your-bucket-name' with your actual bucket name
const bucket = storage.bucket('novacode');

export { bucket };
