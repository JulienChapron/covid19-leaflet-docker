import navigation from "@/store/modules/navigation.js"

describe("store/modules/navigation.js", () => {
  it("1. mutation theme", async () => {
    const testTheme = 'dark'
    const state = {
      theme: 'light'
    }
    navigation.mutations.theme(state, testTheme )
    expect(state).toStrictEqual({
      theme: 'dark'
    })
  });
  it("2. action theme", async () => {
    const testTheme = 'dark'
    const state = {
      theme: 'light'
    }
    navigation.mutations.theme(state, testTheme )
    expect(state).toStrictEqual({
      theme: 'dark'
    })
  });
});
