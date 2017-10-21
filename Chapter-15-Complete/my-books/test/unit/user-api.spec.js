import { UserApi } from "../../../../services/user-api";
import { TestHelper } from "./test-helper";
import TestData from "./test-data";

describe("the UserApi service", () => {
  let httpClient, sut;
  let countries = TestData.Countries;
  let users = TestData.Users;

  let testUsers = beforeEach(() => {
    httpClient = jasmine.createSpyObj("HttpClient", ["fetch"]);
    sut = new UserApi(httpClient);
  });

  it("loads user's country", done => {
    httpClient.fetch.and.returnValue(
      TestHelper.mockResponseAsync(countries)
    );
    sut
      .loadCountry("au")
      .then(result => expect(result).toEqual(countries[0]))
      .then(() =>
        expect(httpClient.fetch).toHaveBeenCalledWith("countries?code=au")
      )
      .then(done);
  });

  it("loads an empty country as a fallback", done => {
    httpClient.fetch.and.returnValue(TestHelper.mockResponseAsync([]));
    sut
      .loadCountry()
      .then(result => expect(result).toEqual({ code: "", name: "" }))
      .then(() =>
        expect(httpClient.fetch).toHaveBeenCalledWith(
          "countries?code=undefined"
        )
      )
      .then(done);
  });

  it("gets all users", done => {
    httpClient.fetch.and.returnValue(TestHelper.mockResponseAsync(users));
    sut
      .getUsers()
      .then(result => expect(result).toEqual(users))
      .then(() => expect(httpClient.fetch).toHaveBeenCalledWith("users"))
      .then(done);
  });
});
