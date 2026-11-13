BEGIN;

DELETE FROM "Competences" where "PlanId" = 'fb7bc898-c2d4-497c-ab3a-3cb82d2aa0bc';
DELETE FROM "PlanInstitutionals" where "Id" = '9f2fa9df-2d51-4796-af9c-eb4c829544fb';
-- DELETE FROM "PlanStems" where "Id" = '53e57fbf-7300-4804-87d2-de6d26716557';
-- DELETE FROM "PlanStems" where "Id" = '';

COMMIT;
