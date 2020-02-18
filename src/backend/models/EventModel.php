<?php

namespace VadimCpp\events4friends\backend\models;

/**
 * Class EventModel
 *
 * @package VadimCpp\events4friends\backend\models
 */
class EventModel implements \JsonSerializable
{
    /**
     * @var string
     */
    public $id;

    /**
     * @var \DateTime
     */
    public $start;

    /**
     * @var \DateTime
     */
    public $end;

    /**
     * @var string
     */
    public $summary;

    /**
     * @var string
     */
    public $description;

    /**
     * @var string
     */
    public $location;

    /**
     * @var string
     */
    public $contact;

    /**
     * @var string
     */
    public $reference;

    public function jsonSerialize()
    {
        return array_filter(get_object_vars($this));
    }
}
