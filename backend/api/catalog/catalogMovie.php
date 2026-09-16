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
                // preleva da TMDB il singolo film che corrisponde all'id
                case 'getMovie':
                    $id = RequestService::getMovieId();
                    $language = $_GET['language'] ?? 'it-IT';

                    $movie = $tmdbService->getMovie($id, $language);
                    ResponseService::success($movie);
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
