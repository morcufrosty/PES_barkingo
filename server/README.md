# Barkingo API server

## Table of Contents

1. [Running](#running)
2. [API Usage](#API-Usage)
3. [Endpoints](#endpoints)
    - [Login and Register](#Login-and-Register)
    - [View, edit and interact with offers](#View,-edit-and-interact-with-offers)

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
Every query must be called in the endpoint `/api`. Parameters must be passed in the body of the request, using `x-www-form-urlencoded` as , or the query parameters.
When needed, a token must be in the headers in the parameter name `x-access-token`.

Animal species:

-   0: dog
-   1: cat
-   2: fish
-   3: reptile
-   4: bird
-   5: other

## Endpoints

### Login and Register

-   ### POST `/register`

    -   #### Query arameters

        -   `email` [`required`]: A valid email that the user provided.
        -   `name` [`required`]: The name of the user, spaces must be expressed with an underscore (`_`).
        -   `password` [`required`]: The password provided by the user, in plain text.

    -   #### Response
        -   `success`: Is either true or false.
        -   `msg`: Short message explaining the causes of the result.

-   ### POST `/login`

    -   #### Query arameters

        -   `email` [`required`]: A valid email that the user provided.
        -   `password` [`required`]: The password provided by the user, in plain text.

    -   #### Response
        -   `success`: Is either true or false.
        -   `msg`: In case the request was not a successs, this parameter is a short message explaining the causes of the result. If the request was successful, it also includes a token that the app must keep for a day (as it's only vlaid for such time) and send in every request that needs token based authentication.

-   ### POST `/renewGoogleToken`

    -   #### Query parameters
        -   `email` [`required`]: A valid email from the Google Account
        -   `token` [`required`]: A valid Google authenthetication token
        -   `name` [`required`]: The name of the user, spaces must be expressed with an underscore (`_`).
    -   #### Response
        -   `success`: Is either true or false.
        -   `msg`: In case the request was not a successs, this parameter is a short message explaining the causes of the result. If the request was successful, it also includes a token that the app must keep for a day (as it's only vlaid for such time) and send in every request that needs token based authentication.

-   ### POST `/renewFacebookToken`

    -   #### Query parameters

        -   `email` [`required`]: A valid email from the Facebook Account
        -   `token` [`required`]: A valid Facebook authenthetication token
        -   `name` [`required`]: The name of the user, spaces must be expressed with an underscore (`_`).

    -   #### Response
        -   `success`: Is either true or false.
        -   `msg`: In case the request was not a successs, this parameter is a short message explaining the causes of the result. If the request was successful, it also includes a token that the app must keep for a day (as it's only vlaid for such time) and send in every request that needs token based authentication.

-   ### GET `/user`: returns information about the logged-in user.
    -   #### Query parameters
        -   `token` [`required`]: Barkingo authenthetication token
    -   #### Response
        -   `id`: identifier of the user
        -   `email`: A valid email from the Facebook Account
        -   `name`: The name of the user, spaces must be expressed with an underscore (`_`).
        -   `success`: Is either true or false.
        -   `msg`: Short message explaining the causes of the result.

### View, edit and interact with offers

-   ### GET `/offers`: returns all the offers given some search paramters

    -   #### Query parameters

        -   `type` [`optional`]: can either be `adoption` o `foster`.
        -   `race` [`optional`]: race of the animals to be displayed.

    -   ### Response
        -   `offers`: list containing the offers that match the given search parameters, with the following attributes for each element.
            -   `id`: identifier of the animal, which will be used in further requests.
            -   `name`: name of the animal.
            -   `sex`: sex of the offered animal.
            -   `species`: species of the animal in the offer.
            -   `offerType`: type of the offer

-   ### POST `/offers`: creates a new offer

    -   #### Query parameters
        -   `name` [`required`]: name of the animal.
        -   `type` [`required`]: type of offer, which can be `0` (`adoption`) or `1` (`foster`)
        -   `race` [`required`]: race of the animal in the offer, which in turn identifies its species.
        -   `sex` [`required`]: sex of the animal, can be `Male` or `Female`.
        -   `age` [`required`]: age of the animal.
        -   `description` [`required`]: description of the offer.
        -   `iniDate` [`unavailable`]: if the offer is of type `foster` this will indicate the date in which the animal would be fostered.
        -   `endDate` [`unavailable`]: if the offer is of type `foster` this will indicate the date in which the animal will end its fostering.
    -   #### Response
        -   `id`: Identifier of the newly created offer.
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### GET `/offers/:id`: returns information about a single offer

    -   ### Query parameters

        -   `id` [`required`]: identifier of the requested offer.

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
        -   `nameOwner`: name of the owner of the offered animal.
        -   `emailOwner`: email of the owner of the offered animal.

-   ### POST `/offers/:id`

    -   #### Query parameters
        -   `name` [`optional`]: name of the animal.
        -   `type` [`optional`]: type of offer, which can be `0` (`adoption`) or `1` (`foster`)
        -   `race` [`optional`]: race of the animal in the offer, which in turn identifies its species.
        -   `sex` [`optional`]: sex of the animal, can be `Male` or `Female`.
        -   `age` [`optional`]: age of the animal.
        -   `description` [`optional`]: description of the offer.
        -   `iniDate` [`optional`]: if the offer is of type `foster` this will indicate the date in which the animal would be fostered.
        -   `endDate` [`optional`]: if the offer is of type `foster` this will indicate the date in which the animal will end its fostering.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### PUT `/offers/:id`

    -   #### Query parameters
        -   swipe [`required`]: specifies the swipe action direction on the offer, which can be `left` or `right`. This will decide if the offer gets added to the favourite list (viewable by the user) or the discarded list.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is `false`, short message explaining the causes of the error. If not, contains success message.

-   ### DELETE `/offers/:id`: delete an offer. To do so you must be its creator.

    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### GET `/myOffers`: returns all the given user's offers

    -   #### Query parameters
        -   `id` [`required`]: id of the user.

    -   #### Response
        -   `offers`: list containing the offers that match the given search parameters, with the following attributes for each element.
            -   `id`: identifier of the animal, which will be used in further requests.
            -   `name`: name of the animal.
            -   `description`: description of the offer.
            -   `sex`: sex of the offered animal.
            -   `species`: species of the animal in the offer.

-   ### GET `/favouriteOffers`: returns all the given user's favourite offers
    -   #### Query parameters

-   ### POST `/offers/:id`: swipe on an offer
    -   #### Query parameters
        -   `direction`: direction of the swipe action, can only be `right` or `left`
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### GET `/offers/:id/image`
    -   #### Response
        -   JPG file of the requested image.

-   ### POST `/offers/:id/image`
    -   #### Query parameters
        -   `image`[`required`]: image file in jpg format, passed through form-data.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.