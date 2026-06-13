import dbConnect from '../api/_lib/db.js';
import { Contact } from '../api/_lib/models.js';

async function run() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Connected successfully!');

    const testContact = new Contact({
      name: 'Test Rudra',
      email: 'test@example.com',
      subject: 'Test Integration',
      message: 'This is a test submission from the scratch test runner.',
      project_type: 'Web App'
    });

    console.log('Saving test contact...');
    const saved = await testContact.save();
    console.log('Saved successfully! ID:', saved._id);

    // Clean up test entry
    console.log('Cleaning up test contact...');
    await Contact.deleteOne({ _id: saved._id });
    console.log('Cleaned up successfully. Database connection is fully operational!');
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

run();
