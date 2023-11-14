const loginUser = require("../loginUser.js");

describe("loginUser function", () => {
  test("user not found", async () => {
    const result = await loginUser("nonexistent@test.com", "password123");
    expect(result).toEqual("user not found");
  });

  test("login successfully", async () => {
    const result = await loginUser("carlos@test.com", "321");
    expect(result).toEqual({ access: true, id: 1 });
  });
  test("password incorrect", async () => {
    const result = await loginUser("carlos@test.com", "3211");
    expect(result).toEqual("password incorrect");
  });
});
