import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

const serviceAccountPath = path.join(
  process.cwd(),
  'serviceAccountKey.json'
);

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error('❌ serviceAccountKey.json not found');
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, 'utf8')
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestore = admin.firestore();

