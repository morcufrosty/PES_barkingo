# Barkingo API server

## Table of Contents

1. [Running](#running)
2. [API Usage](#API-Usage)
3. [Endpoints](#endpoints)
   3.1

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

### Login and Register

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
        -   msg: In case the request was not a successs, this parameter is a short message explaining the causes of the result. If the request was successful, it also includes a token that the app must keep for a day (as it's only vlaid for such time) and send in every request that needs token based authentication.

-   ### POST `/renewGoogleToken`

    -   #### Query parameters
        -   email [`required`]: A valid email from the Google Account
        -   token [`required`]: A valid Google authenthetication token
        -   name [`required`]: The name of the user, spaces must be expressed with an underscore (`_`).
    -   #### Response
        -   success: Is either true or false.
        -   msg: In case the request was not a successs, this parameter is a short message explaining the causes of the result. If the request was successful, it also includes a token that the app must keep for a day (as it's only vlaid for such time) and send in every request that needs token based authentication.

-   ### POST `/renewFacebookToken`

    -   #### Query parameters

        -   email [`required`]: A valid email from the Facebook Account
        -   token [`required`]: A valid Facebook authenthetication token
        -   name [`required`]: The name of the user, spaces must be expressed with an underscore (`_`).

    -   #### Response
        -   success: Is either true or false.
        -   msg: In case the request was not a successs, this parameter is a short message explaining the causes of the result. If the request was successful, it also includes a token that the app must keep for a day (as it's only vlaid for such time) and send in every request that needs token based authentication.

### View, edit and interact with offers

-   ### GET `/offers`
    -   #### Query parameters
        -   type [`optional`]: can either be `adoption` o `foster`.
        -   race [`optional`]: race of the animals to be displayed.

    -   ### Response
        -   `offers`: list containing the offers that match the given search parameters, with the following attributes for each item.
            -   `id`: identifier of the animal, which will be used in further requests.
            -   `name`: name of the animal.
            -   `species`: species of the animal in the offer.
            -   `photURL`: URL of the photo of the animal to be displayed.

-   ### GET `/offers/:id`
    -   ### Query parameters
        -   `id`: identifier of the requested offer.

    -   ### Response
        -   `id`: identifier of the offered animal, same as provided by the user.
        -   `name`: name of the animal.
        -   `type`: type of offer, which can be `adoption` o `foster`
        -   `species`: species of the animal in the offer.
        -   `race`: if the animal's species is that of a dog or a cat, this field will contain its race.
        -   `sex`: sex of the animal.
        -   `age`: age of the animal.
        -   `iniDate`: if the offer is of type `foster` this will indicate the date in which the animal would be fostered.
        -   `endDate`: if the offer is of type `foster` this will indicate the date in which the animal will end its fostering.
        -   `nameOwner`: name of the owner of the offered animal
        -   `emailOwner`: email of the owner of the offered animal

-   ### POST `/offers/:id`
    -   ### Query parameters
        -   swipe[`required`]: specifies the swipe action direction on the offer. 