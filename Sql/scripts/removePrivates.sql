BEGIN;

-- Primero, elimina los usuarios asociados a las instituciones que se van a eliminar
DELETE FROM "Users" 
WHERE "EducationalInstitutionalId" IN (
    SELECT "Id" FROM "EducationalInstitution" WHERE "Nature" = 1
);

-- Ahora elimina las instituciones
DELETE FROM "EducationalInstitution" WHERE "Nature" = 1;

COMMIT;