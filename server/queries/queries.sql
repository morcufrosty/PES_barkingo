--register
INSERT INTO users (id, name, email, password) VALUES (1, 'test', 'hola@gmail.com', '<<hashed>>')

--login
SELECT * FROM users WHERE email='hola@gmail.com'

--materialized view openedOffers
 SELECT animals.id,
    animals.name,
    animals.race,
    animals.age,
    animals.sex,
    animals.description,
    animals."idOwner",
    animals.status,
    "offerType"."TypeName",
    animals."urlImage"
   FROM
     animals, "offerType"
  WHERE animals.status = 0 AND animals.offer = "offerType"."idType";

--see offers
SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName"
FROM "openedOffers"
WHERE "openedOffers"."idOwner"<>'6947fa31-67a0-4820-976d-296db10929f5'
	and NOT EXISTS (SELECT * FROM seen WHERE seen."idOffer"="openedOffers".id and seen."idUser"='6947fa31-67a0-4820-976d-296db10929f5')
	and NOT EXISTS (SELECT * FROM favourites WHERE favourites."idOffer"="openedOffers".id and favourites."idUser"='6947fa31-67a0-4820-976d-296db10929f5')
ORDER BY "openedOffers".id;

--offers
SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName", "openedOffers"."urlImage" FROM "openedOffers", users WHERE users.name='test' and users.email='hola@gmail.com' and "openedOffers"."idOwner" = users.id;

--createOffer
INSERT INTO animals (id, name, type, species, race, sex, age, description, iniDate, endDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

--favourites
SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName"
FROM "openedOffers"
WHERE "openedOffers"."idOwner"<>'b1bd53a9-aff4-4c7b-8e86-b97cf62cafc3'
	and NOT EXISTS (SELECT * FROM seen WHERE seen."idOffer"="openedOffers".id and seen."idUser"='b1bd53a9-aff4-4c7b-8e86-b97cf62cafc3')
	and EXISTS (SELECT * FROM favourites WHERE favourites."idOffer"="openedOffers".id and favourites."idUser"='b1bd53a9-aff4-4c7b-8e86-b97cf62cafc3');

--swipeRight
SELECT id FROM users WHERE email=$1 AND name=$2;
INSERT INTO favourites (idUser, idOffer) VALUES ($1, $2);

--races
SELECT species.id AS "idSpecies", species."speciesName", race."idRace", race."raceName" FROM species, race WHERE species.id=race."idSpecies";