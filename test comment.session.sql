INSERT INTO profiles (
        id,
        user_id,
        username,
        full_name,
        bio,
        account_type,
        data,
        -- assuming this is a JSON column
        created_at,
        updated_at
    )
VALUES (
        1,
        1,
        'johndoe342',
        'John Doe',
        'From NY',
        'Adopted',
        '{"email": "john.doe@example.com"}',
        -- correct format for JSON data
        NOW(),
        NOW()
    );
INSERT INTO posts (
        id,
        title,
        body,
        profile_id,
        created_at,
        updated_at
    )
VALUES (
        1,
        'Sample Post Title',
        'This is the body of the sample post.',
        1,
        NOW(),
        NOW()
    );
SELECT *
FROM posts;