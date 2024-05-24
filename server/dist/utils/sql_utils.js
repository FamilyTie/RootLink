"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetSequences = void 0;
async function resetSequences(knex) {
    const resetScript = `
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT c.relname FROM pg_class c WHERE c.relkind = 'S') LOOP
          EXECUTE 'ALTER SEQUENCE ' || quote_ident(r.relname) || ' RESTART WITH 1';
        END LOOP;
      END $$;
    `;
    await knex.raw(resetScript);
}
exports.resetSequences = resetSequences;
