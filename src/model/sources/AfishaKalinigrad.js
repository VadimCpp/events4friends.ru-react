import moment from 'moment';
import Event from "../Event";
import 'moment/locale/ru';

class AfishaKalinigrad {

  /**
   * @param {string} text 
   * @private
   * @return {string|null}
   */
  _parseStart(text) {

    /**
     * @type {string|null}
     */
    let resultDate = null;

    if (text) {
      const dateFormat = /#(\d\d|\d)_[а-я]+\d\d\d\d@afisha_39([ ]*,?[ ]*\d\d(\.|:)\d\d)?/;
      const regex = RegExp(dateFormat);

      if (regex.test(text)) {
        const data = regex.exec(text);

        if (data && data[0]) {
          // "#11_Января2020@afisha_39" -> "#11_января2020@afisha_39"
          resultDate = data[0].toLowerCase();

          // "#11_января2020@afisha_39" -> "#11_01_2020@afisha_39"
          [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря",
          ].forEach((month, index) => {    
            const monthNo = index + 1;        
            resultDate = resultDate.replace(month, monthNo < 10 ? `0${monthNo}_` : `${monthNo}_`);
          });
          
          // "#11_01_2020@afisha_39" -> "11 января 2020 г"
          resultDate = moment(resultDate, 'DD_MM_YYYY@afisha_39').format();
        }
      } 
    }

    return resultDate;
  }

  /**
   * @param {string} text 
   * @private
   * @return {string|null}
   */
  _parseEnd(text) {

    /**
     * @type {string|null}
     */
    let resultDate = null;

    if (text) {
      const dateFormat = /#\d\d_[а-я]+\d\d\d\d@afisha_39/g;
      const matches = text.match(dateFormat);

      if (matches && matches.length > 1) {
        // "#11_Января2020@afisha_39" -> "#11_января2020@afisha_39"
        resultDate = matches[1].toLowerCase();;

        // "#11_января2020@afisha_39" -> "#11_01_2020@afisha_39"
        [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
        ].forEach((month, index) => {    
          const monthNo = index + 1;        
          resultDate = resultDate.replace(month, monthNo < 10 ? `0${monthNo}_` : `${monthNo}_`);
        });
        
        // "#11_01_2020@afisha_39" -> "11 января 2020 г"
        resultDate = moment(resultDate, 'DD_MM_YYYY@afisha_39').format('LL');     
      }
    }

    return resultDate;
  }

  /**
   * @param {string} text 
   * @private
   * @return {string}
   */
  _parseSummary(text) {
    // https://stackoverflow.com/a/8436533/1775459
    return text ? text.split('\n')[0] : "Не указано";
  }

  /**
   * @param {string} text 
   * @private
   * @return {string}
   */
  _parseLocation(text) {
    let result = "Не указано";

    if (text) {
      const address1st = text.split('\n')[4];
      const address2nd = text.split('\n')[5];

      if (address1st && address2nd) {
        result = `${address1st.trim()}, ${address2nd.trim()}`;
      }
    }

    return result;
  }

  /**
   * @param {function} cbSuccess функция вызывается при успешном получении данных
   * @param {function} cbError функция вызывается в случае ошибки
   */
  loadEvents(cbSuccess, cbError) {
    const that = this;

    if (window.VK) {
      const vk = window.VK;
      //
      // Проверка авторизации пользователя:
      // https://vk.com/dev/openapi?f=3.4.%20VK.Auth.getLoginStatus
      //
      vk.Auth.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          vk.Api.call(
            'wall.get',
            {
              owner_id: -93114971,
              count: 20,
              v: "5.103"
            },
            function(r) {
              if (r.response && r.response.items && r.response.items.length) {
                let events = [];
                
                r.response.items.forEach(item => {
                  const { text, owner_id, id } = item;
  
                  const eventId = `${owner_id}_${id}`;
                  const start = that._parseStart(text);
                  const end = that._parseEnd(text);
                  const summary = that._parseSummary(text);
                  const description = text;
                  const location = that._parseLocation(text);
                  const contact = "https://vk.com/afisha_39";
                  const reference = `https://vk.com/wall${owner_id}_${id}`;
  
                  const event = new Event(eventId, start, end, summary, description, location, contact, reference);
  
                  events.unshift(event);
                });
  
                if (events.length) {
                  that.events = events;
                  cbSuccess(events);
                } else {
                  cbError("No events has been parsed from VK wall posts.");
                }              
              } else {
                cbError("No VK wall post found.");
              }
            }
          );
        } else {
          cbError("User VK is not authorized");
        }
      });
    } else {
      cbError("No VK module found. Make sure https://vk.com/js/api/openapi.js script has been added to web page.");
    }
  }
};

export default AfishaKalinigrad;
