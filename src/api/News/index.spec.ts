import { NewsApi } from "./index";
describe("Published News EndPoint", () => {
  test("200 test", async () => {
    const result = await NewsApi.GetPublishedNews();
    expect(result.status).toBe(1);
  });

  test("Get Just one news test", async () => {
    const result = await NewsApi.GetPublishedNews({
      NewsId: "5f0c28d7e3cc4416849980a8",
    });
    expect(result.status).toBe(1);
  });
});
