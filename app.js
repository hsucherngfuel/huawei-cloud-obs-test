/*=============================================================================
  Setup & Variables
=============================================================================*/

import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { errorHandlerMiddleware } from './middleware/error-handler.js'
import ObsClient from 'esdk-obs-nodejs';
import { makeObjectRouter } from './routes/object.js';

const app = express();
const obsClient = new ObsClient({
  access_key_id: process.env.HUAWEI_OBS_ACCESS_KEY_ID,
  secret_access_key: process.env.HUAWEI_OBS_SECRET_ACCESS_KEY,
  server: process.env.HUAWEI_OBS_SERVER,
});

obsClient.setBucketCors({
  Bucket: process.env.HUAWEI_OBS_BUCKET_NAME,
  CorsRules: [
    {
      ID: 'corsrule1',
      AllowedMethod: ['PUT', 'GET', 'POST'],
      AllowedOrigin: [process.env.POC_ORIGIN]
    }
  ]
})

/*=============================================================================
  Pre-Middlewares
=============================================================================*/

app.use(express.json({
  limit: '5mb'
}));

/*=============================================================================
  Routes
=============================================================================*/

/*---- Basic placeholder route to show that the API works ----*/

app.get('/', (req, res) => {
  res.send('POC Huawei Cloud API works!');
});

/*---- Organised routes ----*/

const objectRouter = makeObjectRouter(obsClient);

app.use('/api/', objectRouter);

/*=============================================================================
  Post-Middlewares
=============================================================================*/

app.use(errorHandlerMiddleware);

/*=============================================================================
  Execute
=============================================================================*/

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
