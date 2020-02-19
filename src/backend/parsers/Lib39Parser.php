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
        $result = [];
        $events = $this->getList($month, $year);
        foreach ($events as $event) {
            $result[] = $this->getEvent($event);
        }
        return $result;
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
        foreach ($html->find('table.NewsCalTable td') as $cell) {
            $day = $cell->find('span', 0)->plaintext;
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
                                    //'description' => '',
                                    //'location' => '',
                                    //'contact' => '',
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

    /**
     * Hydrate event with it's details
     *
     * @param EventModel $event
     *
     * @return EventModel
     */
    private function getEvent(EventModel $event) : EventModel
    {
        $html = (new HtmlWeb())->load($event->reference . '&print=Y');
        $content = $html->find('.news-detail');
        $h3 = $content->find('h3', 0)->plaintext;

        foreach ($content->find('p') as $row) {

        }

        // Prevent memory leak issues
        unset($html);
        dd($event);
        return $event;
    }
}
