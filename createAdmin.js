import dbConnect from './api/_lib/db.js';
import { Admin } from './api/_lib/models.js';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Connected.');

    const username = 'Rgp_01@05hi';
    const password = 'S#yU@12_16r';

    const existingAdminsCount = await Admin.countDocuments();
    if (existingAdminsCount > 0) {
      console.log('An admin account already exists. Aborting to prevent multiple admins.');
      process.exit(1);
    }

    console.log('Hashing password and creating admin user...');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    console.log(`Admin account created successfully for username: ${username}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
