import cors from 'cors';
import path from 'path';
import Data from './data';
import assert from 'assert';
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
const PORT = process.env.PORT || 4002, HOST = '127.0.0.1' || '0.0.0.0';
const schema = makeExecutableSchema({ typeDefs, resolvers });
const App = express();
const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    const prefix = Date.now().toString().slice(0, 8);
    return cb(null, `${prefix}_${file.originalName}`);
  }
});
App.use(express.static('build'));
App.use(express.static('images'));
App.get('/populate', (req, res) => res.json(Data()));
App.get('/', cors(), (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')));
App.get('/api/palettes', (req, res) => {
  rootValue.Palette.get({}, null, null, (err, palettes) => {
    assert.equal(err, null);
    res.send(palettes);
  })
});
App.get('/api/customers', (req, res) => {
  rootValue.Customer.get({}, null, null, (err, customers) => {
    assert.equal(err, null);
    rootValue.Customer.disconnect();
    res.json(customers);
  })
});
App.get('/api/audience', (req, res) => {
  rootValue.Audience.get({}, null, null, (err, audience) => {
    assert.equal(err, null);
    res.send(audience);
  })
});
App.get('/api/platforms', (req, res) => {
  rootValue.Platform.get({}, null, null, (err, platforms) => {
    assert.equal(err, null);
    rootValue.Platform.disconnect();
    res.send(platforms);
  })
});
App.post('/upload', multer({ storage }).any(), (req, res) => res('OK'));
App.post('/graphql', bodyParser(), parseQuery, graphHTTP({ schema, rootValue, pretty: true }));
App.listen(PORT, HOST, () => {
  clearConsole();
  console.log(`Server Listening at http://${HOST}:${PORT}`);
});