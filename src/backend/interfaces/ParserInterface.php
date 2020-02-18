<?php

namespace VadimCpp\events4friends\backend\interfaces;

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
     * @return string
     */
    public function parse($month, $year);
}