<?php

namespace VadimCpp\events4friends\backend\parsers;

use simplehtmldom\HtmlWeb;
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
     * @var string
     */
    private $domain = 'https://lib39.ru';

    /**
     * @var string
     */
    private $list = '/events/activities/index.php?month=%d&year=%d';

    /**
     * @var string
     */
    private $detail = '/events/activities/detail.php?activities={0}';

    /**
     * @param int $month
     * @param int $year
     *
     * @return EventModel[]
     */
    public function parse($month, $year)
    {
        /*
        $result = [];
        for ($i=1;$i<=10;$i++) {
            $result[] = new ReflectionClass(EventModel::class);
        }
        return $result;
        */
        return $this->parseList($month, $year);
    }

    /**
     * @param int $month
     * @param int $year
     *
     * @return EventModel[]
     */
    private function parseList($month, $year)
    {
        $html = (new HtmlWeb())->load(sprintf($this->domain . $this->list, $month, $year));
        foreach ($html->find('td.NewsCalDefault') as $el) {
            d($el->plaintext);
        }
    }

    /**
     * @param $eventId
     *
     * @return EventModel
     */
    private function parseEvent($eventId)
    {
        return new EventModel();
    }
}
