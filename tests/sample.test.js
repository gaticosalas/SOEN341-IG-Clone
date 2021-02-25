describe("Sample Test", () => {
    it("should see it 1 + 2 = 3", () => {
      const test = 1 + 2
  
      expect(test).toEqual(3);
    });
});

describe("Sample Test 2", () => {
    it("should see it two variables match", () => {
        const var1 = "hello world";
        const var2 = "hello world";

        expect(var1).toEqual(var2);
    });
});