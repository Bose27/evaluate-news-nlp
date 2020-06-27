// Import the js file to test
import { validURL } from "../client/js/checkValidURL";

describe("Testing the submit functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test("Testing the validURL() function", () => {
    expect(validURL).toBeDefined();
  });
});

describe("Testing the valid url functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.
  test("Testing the validURL() function", () => {
    expect(validURL("https://www.facebook.com").valueOf(true));
  });
});
