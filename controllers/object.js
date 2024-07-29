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
      console.log('req.params: ', JSON.stringify(req.params));
      console.log('req.body: ', JSON.stringify(req.body));
    }

    const { objectKey } = req.params;
    const { file } = req.body;

    const obsPutRequest = {
      Bucket: process.env.HUAWEI_OBS_BUCKET_NAME,
      Key: objectKey,
      ContentType: file.mimetype,
      Body: file.buffer
    };

    if (debug) {
      console.log('obsPutRequest: ', JSON.stringify(obsPutRequest));
    }

    const obsPutResponse = await obsClient.putObject(obsPutRequest);

    if (debug) {
      console.log('obsPutResponse: ', JSON.stringify(obsPutResponse));
    }

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
      console.log('req.params: ', JSON.stringify(req.params));
      console.log('req.body: ', JSON.stringify(req.body));
    }

    const { objectKey } = req.params;
    const { expiresInSeconds } = req.body;

    const obsGetRequest = {
      Method: 'GET',
      Bucket: process.env.HUAWEI_OBS_BUCKET_NAME,
      Key: objectKey,
      Expires: expiresInSeconds
    };

    if (debug) {
      console.log('obsGetRequest: ', JSON.stringify(obsGetRequest));
    }

    const obsGetResponse = obsClient.createSignedUrlSync(obsGetRequest);

    if (debug) {
      console.log('obsGetResponse: ', JSON.stringify(obsGetResponse));
    }

    res.status(200)
      .json(obsGetResponse);
  };
};
