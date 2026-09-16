<?php

class MyLibraryService
{
    private PgSql\Connection $connection;

    public function __construct(PgSql\Connection $connection)
    {
        $this->connection = $connection;
    }

    private function executeQuery(
        string $query,
        array $params = []
    ): PgSql\Result {
        $result = empty($params)
            ? pg_query($this->connection, $query)
            : pg_query_params($this->connection, $query, $params);

        if (!$result) {
            throw new Exception(pg_last_error($this->connection));
        }

        return $result;
    }

    // recupera tutti i tag associabili ai film
    public function getTags(): array
    {
        $query = "SELECT tagname FROM tag";
        $result = $this->executeQuery($query);

        $rows = pg_fetch_all($result) ?: [];
        return array_column($rows, 'tagname');
    }

    private function formatMovie(array $movie): array
    {
        $movie['id'] = (int) $movie['id'];
        $movie['rating'] = $movie['rating'] !== null
            ? (int) $movie['rating']
            : null;
        $movie['tags'] = json_decode($movie['tags'], true);

        return $movie;
    }

    private function formatMovies(array $movies): array
    {
        foreach ($movies as &$movie) {
            $movie = $this->formatMovie($movie);
        }

        return $movies;
    }

    private function buildMovieConditions(
        string $query,
        string $status,
        string $tag
    ): array {
        $conditions = [];
        $params = [];

        // ricerca per titolo
        if ($query !== '') {
            $params[] = '%' . $query . '%';
            $conditions[] = 'movie.movietitle ILIKE $' . count($params);
        }

        // filtro per status
        if ($status !== '') {
            $params[] = $status;
            $conditions[] = 'movie.status = $' . count($params);
        }

        // filtro per tag
        if ($tag !== '') {
            $params[] = $tag;
            $conditions[] = '
                EXISTS (
                    SELECT 1
                    FROM tagging AS t_filter
                    WHERE t_filter.movieid = movie.movieid
                    AND t_filter.tagname = $' . count($params) . '
                )';
        }

        return [
            'conditions' => $conditions,
            'params' => $params
        ];
    }

    private function buildMovieSort(string $sort): string
    {
        switch ($sort) {
            case 'title-asc':
                return ' ORDER BY movie.movietitle ASC';

            case 'title-desc':
                return ' ORDER BY movie.movietitle DESC';

            case 'rating-asc':
                return ' ORDER BY 
                movie.rating ASC NULLS LAST,
                CASE WHEN movie.status = \'watched\' THEN 0 ELSE 1 END
            ';

            case 'rating-desc':
                return ' ORDER BY 
                movie.rating DESC NULLS LAST,
                CASE WHEN movie.status = \'watched\' THEN 0 ELSE 1 END
            ';

            case 'release-asc':
                return ' ORDER BY movie.releasedate ASC NULLS LAST';

            case 'release-desc':
                return ' ORDER BY movie.releasedate DESC';

            default:
                return '';
        }
    }

    // recupera tutti i film (più rispettivi tag) presenti nella libreria che corrispondono ai filtri applicati
    public function getMovies(
        string $query,
        string $status,
        string $sort,
        string $tag
    ): array {
        $filters = $this->buildMovieConditions(
            $query,
            $status,
            $tag
        );

        $conditions = $filters['conditions'];
        $params = $filters['params'];

        $sqlQuery = <<<SQL
            SELECT
                movie.movieid AS "id",
                movie.movietitle AS "title",
                movie.originallanguage AS "originalLanguage",
                movie.originaltitle AS "originalTitle",
                movie.overview AS "overview",
                movie.posterpath AS "posterPath",
                movie.releasedate AS "releaseDate",
                movie.status AS "status",
                movie.rating AS "rating",
                COALESCE(
                    JSON_AGG(tag.tagname) FILTER (WHERE tag.tagname IS NOT NULL),
                    '[]'::json
                ) AS tags
            FROM movie
            LEFT JOIN tagging ON movie.movieid = tagging.movieid
            LEFT JOIN tag ON tagging.tagname = tag.tagname
        SQL;

        if (!empty($conditions)) {
            $sqlQuery .= ' WHERE ' . implode(' AND ', $conditions);
        }

        $sqlQuery .= ' GROUP BY movie.movieid';
        $sqlQuery .= $this->buildMovieSort($sort);

        $result = $this->executeQuery($sqlQuery, $params);

        $movies = pg_fetch_all($result) ?: [];
        return $this->formatMovies($movies);
    }

    // conta il numero di film presenti nella libreria (totale, watched e to watch)
    public function getMovieCounts(): array
    {
        $query = <<<SQL
            SELECT
                COUNT(*) AS total,
                COUNT(*) FILTER (WHERE status = 'watched') AS watched,
                COUNT(*) FILTER (WHERE status = 'to-watch') AS "toWatch"
            FROM movie
        SQL;

        $result = $this->executeQuery($query);

        $counts = pg_fetch_assoc($result);

        return [
            'total' => (int) $counts['total'],
            'watched' => (int) $counts['watched'],
            'toWatch' => (int) $counts['toWatch']
        ];
    }

    // recupera dalla libreria il film che corrisponde all'id (più rispettivi tag)
    public function getMovie(int $movieId): ?array
    {
        $query = <<<SQL
            SELECT
                movie.movieid AS "id",
                movie.movietitle AS "title",
                movie.originallanguage AS "originalLanguage",
                movie.originaltitle AS "originalTitle",
                movie.overview AS "overview",
                movie.posterpath AS "posterPath",
                movie.releasedate AS "releaseDate",
                movie.status AS "status",
                movie.rating AS "rating",
                COALESCE(
                    JSON_AGG(tagging.tagname) FILTER (WHERE tagging.tagname IS NOT NULL),
                    '[]'::json
                ) AS tags
            FROM movie
            LEFT JOIN tagging ON movie.movieid = tagging.movieid
            WHERE movie.movieid = $1
            GROUP BY movie.movieid
        SQL;

        $params = [$movieId];
        $result = $this->executeQuery($query, $params);

        $movie = pg_fetch_assoc($result) ?: null;

        if ($movie === null) {
            return null;
        }

        return $this->formatMovie($movie);
    }

    // controlla se il film che corrisponde all'id è già presente nella libreria
    public function isMovieInLibrary(int $movieId): bool
    {
        return $this->getMovie($movieId) !== null;
    }

    // aggiunge un film alla libreria
    public function addMovie(array $movie): void
    {
        $query = "INSERT INTO movie (
            movieId,
            movieTitle,
            originalTitle,
            originalLanguage,
            releaseDate,
            overview,
            posterPath,
            status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

        $params = [
            $movie['movieId'],
            $movie['title'],
            $movie['originalTitle'],
            $movie['originalLanguage'],
            $movie['releaseDate'],
            $movie['overview'],
            $movie['posterPath'],
            $movie['status']
        ];

        $this->executeQuery($query, $params);
    }

    // aggiorna lo stato del film che corrisponde all'id
    public function updateStatus(int $movieId, string $status): void
    {
        if (!in_array($status, ['watched', 'to-watch'], true)) {
            throw new Exception('Invalid movie status');
        }

        $query = "UPDATE movie SET status = $1 WHERE movieId = $2";
        $params = [$status, $movieId];
        $this->executeQuery($query, $params);
    }

    // aggiorna il rating del film che corrisponde all'id
    public function updateRating(int $movieId, ?int $rating): void
    {
        $query = "UPDATE movie SET rating = $1 WHERE movieId = $2";
        $params = [$rating, $movieId];
        $this->executeQuery($query, $params);
    }

    // aggiorna i tag del film che corrisponde all'id
    public function updateTags(int $movieId, array $tags): void
    {
        pg_query($this->connection, "BEGIN");

        try {
            $deleteQuery = "DELETE FROM tagging WHERE movieid = $1";
            $deleteParams = [$movieId];
            $this->executeQuery($deleteQuery, $deleteParams);

            $insertQuery = "INSERT INTO tagging (movieid, tagname) VALUES ($1, $2)";

            foreach ($tags as $tag) {
                $insertParams = [$movieId, $tag];
                $this->executeQuery($insertQuery, $insertParams);
            }

            pg_query($this->connection, "COMMIT");
        } catch (Exception $error) {
            pg_query($this->connection, "ROLLBACK");
            throw $error;
        }
    }

    // elimina dalla libreria il film che corrisponde all'id
    public function deleteMovie(int $movieId): void
    {
        $query = "DELETE FROM movie WHERE movieid = $1";
        $params = [$movieId];
        $result = $this->executeQuery($query, $params);

        if (pg_affected_rows($result) === 0) {
            throw new Exception("Movie not found");
        }
    }
}
