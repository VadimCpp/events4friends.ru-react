<?php

namespace VadimCpp\events4friends\backend\parsers;

use simplehtmldom\HtmlDocument;
use VadimCpp\events4friends\backend\interfaces\ParserInterface;
use VadimCpp\events4friends\backend\models\EventModel;

/**
 * Class Lib39Parser
 *
 * @package VadimCpp\events4friends\backend\parsers
 */
class Lib39Parser implements ParserInterface
{
    const ID = 'lib39';

    /**
     * @var string
     */
    private $protocol = 'https';

    /**
     * @var string
     */
    private $domain = 'lib39.ru';

    /**
     * @var string
     */
    private $list = '/events/activities/index.php?month=%d&year=%d';

    /**
     * @var string
     */
    private $detail = '/events/activities/detail.php?activities={0}';

    public function getId()
    {
        return self::ID;
    }

    /**
     * @param int $month
     * @param int $year
     *
     * @return EventModel[]
     */
    public function parse($month, $year)
    {
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
        $url = sprintf($this->protocol . '://' . $this->domain . $this->list, $month, $year);
        $raw = file_get_contents($url);
        $document = new HtmlDocument();
        dd($document->load($raw));

//        $html = (new HtmlWeb())->load(sprintf($this->protocol . '://' . $this->domain . $this->list, $month, $year));
//        foreach ($html->find('td.NewsCalDefault') as $el) {
//            d($el->plaintext);
//        }
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
