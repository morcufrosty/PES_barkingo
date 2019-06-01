# Barkingo API server

## Table of Contents
  * [Running](#running)
  * [API usage](#api-usage)
  * [Endpoints](#endpoints)
  * [Login and Register](#login-and-register)
    + [POST `/users/register`](#post-usersregister)
    + [POST `/users/login`](#post-userslogin)
    + [POST `/users/renewGoogleToken`](#post-usersrenewgoogletoken)
    + [POST `/users/renewFacebookToken`](#post-usersrenewfacebooktoken)
    + [GET `/users/currentUser`: returns short information about the logged-in user.](#get-userscurrentuser-returns-short-information-about-the-logged-in-user)
    + [GET `/users/:id/`: returns information about the requested user.](#get-usersid-returns-information-about-the-requested-user)
    + [POST `/users/:id`: creates a profile for the current user](#post-usersid-creates-a-profile-for-the-current-user)
    + [PUT `/users/:id`: edits the profile for the current user, provided its id](#put-usersid-edits-the-profile-for-the-current-user-provided-its-id)
    + [DELETE `/users/:id`: deletes the profile for the current user, provided its id](#delete-usersid-deletes-the-profile-for-the-current-user-provided-its-id)
    + [GET `/users/:id/image`: obtain profile picture of the requested user](#get-usersidimage-obtain-profile-picture-of-the-requested-user)
    + [POST `/users/:id/image`](#post-usersid-image)
  * [View, edit and interact with offers](#viewedit-and-interact-with-offers)
    + [GET `/offers`: returns all the offers given some search paramters](#get-offers-returns-all-the-offers-given-some-search-paramters)
    + [POST `/offers`: creates a new offer](#post-offers-creates-a-new-offer)
    + [GET `/offers/:id`: returns information about a single offer](#get-offersid-returns-information-about-a-single-offer)
    + [PUT `/offers/:id`: edit an offer](#put-offersid-edit-an-offer)
    + [DELETE `/offers/:id`: delete an offer. To do so you must be its creator.](#delete-offersid-delete-an-offer-to-do-so-you-must-be-its-creator)
    + [POST `/offers/:id/report`: report an offer.](#post-offersid-report-report-an-offer)
    + [GET `/offers/currentUser`: returns all the current user offers, provided the token on the parameters](#get-offers-currentuser-returns-all-the-current-user-offers-provided-the-token-on-the-parameters)
    + [GET `/offers/favourite`: returns all the user's favourite offers](#get-offers-favourite-returns-all-the-users-favourite-offers)
    + [DELETE `/offers/:id/favourite`: deletes offer from favourites](#delete-offersidfavourite-deletes-offer-from-favourites)
    + [POST `/offers/:id`: swipe on an offer](#post-offersid-swipe-on-an-offer)
    + [GET `/offers/:id/image`](#get-offersid-image)
    + [POST `/offers/:id/image`](#post-offersid-image)
    + [DELETE `/offers/seen`](#delete-offers-seen)
  * [Chat](#chat)
    + [GET `/chats`: obtain the current user's chats.](#get-chats-obtain-the-current-users-chats)
    + [POST `/offers/:id/chat`: creates chat with the owner of the offer.](#post-offersid-chat-creates-chat-with-the-owner-of-the-offer)
    + [DELETE `/chat/:id`: closes a chat.](#delete-chatid-closes-a-chat)
    + [GET `/chat/:id`: gets all the messages from a chat](#get-chatid-gets-all-the-messages-from-a-chat)
  * [Other](#other)
    + [GET `/races`: list of races and its species](#get-races-list-of-races-and-its-species)



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

## Login and Register

-   ### POST `/users/register`

    -   #### Parameters

        -   `email` [`required`]: A valid email that the user provided.
        -   `name` [`required`]: The name of the user, spaces must be expressed with an underscore (`_`).
        -   `password` [`required`]: The password provided by the user, in plain text.

    -   #### Response
        -   `success`: Is either true or false.
        -   `msg`: Short message explaining the causes of the result.

-   ### POST `/users/login`

    -   #### Parameters

        -   `email` [`required`]: A valid email that the user provided.
        -   `password` [`required`]: The password provided by the user, in plain text.

    -   #### Response
        -   `success`: Is either true or false.
        -   `msg`: In case the request was not a successs, this parameter is a short message explaining the causes of the result. If the request was successful, it also includes a token that the app must keep for a day (as it's only vlaid for such time) and send in every request that needs token based authentication.
        -   `token`: Token given to the user.

-   ### POST `/users/renewGoogleToken`

    -   #### Parameters
        -   `email` [`required`]: A valid email from the Google Account
        -   `token` [`required`]: A valid Google authenthetication token
        -   `name` [`required`]: The name of the user, spaces must be expressed with an underscore (`_`).
    -   #### Response
        -   `success`: Is either true or false.
        -   `msg`: In case the request was not a successs, this parameter is a short message explaining the causes of the result. If the request was successful, it also includes a token that the app must keep for a day (as it's only vlaid for such time) and send in every request that needs token based authentication.

-   ### POST `/users/renewFacebookToken`

    -   #### Query parameters

        -   `email` [`required`]: A valid email from the Facebook Account
        -   `token` [`required`]: A valid Facebook authenthetication token
        -   `name` [`required`]: The name of the user, spaces must be expressed with an underscore (`_`).

    -   #### Response
        -   `success`: Is either true or false.
        -   `msg`: In case the request was not a successs, this parameter is a short message explaining the causes of the result. If the request was successful, it also includes a token that the app must keep for a day (as it's only vlaid for such time) and send in every request that needs token based authentication.

-   ### GET `/users/currentUser`: returns short information about the logged-in user.

    -   #### Header
        -   `token` [`required`]: Barkingo authenthetication token
    -   #### Response
        -   `id`: identifier of the user
        -   `email`: A valid email from the Facebook Account
        -   `name`: The name of the user, spaces must be expressed with an underscore (`_`).
        -   `username`: Username of the user
        -   `bio`: Biography of the user
        -   `latitude`: latitude of the user
        -   `longitude`: longitude of the user
        -   `success`: Is either true or false.
        -   `msg`: Short message explaining the causes of the result, only if ended in error.

-   ### GET `/users/:id/`: returns information about the requested user.

    -   #### Path parameters
        -   `id` [`required`]: identifier of the user
    -   #### Response
        -   `id`: identifier of the user
        -   `email`: A valid email from the Facebook Account
        -   `username`: Username of the user
        -   `name`: The name of the user, spaces must be expressed with an underscore (`_`).
        -   `bio`: short description of the user
        -   `latitude`: latitude of the user
        -   `longitude`: longitude of the user
        -   `success`: Is either true or false.
        -   `msg`: Short message explaining the causes of the result, only if ended in error.

-   ### POST `/users/:id`: creates a profile for the current user

    -   #### Header
        -   `token` [`required`]: Barkingo authenthetication token
    -   #### Path parameters
        -   `id` [`required`]: identifier of the requested offer.
    -   #### Parameters
        -   `bio` [`required`]: short description of the user
        -   `latitude` [`required`]: latitude of the user
        -   `longitude` [`required`]: longitude of the user
    -   #### Response
        -   `id`: identifier of the user
        -   `success`: Is either true or false.
        -   `msg`: Short message explaining the causes of the result.

-   ### PUT `/users/:id`: edits the profile for the current user, provided its id

    -   #### Header
        -   `token` [`required`]: Barkingo authenthetication token
    -   #### Path parameters
        -   `id` [`required`]: identifier of the requested offer.
    -   #### Parameters
        -   `username` [`required`]: The username of the user. Any spaces must be expressed with an underscore (`_`).
        -   `bio` [`required`]: short description of the user
        -   `latitude` [`required`]: latitude of the user
        -   `longitude` [`required`]: longitude of the user
    -   #### Response

        -   `id`: identifier of the user
        -   `success`: Is either true or false.
        -   `msg`: Short message explaining the causes of the result.

-   ### DELETE `/users/:id`: deletes the profile for the current user, provided its id

    -   #### Header
        -   `token` [`required`]: Barkingo authenthetication token
    -   #### Path parameters
        -   `id` [`required`]: identifier of the requested offer.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### GET `/users/:id/image`: obtain profile picture of the requested user

    -   #### Path parameters
        -   `id` [`required`]: identifier of the user
    -   #### Response
        -   Profile picture jpg file of the requested user.

-   ### POST `/users/:id/image`

    -   #### Path parameters
        -   `id` [`required`]: identifier of the offer.
    -   #### Parameters
        -   `image`[`required`]: image file in jpg format, passed through form-data.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

## View, edit and interact with offers

-   ### GET `/offers`: returns all the offers given some search paramters

    -   #### Query parameters

        -   `sex` [`optional`]: sex of the offered animal
        -   `type` [`optional`]: can either be `adoption` o `foster`.
        -   `species` [`optional`]: number species of the animals to be displayed.
        -   `radius` [`optional`]: radius within the offers should be (the user needs to have set their location)
        -   `minAge` [`optional`]: minimum age of the offered animal
        -   `maxAge` [`optional`]: maximum age of the offered animal

    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.
        -   `offers`: list containing the offers that match the given search parameters, with the following attributes for each element.
            -   `id`: identifier of the animal, which will be used in further requests.
            -   `name`: name of the animal.
            -   `sex`: sex of the offered animal.
            -   `race`: race of the animal in the offer, which in turn identifies its species.
            -   `TypeName`: type of the offer.
            -   `idSpecies`: id of the race of the animal.
            -   `age`: age of the offered animal.
            -   `reports`: number of reports of the offer.

-   ### POST `/offers`: creates a new offer

    -   #### Parameters
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

    -   #### Path parameters

        -   `id` [`required`]: identifier of the requested offer.

    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.
        -   `offer`: Requested offer with the specified id.
            -   `id`: identifier of the offered animal, same as provided by the user.
            -   `name`: name of the animal.
            -   `age`: age of the animal.
            -   `description`: description of the animal.
            -   `sex`: sex of the animal.
            -   `reports`: number of reports of the offer.
            -   `raceName`: if the animal's species is that of a dog or a cat, this field will contain its race.
            -   `species`: species of the animal in the offer.
            -   `idRace`: id of the race of the animal in the offer.
            -   `iniDate`: if the offer is of type `foster` this will indicate the date in which the animal would be fostered.
            -   `endDate`: if the offer is of type `foster` this will indicate the date in which the animal will end its fostering.
            -   `idOwner`: id of the owner.

-   ### PUT `/offers/:id`: edit an offer

    -   #### Parameters
        -   `name` [`required`]: name of the animal.
        -   `type` [`required`]: type of offer, which can be `0` (`adoption`) or `1` (`foster`)
        -   `race` [`required`]: race of the animal in the offer, which in turn identifies its species.
        -   `sex` [`required`]: sex of the animal, can be `Male` or `Female`.
        -   `age` [`required`]: age of the animal.
        -   `description` [`required`]: description of the offer.
        -   `iniDate` [`optional`]: if the offer is of type `foster` this will indicate the date in which the animal would be fostered.
        -   `endDate` [`optional`]: if the offer is of type `foster` this will indicate the date in which the animal will end its fostering.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### DELETE `/offers/:id`: delete an offer. To do so you must be its creator.

    -   #### Path parameters

        -   `id` [`required`]: identifier of the requested offer.

    -   #### Response

        -   `id`: Identifier of the delated offer.
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### POST `/offers/:id/report`: report an offer.

    -   #### Path parameters

        -   `id` [`required`]: identifier of the requested offer.

    -   #### Response
        -   `id`: Identifier of the newly created offer.
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### GET `/offers/currentUser`: returns all the current user offers, provided the token on the parameters

    -   #### Response
        -   `offers`: list containing the offers that match the given search parameters, with the following attributes for each element.
            -   `id`: identifier of the animal, which will be used in further requests.
            -   `name`: name of the animal.
            -   `description`: description of the offer.
            -   `sex`: sex of the offered animal.
            -   `species`: species of the animal in the offer.
            -   `reports`: number of reports of the offer.

-   ### GET `/offers/favourite`: returns all the user's favourite offers

    -   #### Response

        -   `offers`: list containing the offers that match the given search parameters, with the following attributes for each element.

            -   `id`: identifier of the animal, which will be used in further requests.
            -   `name`: name of the animal.
            -   `sex`: sex of the offered animal.
            -   `species`: species of the animal in the offer.
            -   `offerType`: type of the offer

-   ### DELETE `/offers/:id/favourite`: deletes offer from favourites

    -   #### Path parameters
        -   `id` [`required`]: identifier of the offer.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### POST `/offers/:id`: swipe on an offer

    -   #### Path parameters
        -   `id` [`required`]: identifier of the offer.
    -   #### Parameters
        -   `direction`: direction of the swipe action, can only be `right` or `left`
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### GET `/offers/:id/image`

    -   #### Path parameters
        -   `id` [`required`]: identifier of the offer.
    -   #### Response
        -   JPG file of the requested image, encoded with base64.

-   ### POST `/offers/:id/image`

    -   #### Path parameters
        -   `id` [`required`]: identifier of the offer.
    -   #### Parameters
        -   `image`[`required`]: image file in jpg format, passed through form-data.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### DELETE `/offers/seen`

    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

## Chat

-   ### GET `/chats`: obtain the current user's chats.

    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `chats`: List of chats.
            -   `idChat`: id of the chat.
            -   `idUser`: id of the user that the current user is talking to (remains for the app to see wether he is the owner of the offer or not).
            -   `idOffer`: id of the offer.

-   ### POST `/offers/:id/chat`: creates chat with the owner of the offer.

    -   #### Path parameters
        -   `id` [`required`]: identifier of the offer.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### DELETE `/chat/:id`: closes a chat.

    -   #### Path parameters
        -   `id` [`required`]: identifier of the chat.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.

-   ### GET `/chat/:id`: gets all the messages from a chat
    -   #### Path parameters
        -   `id` [`required`]: identifier of the chat.
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `id`: id of the chat.
        -   `messages`: array of messages.
            -   `text`
            -   `createdAt`: date sent
            -   `userId`: sender id

## Other

-   ### GET `/races`: list of races and its species
    -   #### Response
        -   `success`: Is either `true` or `false`.
        -   `msg`: If success is false, short message explaining the causes of the error. If not, contains success message.
        -   `list`: List of races and its species, with the following attributes in each element.
            -   `idSpecies`: id of the species (`integer`)
            -   `speciesName`: name of the species
            -   `idRace`: identifier of race (`integer`)
            -   `raceName`: name of the race
