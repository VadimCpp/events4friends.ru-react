<?php

namespace VadimCpp\events4friends\backend\interfaces;

use VadimCpp\events4friends\backend\models\EventModel;

/**
 * Interface ParserInterface
 *
 * @package VadimCpp\events4friends\backend\interfaces
 */
interface ParserInterface
{
    /**
     * @param int $month
     * @param int $year
     *
     * @return EventModel[]
     */
    public function parse($month, $year);
}
