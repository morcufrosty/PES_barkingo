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
Every query must be called in the endpoint `/api`. Parameters must be passed in the body of the request, using `x-www-form-urlencoded`.
When needed, a token must be in the headers in the parameter name `x-access-token`.

## Endpoints

-   ### POST `/register`

    -   #### Query arameters

        -   email [`required`]: A valid email that the user provided.
        -   name [`required`]: The name of the user, spaces must be expressed with an underscore (`_`).
        -   password [`required`]: The password provided by the user, in plain text.

    -   #### Response
        -   success: Is either true or false.
        -   msg: Short message explaining the causes of the result.

-   ### POST `/login`

    -   #### Query arameters

        -   email [`required`]: A valid email that the user provided.
        -   password [`required`]: The password provided by the user, in plain text.

    -   #### Response
        -   success: Is either true or false.
        -   msg: I case the request was not a successs, this parameter is a short message explaining the causes of the result. If the request was successful, it includes a token that the app must keep for a week and send in every request that needs token based authentication.

-   ### POST `/renewGoogleToken`

    -   #### Query parameters
        -   email [`required`]: A valid email from the Google Account
        -   token [`required`]: A valid Google authenthetication token
    -   #### Response
        -   success: Is either true or false.
        -   msg: Short message explaining the causes of the result.

-   ### POST `/renewFacebookToken`
    -   #### Query parameters
        -   email [`required`]: A valid email from the Facebook Account
        -   token [`required`]: A valid Facebook authenthetication token
    -   #### Response
        -   success: Is either true or false.
        -   msg: Short message explaining the causes of the result.
