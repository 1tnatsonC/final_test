//<!-- Chan Hou Ting Constant (21034774d) & Cheung Kwan Yui (21088966D)-->
import fs from 'fs/promises';
import client from './dbclient.js';

async function init_db() {
  try {
    const users = client.db('lab5db').collection('users');

    const count = await users.countDocuments();
    if (count === 0) {
      const userData = await fs.readFile('users.json', 'utf8');
      const usersArray = JSON.parse(userData);
      const result = await users.insertMany(usersArray);
      console.log(`Added ${result.insertedCount} users`);
    }
  } catch (err) {
    console.error('Unable to initialize the database!');
  }
}

init_db().catch(console.dir);

async function validate_user(username, password) {
  try {
    if (!username || !password) {
      return false;
    }

    const users = client.db('lab5db').collection('users');
    const user = await users.findOne({ username, password });

    if (!user) {
      return false;
    }

    return user;
  } catch (err) {
    console.error('Unable to fetch from database!');
    return false;
  }
}

async function update_user(username, nickname, password, role, email, birthdate, enabled) {
  try {
    const users = client.db('lab5db').collection('users');

    const result = await users.updateOne(
      { username },
      { $set: { username, nickname, password, role, email, birthdate, enabled } },
      { upsert: true }
    );

    if (result.upsertedCount === 0) {
      console.log('Added 0 user');
    } else {
      console.log('Added 1 user');
    }

    return true;
  } catch (err) {
    console.error('Unable to update the database!');
    return false;
  }
}

async function fetch_user(username) {
  try {
    const users = client.db('lab5db').collection('users');
    const user = await users.findOne({ username });

    return user;
  } catch (err) {
    console.error('Unable to fetch from database!');
    return false;
  }
}

async function username_exist(username) {
  try {
    const user = await fetch_user(username);
    return Boolean(user);
  } catch (err) {
    console.error('Unable to fetch from database!');
    return false;
  }
}

export { validate_user, update_user, fetch_user, username_exist };
