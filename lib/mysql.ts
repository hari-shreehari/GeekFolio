import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'your_mysql_host',       
  user: 'vultradmin',          
  password: 'your_mysql_password',
  database: 'defaultdb',     
});

export default pool;
