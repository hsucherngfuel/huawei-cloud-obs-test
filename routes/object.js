import express from 'express';
import { makePutObject, makeGetObject, makeGetSignedUrl } from '../controllers/object.js';

export const makeObjectRouter = (obsClient) => {
  const router = express.Router();
  const putObject = makePutObject(obsClient);
  const getSignedUrl = makeGetSignedUrl(obsClient);
  const getObject = makeGetObject(obsClient);

  router.put('/object/:objectKey', putObject);
  router.get('/object/:objectKey', getObject);
  router.post('/object/signedurl/:objectKey', getSignedUrl);

  return router;
};
