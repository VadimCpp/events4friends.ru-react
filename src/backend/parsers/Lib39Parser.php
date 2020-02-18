<?php

namespace VadimCpp\events4friends\backend\parsers;

use ReflectionClass;
use ReflectionException;
use VadimCpp\events4friends\backend\interfaces\ParserInterface;
use VadimCpp\events4friends\backend\models\EventModel;

/**
 * Class Lib39Parser
 *
 * @package VadimCpp\events4friends\backend\parsers
 */
class Lib39Parser implements ParserInterface
{
    /**
     * @param int $month
     * @param int $year
     *
     * @return EventModel[]
     * @throws ReflectionException
     */
    public function parse($month, $year)
    {
        $result = [];
        for ($i=1;$i<=10;$i++) {
            $result[] = new ReflectionClass(EventModel::class);
        }
        return $result;
    }
}
