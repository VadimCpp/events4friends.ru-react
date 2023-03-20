import { getSeason, seasonal, WINTER, SPRING, SUMMER, AUTUMN  } from "./utils";

describe('utils', () => {
  describe('getSeason', () => {
    it('should return season number 1 for dates in December to February', () => {
      const date = new Date('2022-01-01');
      expect(getSeason(date)).toBe(1);
    });

    it('should return season number 2 for dates in March to May', () => {
      const date = new Date('2022-04-01');
      expect(getSeason(date)).toBe(2);
    });

    it('should return season number 3 for dates in June to August', () => {
      const date = new Date('2022-07-01');
      expect(getSeason(date)).toBe(3);
    });

    it('should return season number 4 for dates in September to November', () => {
      const date = new Date('2022-10-01');
      expect(getSeason(date)).toBe(4);
    });

    it('should return season number 1 for dates in January of next year', () => {
      const date = new Date('2022-01-01');
      date.setFullYear(date.getFullYear() + 1);
      expect(getSeason(date)).toBe(1);
    });

    it('should throw an error if the input is not a date object', () => {
      expect(() => getSeason('2022-01-01')).toThrow();
    });
  });

  describe("seasonal function", () => {
    const winterDate = new Date("2023-01-01T00:00:00Z");
    const springDate = new Date("2023-04-01T00:00:00Z");
    const summerDate = new Date("2023-07-01T00:00:00Z");
    const autumnDate = new Date("2023-10-01T00:00:00Z");
  
    describe("footer", () => {
      it("returns bg-sky-600 in winter", () => {
        expect(seasonal("footer", winterDate)).toBe("bg-sky-600");
      });
  
      it("returns bg-green-600 in spring", () => {
        expect(seasonal("footer", springDate)).toBe("bg-green-600");
      });
  
      it("returns bg-yellow-600 in summer", () => {
        expect(seasonal("footer", summerDate)).toBe("bg-yellow-600");
      });
  
      it("returns bg-orange-600 in autumn", () => {
        expect(seasonal("footer", autumnDate)).toBe("bg-orange-600");
      });
    });
  
    describe("section", () => {
      it("returns section section--sky in winter", () => {
        expect(seasonal("section", winterDate)).toBe("section section--sky");
      });
  
      it("returns section section--green in spring", () => {
        expect(seasonal("section", springDate)).toBe("section section--green");
      });
  
      it("returns section section--yellow in summer", () => {
        expect(seasonal("section", summerDate)).toBe("section section--yellow");
      });
  
      it("returns section section--orange in autumn", () => {
        expect(seasonal("section", autumnDate)).toBe("section section--orange");
      });
    });
  
    describe("header", () => {
      it("returns bg-sky-600 in winter", () => {
        expect(seasonal("header", winterDate)).toBe("bg-sky-600");
      });
  
      it("returns bg-green-600 in spring", () => {
        expect(seasonal("header", springDate)).toBe("bg-green-600");
      });
  
      it("returns bg-yellow-600 in summer", () => {
        expect(seasonal("header", summerDate)).toBe("bg-yellow-600");
      });
  
      it("returns bg-orange-600 in autumn", () => {
        expect(seasonal("header", autumnDate)).toBe("bg-orange-600");
      });
    });
  
    describe("section__button", () => {
      it("returns section__button section__button--sky in winter", () => {
        expect(seasonal("section__button", winterDate)).toBe("section__button section__button--sky");
      });
  
      it("returns section__button section__button--green in spring", () => {
        expect(seasonal("section__button", springDate)).toBe("section__button section__button--green");
      });
  
      it("returns section__button section__button--yellow in summer", () => {
        expect(seasonal("section__button", summerDate)).toBe("section__button section__button--yellow");
      });
  
      it("returns section__button section__button--orange in autumn", () => {
        expect(seasonal("section__button", autumnDate)).toBe("section__button section__button--orange");
      });
    });

    describe("section__nummer", () => {
      it("returns section__nummer section__nummer--sky in winter", () => {
        expect(seasonal("section__nummer", winterDate)).toBe("section__nummer section__nummer--sky");
      });
  
      it("returns section__nummer section__nummer--green in spring", () => {
        expect(seasonal("section__nummer", springDate)).toBe("section__nummer section__nummer--green");
      });
  
      it("returns section__nummer section__nummer--yellow in summer", () => {
        expect(seasonal("section__nummer", summerDate)).toBe("section__nummer section__nummer--yellow");
      });
  
      it("returns section__nummer section__nummer--orange in autumn", () => {
        expect(seasonal("section__nummer", autumnDate)).toBe("section__nummer section__nummer--orange");
      });
    });

    describe("logo", () => {
      it("returns logo in winter", () => {
        expect(seasonal("logo", winterDate)).toBe("/icons/community/events4friends-ny-64x64.png");
      });
  
      it("returns logo in spring", () => {
        expect(seasonal("logo", springDate)).toBe("/icons/community/events4friends-spring-64x64.png");
      });
  
      it("returns logo in summer", () => {
        expect(seasonal("logo", summerDate)).toBe("/icons/community/events4friends-summer-64x64.png");
      });
  
      it("returns logo in autumn", () => {
        expect(seasonal("logo", autumnDate)).toBe("/icons/community/events4friends-autumn-64x64.png");
      });
    });

    it("should not work", () => {
      expect(seasonal("not-existing-component")).toBe("");
    });
  });
});
