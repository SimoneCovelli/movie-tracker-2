<?php

require_once __DIR__ . '/ResponseService.php';

class RequestService
{
    public static function getMovieId(): int
    {
        if (!isset($_GET['id'])) {
            ResponseService::badRequest("Movie id is required");
            exit;
        }

        $id = $_GET['id'];

        if (!filter_var($id, FILTER_VALIDATE_INT)) {
            ResponseService::badRequest("Invalid movie id");
            exit;
        }

        return (int) $id;
    }

    public static function getRequestData(): array
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!is_array($data)) {
            ResponseService::badRequest("Invalid request body");
            exit;
        }

        return $data;
    }

    public static function getRequestValue(string $key): mixed
    {
        $data = self::getRequestData();

        if (!array_key_exists($key, $data)) {
            ResponseService::badRequest("$key is required");
            exit;
        }

        return $data[$key];
    }

    public static function getCatalogPage(): int
    {
        $page = $_GET['page'] ?? 1;

        if (!filter_var($page, FILTER_VALIDATE_INT) || (int) $page < 1) {
            ResponseService::badRequest("Invalid page");
            exit;
        }

        return (int) $page;
    }
}
