<?php

require_once __DIR__ . '/../config/tmdbConfig.php';

class TmdbService
{
    // preleva da TMDB il singolo film che corrisponde all'id
    public function getMovie(
        int $id,
        string $language = 'it-IT'
    ): array {

        $url = 'https://api.themoviedb.org/3/movie/'
            . urlencode($id)
            . '?language=' . urlencode($language);

        return $this->makeRequest($url);
    }

    // preleva da TMDB i film popolari
    public function getPopularMovies(
        int $page = 1,
        string $language = 'it-IT'
    ): array {

        $url = 'https://api.themoviedb.org/3/movie/popular'
            . '?language=' . urlencode($language)
            . '&page=' . urlencode($page);

        return $this->makeRequest($url);
    }

    // preleva da TMDB i film che corrispondono alla query
    public function searchMovies(
        string $query,
        int $page = 1,
        string $language = 'it-IT'
    ): array {

        $url = 'https://api.themoviedb.org/3/search/movie'
            . '?query=' . urlencode($query)
            . '&language=' . urlencode($language)
            . '&page=' . urlencode($page);

        return $this->makeRequest($url);
    }

    // effettua la richiesta http vera e propria
    private function makeRequest(
        string $url
    ): array {

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer " . TMDB_TOKEN,
            "accept: application/json"
        ]);

        $response = curl_exec($ch);

        if ($response === false) {
            throw new Exception("TMDB request failed");
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($httpCode < 200 || $httpCode >= 300) {
            throw new Exception("TMDB request failed");
        }

        $data = json_decode($response, true);

        if (!is_array($data)) {
            throw new Exception("Invalid TMDB response");
        }

        return $data;
    }
}
