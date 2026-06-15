import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
   host: 'database',
   user: 'root',
   password: 'password',
   database: 'media'
});

connection.connect();

export async function getAll() {
    try {
        const query = "SELECT * FROM books";
        const [data] = await connection.query(query);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}
export async function get(id) {
    try {
        const query = "SELECT * FROM books WHERE id = ?";
        const [data] = await connection.query(query, [id]);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}
export async function remove(id) {
    // your code here!
}

export async function add(book) {
    // your code here!
}
