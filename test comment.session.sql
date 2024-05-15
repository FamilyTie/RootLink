CREATE TABLE chatrooms (
    id SERIAL PRIMARY KEY,
    user1_id integer NOT NULL,
    user2_id integer NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)