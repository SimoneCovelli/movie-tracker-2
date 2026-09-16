<?php

require_once __DIR__ . '/../../services/TmdbService.php';
require_once __DIR__ . '/../../services/ResponseService.php';
require_once __DIR__ . '/../../services/RequestService.php';

ResponseService::setHeaders();

$tmdbService = new TmdbService();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

try {
    switch ($method) {
        case 'GET':
            switch ($action) {
                // preleva da TMDB i film da mostrare nel catalogo (popolari o filtrati)
                case 'getMovies':
                    $language = $_GET['language'] ?? 'it-IT';
                    $query = $_GET['query'] ?? '';
                    $page = RequestService::getCatalogPage();

                    if ($query === '') {
                        $movies = $tmdbService->getPopularMovies($page, $language);
                    } else {
                        $movies = $tmdbService->searchMovies($query, $page, $language);
                    }

                    ResponseService::success($movies);
                    break;

                default:
                    ResponseService::badRequest('Invalid action');
            }

            break;

        default:
            ResponseService::methodNotAllowed('Method not allowed');
    }
} catch (Exception $e) {
    ResponseService::serverError($e->getMessage());
}
