import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
   host: 'database',
   user: 'root',
   password: 'password',
   database: 'media'
});

connection.connect();

export async function getAll() {
    const query = "SELECT * FROM books";
    const [data] = await connection.query(query);
    return data;
}
export async function get(id) {
    const query = "SELECT * FROM books WHERE id = ?";
    const [data] = await connection.query(query, [id]);
    return data;
}

export async function remove(id) {}
export function add(movie) {}
