class EventsSource {
  /**
   * @param {string} name название источника
   * @param {string} source ссылка на источник
   */
  constructor(name, source,) {    
    this.name = name;
    this.source = source;
  }

  /**
   * @param {function} cbSuccess функция вызывается при успешном получении данных
   * @param {function} cbError функция вызывается в случае ошибки
   */
  loadEvents(cbSuccess, cbError) {
    try {
      if (window.VK) {
        const vk = window.VK;
        vk.init({
          apiId: 7272040
        });
        vk.Api.call(
          'wall.get',
          {
            owner_id: -93114971,
            count: 1,
            v: "5.103"
          },
          function(r) {
            if (r.response && r.response.items && r.response.items.length) {
              let events = [];
              
              r.response.items.forEach(item => {
                console.log(item);
                // TODO:
                // const event = this._parseEvent(item);
                // events.unshift(event);
              });

              cbSuccess(events);
            } else {
              throw "No VK wall post found.";
            }
          }
        );
      } else {
        throw "No VK module found. Make sure https://vk.com/js/api/openapi.js script has been added to web page.";
      }
    }
    catch(error) {
      cbError(error);
    }
  }
}
  
export default EventsSource;
