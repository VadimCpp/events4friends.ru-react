<?php

declare(strict_types=1);
set_time_limit(0);

use VadimCpp\events4friends\backend\interfaces\ParserInterface;
use VadimCpp\events4friends\backend\parsers\Lib39Parser;

require __DIR__ . '/../vendor/autoload.php';

try {
    if (!isset($_REQUEST['month'], $_REQUEST['year'])) {
        throw new InvalidArgumentException('Month and year are required', 400);
    }


    $parsers = [
        Lib39Parser::class,
    ];

    $result = [];
    foreach ($parsers as $parser) {
        /** @var ParserInterface $worker */
        $worker = new $parser();
        $result[$worker->getId()] = $worker->parse((int)$_REQUEST['month'], (int)$_REQUEST['year']);
    }

    header('Content-Type: application/json');
    echo json_encode(
        [
            'success' => true,
            'data' => $result,
        ],
        JSON_THROW_ON_ERROR,
        512
    );
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode(
        [
            'success' => false,
            'message' => $ex->getMessage(),
        ],
        JSON_THROW_ON_ERROR,
        512
    );
}
exit;
