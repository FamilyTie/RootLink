import psycopg2
import requests

DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'postgres'
DB_USER = 'postgres'
DB_PASSWORD = '1234'

FLASK_SERVER_URL = 'http://127.0.0.1:5000/api/predict'

BATCH_SIZE = 1000

def get_database_connection():
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )

def fetch_data_in_batches(cursor, batch_size):
    cursor.execute("SELECT id, data FROM profiles")
    while True:
        batch = cursor.fetchmany(batch_size)
        if not batch:
            break
        yield batch


def send_batch_to_server(batch):
    try:
        response = requests.post(FLASK_SERVER_URL, json=batch)
        response.raise_for_status()
        print("Batch sent successfully")
    except requests.exceptions.RequestException as e:
        print(f"Failed to send batch: {e}")

def process_batches():
    connection = get_database_connection()
    cursor = connection.cursor()
    try:
        for batch in fetch_data_in_batches(cursor, BATCH_SIZE):
            formatted_batch = [{"id": row[0], "data": row[1]} for row in batch]
            send_batch_to_server(formatted_batch)
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
    process_batches()
