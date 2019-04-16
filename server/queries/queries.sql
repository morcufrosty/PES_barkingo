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

--offers
SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName", "openedOffers"."urlImage" FROM "openedOffers", users WHERE users.name='test' and users.email='hola@gmail.com' and "openedOffers"."idOwner" = users.id;

--createOffer
INSERT INTO animals (id, name, type, species, race, sex, age, description, iniDate, endDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

--swipeRight
SELECT id FROM users WHERE email=$1 AND name=$2;
INSERT INTO favourites (idUser, idOffer) VALUES ($1, $2);