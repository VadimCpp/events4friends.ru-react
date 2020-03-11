<?php

namespace VadimCpp\events4friends\backend\parsers;

use DateTime;
use Exception;
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
    const ID = 'lib39';

    /**
     * @var string
     */
    private $domain = 'https://lib39.ru';

    /**
     * @var string
     */
    private $list = '/events/activities/index.php?month=%d&year=%d&print=Y';

    /**
     * @var string
     */
    private $address = 'Калининград, проспект Мира, 9/11';

    /**
     * @return string
     */
    public function getId() : string
    {
        return self::ID;
    }

    /**
     * @param int $month
     * @param int $year
     *
     * @return EventModel[]
     */
    public function parse($month, $year) : array
    {
        $events = $this->getList($month, $year);
        return $events;
    }

    /**
     * It looks ugly, but it works
     *
     * @param int $month
     * @param int $year
     *
     * @return array
     */
    private function getList($month, $year) : array
    {
        $url = sprintf($this->domain . $this->list, $month, $year);
        $html = (new HtmlWeb())->load($url);
        $events = [];
        $day = 0;
        foreach ($html->find('table.NewsCalTable td') as $cell) {
            if($span = $day = $cell->find('span', 0)) {
                $day = $span->plaintext;
            }
            if ($day > 0) {
                foreach ($cell->find('.NewsCalNews') as $container) {
                    foreach ($container->find('a') as $link) {
                        try {
                            $time = pattern('([0-9]{2}:[0-9]{2})')->match($container->innertext)->first();
                            $events[]  = new EventModel(
                                [
                                    'id' => (int)pattern('[0-9]+')->match($link->href)->first(),
                                    'start' => (new DateTime(
                                        $day . '.' . $month . '.' . $year . ' ' . $time,
                                        new \DateTimeZone('Europe/Kaliningrad')
                                    ))->format(DATE_ATOM),
                                    'summary' => $link->plaintext,
                                    'location' => $this->address,
                                    'contact' => $this->contact,
                                    'reference' => $this->domain . $link->href,
                                ]
                            );
                        } catch (Exception $ex) {
                            // Parsing error - skip record
                        }
                    }
                }
            }
        }

        // Prevent memory leak issues
        unset($html);
        return $events;
    }
}
