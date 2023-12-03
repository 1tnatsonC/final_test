//<!-- Chan Hou Ting Constant (21034774d) & Cheung Kwan Yui (21088966D)-->
import express from 'express';
import session from 'express-session';
import login from './login.js';
import bodyParser from 'body-parser';
import mongostore from 'connect-mongo';
import dbclient from './dbclient.js';
import path from 'path';


var app = express();

var port = 8080;


app.use(
  session({
    secret: '21034774d_eie4432_lab4',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
    store: mongostore.create({
      client: dbclient,
      dbName: 'lab5db',
      collectionName: 'session',
    }),
  })
);

app.get('/', (req, res) => {
  if (req.session.logged) {
    res.redirect('/index.html');
  } else {
    res.redirect('/login.html');
  }
});

app.listen(port, () => {
  const currentDate = new Date().toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' });
  console.log('Server started at http://127.0.0.1:' + port);
  console.log('Current date and time in HKT:', currentDate);
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', login);

app.use('/', express.static(path.join(process.cwd(), '/static')));
