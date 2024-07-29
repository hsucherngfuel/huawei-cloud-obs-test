import express from 'express';
import { makePutObject, makeGetObject } from '../controllers/object.js';

export const makeObjectRouter = (obsClient) => {
  const router = express.Router();
  const putObject = makePutObject(obsClient);
  const getObject = makeGetObject(obsClient);

  router.put('/object/:objectKey', putObject);
  router.post('/object/:objectKey', getObject);

  return router;
};
