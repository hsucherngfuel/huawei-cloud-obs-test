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

    const obsPutObjectRequest = {
      Bucket: process.env.HUAWEI_OBS_BUCKET_NAME,
      Key: objectKey,
      ContentType: file.mimetype,
      Body: Readable.from(Buffer.from(file.buffer, 'base64'))
    };

    if (debug) {
      console.log('obsPutObjectRequest: ', JSON.stringify(obsPutObjectRequest));
    }

    const obsPutObjectResponse = await obsClient.putObject(obsPutObjectRequest);

    if (debug) {
      console.log('obsPutObjectResponse: ', JSON.stringify(obsPutObjectResponse));
    }

    res.status(200)
      .json(obsPutObjectResponse);
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
    }

    const { objectKey } = req.params;

    let obsGetObjectRequest = {
      Bucket: process.env.HUAWEI_OBS_BUCKET_NAME,
      Key: objectKey,
    };

    if (debug) {
      console.log('obsGetObjectRequest: ', JSON.stringify(obsGetObjectRequest));
    }

    const obsGetObjectResponse = await obsClient.getObject(obsGetObjectRequest);

    obsGetObjectResponse.InterfaceResult.Content = obsGetObjectResponse.InterfaceResult.Content.toString('base64');

    if (debug) {
      console.log('obsGetObjectResponse: ', JSON.stringify(obsGetObjectResponse));
    }

    res.status(200)
      .json(obsGetObjectResponse);
  };
};


/*=============================================================================
  Get Signed URL
=============================================================================*/

export const makeGetSignedUrl = (obsClient) => {
  return async (req, res) => {
    const debug = process.env.DEBUG === 'true';

    if (debug) {
      console.log('req.params: ', JSON.stringify(req.params));
      console.log('req.body: ', JSON.stringify(req.body));
    }

    const { objectKey } = req.params;
    const { expiresInSeconds, saveAsFile } = req.body;
    const obsSignedUrlRequest = {
      Method: 'GET',
      Bucket: process.env.HUAWEI_OBS_BUCKET_NAME,
      Key: objectKey,
      Expires: expiresInSeconds,
      Headers: {
        'Access-Control-Allow-Origin': process.env.POC_ORIGIN
      }
    };

    if (debug) {
      console.log('obsSignedUrlRequest: ', JSON.stringify(obsSignedUrlRequest));
    }

    const obsGetSignedUrlResponse = obsClient.createSignedUrlSync(obsSignedUrlRequest);

    if (debug) {
      console.log('obsGetSignedUrlResponse: ', JSON.stringify(obsGetSignedUrlResponse));
    }

    res.status(200)
      .json(obsGetSignedUrlResponse);
  };
};
