<?php

class ResponseService
{
    public static function setHeaders(): void
    {
        header('Access-Control-Allow-Origin: http://localhost:5173');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-Type: application/json');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }

    public static function success(mixed $data): void
    {
        http_response_code(200);
        echo json_encode($data);
    }

    public static function successMessage(string $message): void
    {
        http_response_code(200);
        echo json_encode(['message' => $message]);
    }

    public static function created(string $message): void
    {
        http_response_code(201);
        echo json_encode(['message' => $message]);
    }

    public static function badRequest(string $message): void
    {
        http_response_code(400);
        echo json_encode(['error' => $message]);
    }

    public static function methodNotAllowed(string $message): void
    {
        http_response_code(405);
        echo json_encode(['error' => $message]);
    }

    public static function serverError(string $message): void
    {
        http_response_code(500);
        echo json_encode(['error' => $message]);
    }
}
