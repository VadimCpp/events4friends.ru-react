export const WINTER = 1;
export const SPRING = 2;
export const SUMMER = 3;
export const AUTUMN = 4;

/**
 * Here's a function that takes a date object as input and returns the corresponding season number based on the month.
 * 
 * @param {Date} date 
 * @returns 
 */
export const getSeason = (date) => {
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so we add 1 to get 1-12
  if (month >= 3 && month <= 5) {
    return 2; // spring
  } else if (month >= 6 && month <= 8) {
    return 3; // summer
  } else if (month >= 9 && month <= 11) {
    return 4; // autumn
  } else {
    return 1; // winter (December to February)
  }
}

/**
 * The function return class depends on the season of the year.
 * @param {string} componentName Any string such as class name, file name, etc.
 * @param {Date=} date
 */
export const seasonal = (componentName, date = new Date()) => {
  if (componentName === "footer") {
    switch (getSeason(date)) {
      case WINTER: return "bg-sky-600";
      case SPRING: return "bg-green-600";
      case SUMMER: return "bg-yellow-600";
      case AUTUMN: return "bg-orange-600";
    }
  } else if (componentName === "section") {
    switch (getSeason(date)) {
      case WINTER: return "section section--sky";
      case SPRING: return "section section--green";
      case SUMMER: return "section section--yellow";
      case AUTUMN: return "section section--orange";
    }
  } else if (componentName === "header") {
    switch (getSeason(date)) {
      case WINTER: return "bg-sky-600";
      case SPRING: return "bg-green-600";
      case SUMMER: return "bg-yellow-600";
      case AUTUMN: return "bg-orange-600";
    }
  } else if (componentName === "section__button") {
    switch (getSeason(date)) {
      case WINTER: return "section__button section__button--sky";
      case SPRING: return "section__button section__button--green";
      case SUMMER: return "section__button section__button--yellow";
      case AUTUMN: return "section__button section__button--orange";
    }
  } else if (componentName === "section__nummer") {
    switch (getSeason(date)) {
      case WINTER: return "section__nummer section__nummer--sky";
      case SPRING: return "section__nummer section__nummer--green";
      case SUMMER: return "section__nummer section__nummer--yellow";
      case AUTUMN: return "section__nummer section__nummer--orange";
    }
  } else if (componentName === "logo") {
    switch (getSeason(date)) {
      case WINTER: return "/icons/community/events4friends-ny-64x64.png";
      case SPRING: return "/icons/community/events4friends-spring-64x64.png";
      case SUMMER: return "/icons/community/events4friends-summer-64x64.png";
      case AUTUMN: return "/icons/community/events4friends-autumn-64x64.png";
    }
  }

  return "";
};
