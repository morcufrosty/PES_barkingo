# Barkingo API server

## Table of Contents

1. [Running](#running)
2. [API Usage](#API-Usage)
3. [Endpoints](#endpoints)

## Running

First install the node modules with npm:

```
npm i
```

To run the server (note the server the will run on port 80, so it might need root access) run

```
npm start
```

## API usage

The server runs on address `10.4.41.164` in the FIB network.
Every query must be called in the endpoint `/api`. Parameters must be passed in the folloring manner, for example: `/api/register?email=test@example.com&name=Jon_Baker&password=12345`.

## Endpoints

-   ### POST `/register`

    -   #### Parameters

        -   email [`required`]: A valid email that the user provided.
        -   name [`required`]: The name of the user, spaces must be expressed with an underscore (`_`).
        -   password [`required`]: The password provided by the user, in plain text.

    -   #### Response
        -   result: Can either be `error` or `result`.
        -   msg: Short message explaining the causes of the result.

-   ### POST `/renewGoogleToken`

    -   #### Parameters
        -   email [`required`]: A valid email from the Google Account
        -   token [`required`]: A valid Google authenthetication token
    -   #### Response
        -   result: Can either be `error` or `result`.
        -   msg: Short message explaining the causes of the result.

-   ### POST `/renewFacebookToken`
    -   #### Parameters
        -   email [`required`]: A valid email from the Facebook Account
        -   token [`required`]: A valid Facebook authenthetication token
    -   #### Response
        -   result: Can either be `error` or `result`.
        -   msg: Short message explaining the causes of the result.
