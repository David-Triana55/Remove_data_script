
BEGIN;

TRUNCATE TABLE "SchoolYears" CASCADE;

TRUNCATE TABLE "StudentChanges" CASCADE;

DELETE FROM "Users" WHERE "Role" <> 0 AND "Role" <> 13;

-- Eliminar instituciones educativas no referenciadas por usuarios restantes (Role 0)
DELETE FROM "EducationalInstitution"
WHERE "Id" NOT IN (
  SELECT "EducationalInstitutionalId"
  FROM "Users"
  WHERE ("Role" = 0 AND "Role" = 13) AND "EducationalInstitutionalId" IS NOT NULL
);

-- Eliminar entidades territoriales no referenciadas por usuarios ni instituciones restantes
DELETE FROM "TerritorialEntity"
WHERE "Id" NOT IN (
  SELECT "TerritorialEntityId"
  FROM "Users"
  WHERE ("Role" = 0 AND "Role" = 13) AND "TerritorialEntityId" IS NOT NULL
  UNION
  SELECT "TerritorialEntityId"
  FROM "EducationalInstitution"
  WHERE "TerritorialEntityId" IS NOT NULL
);

DELETE FROM "Files"
WHERE "Id" NOT IN (
  SELECT "ProfilePhotoId" FROM "Users" WHERE "ProfilePhotoId" IS NOT NULL
  UNION
  SELECT "SignatureId" FROM "Users" WHERE "SignatureId" IS NOT NULL
);


COMMIT;
