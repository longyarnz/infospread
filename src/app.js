import 'babel-polyfill';
import path from 'path';
import Data from './data';
import multer from 'multer';
import express from 'express';
import bodyParser from 'body-parser';
import parseQuery from './parseQuery'
import * as rootValue from './server/models';
import typeDefs from './server/schema';
import resolvers from './server/resolvers';
import graphHTTP from "express-graphql";
import { makeExecutableSchema } from 'graphql-tools';
import clearConsole from 'react-dev-utils/clearConsole';
const PORT = process.env.PORT, HOST = '0.0.0.0';
const schema = makeExecutableSchema({ typeDefs, resolvers });
const App = express();
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images/'),
  filename: (req, file, cb) => {
    const prefix = Date.now().toString().slice(0, 8);
    return cb(null, `${prefix}_${file.originalName}`);
  }
});
App.use(express.static('build'));
App.use(express.static('images'));
App.get('/populate', async (req, res) => {
  const data = await Data();
  return res.json(data);
});
App.get('/api/palettes', (req, res) => {
  rootValue.Palette.get({}).then(palettes => {
    rootValue.Palette.disconnect();  
    res.json(palettes);
  })
});
App.get('/api/customers', (req, res) => {
  rootValue.Customer.get({}).then(customers => {
    rootValue.Customer.disconnect();
    res.json(customers);
  })
});
App.get('/api/viewers', (req, res) => {
  rootValue.Viewer.get({}).then(viewers => {
    rootValue.Viewer.disconnect();
    res.json(viewers);
  })
});
App.get('/api/platforms', (req, res) => {
  rootValue.Platform.get({}).then(platforms => {
    rootValue.Platform.disconnect();
    res.json(platforms);
  })
});
App.post('/upload', multer({ storage }).any(), (req, res) => res('OK'));
App.post('/spread', bodyParser.json({extended: true}), parseQuery, graphHTTP({ schema, rootValue, pretty: true }), (req, res) => {
  console.log(req);
  res.send("yes");
});
App.listen(PORT, HOST, () => {
  clearConsole();
  console.log(`Server Listening at http://${HOST}:${PORT}`);
});