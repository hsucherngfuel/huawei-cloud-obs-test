/*=============================================================================
  Imports
=============================================================================*/

import { Readable } from 'node:stream';

/*=============================================================================
  Put Object
=============================================================================*/

export const makePutObject = (obsClient) => {
  return async (req, res) => {
    const debug = process.env.DEBUG === 'true';

    if (debug) {
      console.dir('req: ', req);
    }

    const obsPutRequest = {
      Bucket: process.env.HUAWEI_OBS_BUCKET_NAME,
      Key: req.params.objectKey,
      ContentType: req.file.mimetype,
      Body: Readable.from(file.buffer)
    };

    if (debug) {
      console.dir('obsPutRequest: ', obsPutRequest);
    }

    const obsPutResponse = await obsClient.putObject(obsPutRequest);

    res.status(200)
      .json(obsPutResponse);
  };
};

/*=============================================================================
  Get Object
=============================================================================*/

export const makeGetObject = (obsClient) => {
  return async (req, res) => {
    const debug = process.env.DEBUG === 'true';

    if (debug) {
      console.dir('req: ', req);
    }

    const obsGetRequest = {
      Method: 'POST',
      Bucket: process.env.HUAWEI_OBS_BUCKET_NAME,
      Key: req.params.objectKey,
      Expires: req.expiresInSeconds
    };

    if (debug) {
      console.dir('obsGetRequest: ', obsGetRequest);
    }

    const obsGetResponse = obsClient.createSignedUrlSync(obsGetRequest);

    res.status(200)
      .json(obsGetResponse);
  };
};
