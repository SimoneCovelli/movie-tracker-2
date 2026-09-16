<?php

require_once __DIR__ . '/../../services/DatabaseService.php';
require_once __DIR__ . '/../../services/MyLibraryService.php';
require_once __DIR__ . '/../../services/ResponseService.php';
require_once __DIR__ . '/../../services/RequestService.php';

ResponseService::setHeaders();

$databaseService = new DatabaseService();
$myLibraryService = new MyLibraryService($databaseService->getConnection());

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

try {
    switch ($method) {
        case 'GET':
            switch ($action) {
                // recupera tutti i film presenti nella libreria
                case 'getMovies':
                    $query = $_GET['query'] ?? '';
                    $status = $_GET['status'] ?? '';
                    $sort = $_GET['sort'] ?? '';
                    $tag = $_GET['tag'] ?? '';

                    $movies = $myLibraryService->getMovies($query, $status, $sort, $tag);
                    ResponseService::success($movies);
                    break;

                // conta il numero di film presenti nella libreria (totale, watched e to watch)
                case 'getMovieCounts':
                    $counts = $myLibraryService->getMovieCounts();
                    ResponseService::success($counts);
                    break;

                // recupera tutti i tag associabili ai film
                case 'getTags':
                    $tags = $myLibraryService->getTags();
                    ResponseService::success($tags);
                    break;

                // controlla se il film che corrisponde all'id è già presente nella libreria
                case 'checkMovie':
                    $id = RequestService::getMovieId();

                    $inLibrary = $myLibraryService->isMovieInLibrary($id);
                    ResponseService::success(['inLibrary' => $inLibrary]);
                    break;

                default:
                    ResponseService::badRequest('Invalid action');
            }

            break;

        case 'POST':
            switch ($action) {
                // aggiunge un film alla libreria
                case 'addMovie':
                    $data = RequestService::getRequestData();

                    $myLibraryService->addMovie($data);
                    ResponseService::created('Movie added to library');
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
