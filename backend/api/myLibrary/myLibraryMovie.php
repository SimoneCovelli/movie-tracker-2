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
                // recupera dalla libreria il film che corrisponde all'id (più rispettivi tag)
                case 'getMovie':
                    $id = RequestService::getMovieId();

                    $movie = $myLibraryService->getMovie($id);
                    ResponseService::success($movie);
                    break;

                default:
                    ResponseService::badRequest('Invalid action');
            }

            break;

        case 'PATCH':
            switch ($action) {
                // aggiorna lo stato del film che corrisponde all'id
                case 'updateStatus':
                    $id = RequestService::getMovieId();
                    $status = RequestService::getRequestValue('status');

                    if ($status === null) {
                        ResponseService::badRequest('Status is required');
                        break;
                    }

                    $myLibraryService->updateStatus($id, $status);
                    ResponseService::successMessage('Movie status updated');
                    break;

                // aggiorna il rating del film che corrisponde all'id
                case 'updateRating':
                    $id = RequestService::getMovieId();
                    $rating = RequestService::getRequestValue('rating');

                    $myLibraryService->updateRating($id, $rating);
                    ResponseService::successMessage('Movie rating updated');
                    break;

                // aggiorna i tag del film che corrisponde all'id
                case 'updateTags':
                    $id = RequestService::getMovieId();
                    $tags = RequestService::getRequestValue('tags');

                    $myLibraryService->updateTags($id, $tags);
                    ResponseService::successMessage('Movie tags updated');
                    break;

                default:
                    ResponseService::badRequest('Invalid action');
            }

            break;

        case 'DELETE':
            switch ($action) {
                // elimina dalla libreria il film che corrisponde all'id
                case 'deleteMovie':
                    $id = RequestService::getMovieId();
                    $myLibraryService->deleteMovie($id);
                    ResponseService::successMessage('Movie deleted');
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
