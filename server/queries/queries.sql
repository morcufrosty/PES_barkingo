--login
SELECT * FROM users WHERE email='hola@gmail.com'

--offers

SELECT "openedOffers".id, "openedOffers".name, "openedOffers".sex, "openedOffers".race, "openedOffers"."TypeName", "openedOffers"."urlImage" FROM "openedOffers", users WHERE users.name='test' and users.email='hola@gmail.com' and "openedOffers"."idOwner" = users.id;

--