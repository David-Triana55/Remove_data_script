
BEGIN;

DELETE FROM "Users" WHERE "Role" <> 0 AND "Role" <> 13;

-- TRUNCATE TABLE "Users";

COMMIT;