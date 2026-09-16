<?php

require_once __DIR__ . '/../config/databaseConfig.php';

class DatabaseService
{
    private PgSql\Connection $connection;

    // crea la connessione al database
    public function __construct()
    {
        $this->connection = pg_connect(
            "host=" . DB_HOST .
                " port=" . DB_PORT .
                " dbname=" . DB_NAME .
                " user=" . DB_USER .
                " password=" . DB_PASSWORD
        );

        if (!$this->connection) {
            throw new Exception("Database connection failed");
        }
    }

    // restituisce la connessione al database
    public function getConnection()
    {
        return $this->connection;
    }
}
