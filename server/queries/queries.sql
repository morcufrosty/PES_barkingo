--register
INSERT INTO users
    (id, name, email, password)
VALUES
    (1, 'test', 'hola@gmail.com', '<<hashed>>')

--login
SELECT *
FROM users
WHERE email='hola@gmail.com'

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
    animals.age
FROM
    animals, "offerType"
WHERE animals.status = 0 AND animals.offer = "offerType"."idType";

--see offers with filters
SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName", race."idSpecies", "openedOffers".age
FROM "openedOffers", race
WHERE "openedOffers"."idOwner"<>'1'
	and "openedOffers".race=race."idRace"
	and NOT EXISTS (SELECT * FROM seen WHERE seen."idOffer"="openedOffers".id and seen."idUser"='1')
	and NOT EXISTS (SELECT * FROM favourites WHERE favourites."idOffer"="openedOffers".id and favourites."idUser"='1')
	and (NULL IS NULL or "openedOffers".sex='') and (NULL IS NULL or "openedOffers"."TypeName"='')
	and (NULL IS NULL or race."idSpecies"=0) and (NULL IS NULL or ''=(SELECT city FROM users WHERE users.id="openedOffers"."idOwner"))
	and (0 IS NULL or "openedOffers".age>1) and (0 IS NULL or "openedOffers".age<10)
ORDER BY "openedOffers".id;

--offers
SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName", "openedOffers"."urlImage"
FROM "openedOffers", users
WHERE users.name='test' and users.email='hola@gmail.com' and "openedOffers"."idOwner" = users.id;

--createOffer
INSERT INTO animals
    (id, name, type, species, race, sex, age, description, iniDate, endDate)
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

--favourites
SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName"
FROM "openedOffers"
WHERE "openedOffers"."idOwner"<>'b1bd53a9-aff4-4c7b-8e86-b97cf62cafc3'
    and NOT EXISTS (SELECT *
    FROM seen
    WHERE seen."idOffer"="openedOffers".id and seen."idUser"='b1bd53a9-aff4-4c7b-8e86-b97cf62cafc3')
    and EXISTS (SELECT *
    FROM favourites
    WHERE favourites."idOffer"="openedOffers".id and favourites."idUser"='b1bd53a9-aff4-4c7b-8e86-b97cf62cafc3');

--swipeRight
SELECT id
FROM users
WHERE email=$1 AND name=$2;
INSERT INTO favourites
    (idUser, idOffer)
VALUES
    ($1, $2);

--races
SELECT species.id AS "idSpecies", species."speciesName", race."idRace", race."raceName"
FROM species, race
WHERE species.id=race."idSpecies";

--seen
DELETE FROM seen WHERE seen."idUser"='23';

--com fer queries amb paràmetres opcionals
SELECT *
from users
where
  ($1 is null or hair_color = $1) and
    ($2 is null or eye_color = $2);