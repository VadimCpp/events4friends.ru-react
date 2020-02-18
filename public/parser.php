<?php
require __DIR__ . '/../vendor/autoload.php';

if (!isset($_REQUEST['month'], $_REQUEST['year'])) {
    throw new InvalidArgumentException('Month and year are required');
}

echo json_encode(
    [
        'lib39' => (new VadimCpp\events4friends\backend\parsers\Lib39Parser())->parse(
            $_REQUEST['month'],
            $_REQUEST['year']
        ),
    ],
    JSON_THROW_ON_ERROR,
    512
);
