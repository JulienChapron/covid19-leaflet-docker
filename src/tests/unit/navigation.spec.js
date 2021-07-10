import navigation from "@/store/modules/navigation.js"

describe("store/modules/navigation.js", () => {
  const state = {
    theme: 'light'
  }
  it("1. mutation theme", async () => {
    const testTheme = 'dark'
    navigation.mutations.theme(state, testTheme )
    expect(state).toStrictEqual({
      theme: 'dark'
    })
  });
  it("2. action theme", async () => {
    const commit = jest.fn()
    const testTheme = 'dark'
    await navigation.actions.updateTheme({ commit }, testTheme)
    expect(commit).toHaveBeenCalledWith(
      "theme", 'dark')
  });
  it("3. getter theme", async () => {
    const actual = navigation.getters.theme(state)
    expect(actual).toStrictEqual('dark')
  })
});
