DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT c.relname FROM pg_class c WHERE c.relkind = 'S') LOOP
        EXECUTE 'ALTER SEQUENCE ' || quote_ident(r.relname) || ' RESTART WITH 1';
    END LOOP;
END $$;