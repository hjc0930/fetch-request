import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import request from "../src";
import server from "./utils/mock-http";
import { BASE_URL } from "./utils/constand";

describe("Request with params", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  afterEach(() => server.resetHandlers());

  it("Basic request with params", async () => {
    const response = await request({
      url: BASE_URL,
      params: {
        a: 1,
        b: 2,
      },
    });

    expect(response.data.params).toEqual({
      a: 1,
      b: 2,
    });
  });
});
