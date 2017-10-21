import { FilterValueConverter } from "../../../../resources/value-converters/filter";
import TestData from "./test-data";

describe("the filter value converter", () => {
  let sut;

  beforeEach(() => {
    sut = new FilterValueConverter();
  });

  it("should filter a list of books", () => {
    const books = [TestData.Books.WarAndPeace, TestData.Books.Oliver];

    const expectedResult = [TestData.Books.Oliver]

    const result = sut.toView(books, "Ol");

    expect(result).toEqual(expectedResult);
  });

});
