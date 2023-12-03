//<!-- Chan Hou Ting Constant (21034774d) & Cheung Kwan Yui (21088966D)-->
import express from 'express';
import multer from 'multer';
import { validate_user, update_user, fetch_user, username_exist } from './userdb.js';

var route = express.Router();
var form = multer();

route.post('/login', form.none(), async (req, res) => {
  var { username, password } = req.body;
  var user = await validate_user(username, password);

  //if (user && !user.enabled) {
  //res.status(401).json({
  //status: 'failed',
  //message: 'User `bob` is currently disabled', // Only username "bob" can't login
  //});
  //} else if (user && user.enabled) {
  if (user) {
    req.session.username = user.username;
    req.session.role = user.role;
    req.session.password = user.password;
    req.session.nickname = user.nickname;
    req.session.email = user.email;
    req.session.birthdate = user.birthdate;
    req.session.logged = true;
    req.session.timestamp = Date.now();

    res.json({
      status: 'success',
      user: {
        username: user.username,
        role: user.role,
        nickname:user.nickname,
        email: user.email,
        birthdate: user.birthdate,
        password: user.password,
      },
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Incorrect username and password',
    });
  }
});

route.post('/logout', async (req, res) => {
  if (req.session.logged) {
    req.session.destroy();
    res.end();
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized_logout',
    });
  }
});

route.get('/me', async (req, res) => {
  if (req.session.logged) {
    var user = await fetch_user(req.session.username);

    res.json({
      status: 'success',
      user: {
        username: user.username,
        role: user.role,
        nickname: user.nickname,
        email: user.email,
        birthdate: user.birthdate,
        password: user.password,
      },
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized_login',
    });
  }
});

route.post('/register', form.none(), async (req, res) => {
  var { username, nickname, password, role, email, birthdate } = req.body;

  if (!username || !password || !email || !birthdate || !nickname) {
    res.status(400).json({
      status: 'failed',
      message: 'Missing fields',
    });
    return;
  }

  if (username.length < 3) {
    res.status(400).json({
      status: 'failed',
      message: 'Username must be at least 3 characters',
    });
    return;
  }

  if (await username_exist(username)) {
    res.status(400).json({
      status: 'failed',
      message: `Username ${username} already exists`,
    });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      status: 'failed',
      message: 'Password must be at least 8 characters',
    });
    return;
  }

  if (role !== 'male' && role !== 'female') {
    res.status(400).json({
      status: 'failed',
      message: 'Role can only be either `Male` or `Female`',
    });
    return;
  }

  var success = await update_user(username, nickname, password, role, email, birthdate);

  if (success) {
    res.json({
      status: 'success',
      user: {
        username: username,
        nickname: nickname,
        password: password,
        email: email,
        birthdate: birthdate,
        role: role,
      },
    });
  } else {
    res.status(500).json({
      status: 'failed',
      message: 'Account created but unable to save into the database',
    });
  }
});

export default route;
