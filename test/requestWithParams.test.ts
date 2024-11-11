import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  vi,
  beforeEach,
} from "vitest";
import request from "../src";
import server, { resetHandlers } from "./utils/mock-http";
import { BASE_URL } from "./utils/constand";
import { readFileSync } from "node:fs";
import { fs, vol } from "memfs";

const readHelloWorld = (path) => {
  return readFileSync(path, {
    encoding: "utf-8",
  });
};

// tell vitest to use fs mock from __mocks__ folder
// this can be done in a setup file if fs should always be mocked
vi.mock("node:fs");
vi.mock("node:fs/promises");

describe("Request with params", () => {
  beforeEach(() => {
    vol.reset();
  });
  afterEach(() => {
    resetHandlers();
  });
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("Request with query", async () => {
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

    // Simple method
    const responseFormSimpleMethod = await request.get(BASE_URL, {
      params: {
        a: 1,
        b: 2,
      },
    });
    expect(responseFormSimpleMethod.data.params).toEqual({
      a: 1,
      b: 2,
    });
  });

  it("Request with param", async () => {
    const response = await request({
      url: BASE_URL + "/users/1",
    });
    expect(response.data).toEqual({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    });
    try {
      await request({
        url: BASE_URL + "/users/3",
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.data).toEqual("");
    }

    // Simple method
    const responseFormSimpleMethod = await request.get(BASE_URL + "/users/1");
    expect(responseFormSimpleMethod.data).toEqual({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    });
    try {
      await request.get(BASE_URL + "/users/3");
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.data).toEqual("");
    }
  });

  it("Request with body", async () => {
    const response = await request({
      url: BASE_URL + "/users",
      method: "post",
      data: {
        name: "Bob",
        email: "bob@example.com",
      },
    });
    expect(response.data).toEqual({
      id: 3,
      name: "Bob",
      email: "bob@example.com",
    });
    expect(response.response.status).toBe(201);

    // Simple method
    const responseFormSimpleMethod = await request.post(BASE_URL + "/users", {
      data: {
        name: "Bob",
        email: "bob@example.com",
      },
    });
    expect(responseFormSimpleMethod.data).toEqual({
      id: 4,
      name: "Bob",
      email: "bob@example.com",
    });
    expect(responseFormSimpleMethod.response.status).toBe(201);
  });

  it("Request with body and param", async () => {
    const response = await request({
      url: BASE_URL + "/users/1",
      method: "put",
      data: {
        name: "Alice",
        email: "alice@example.com",
      },
    });
    expect(response.response.status).toBe(200);
    expect(response.data).toEqual({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    });

    // Simple method
    const responseFormSimpleMethod = await request.put(BASE_URL + "/users/1", {
      data: {
        name: "Alice",
        email: "alice@example.com",
      },
    });
    expect(responseFormSimpleMethod.response.status).toBe(200);
    expect(responseFormSimpleMethod.data).toEqual({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    });
  });

  it("The delete method request with param", async () => {
    await request({
      url: BASE_URL + "/users/1",
      method: "delete",
    });

    const response = await request.get(BASE_URL + "/users");
    expect(response.data).toEqual([
      { id: 2, name: "Bob", email: "bob@example.com" },
    ]);

    // Simple method
    try {
      await request.delete(BASE_URL + "/users/1");
    } catch (error) {
      expect(error.response.status).toBe(404);
      const responseFormSimpleMethod = await request.get(BASE_URL + "/users");
      expect(responseFormSimpleMethod.data).toEqual([
        { id: 2, name: "Bob", email: "bob@example.com" },
      ]);
    }
  });
  it("Request with form data", async () => {
    const data = {
      name: "Alice",
      email: "alice@example.com",
    };
    const response = await request.post(BASE_URL + "/form", {
      data,
      requestType: "form",
    });

    expect(response.data).toEqual(data);
  });

  it("should return correct text", () => {
    const path = "/hello-world.txt";
    fs.writeFileSync(path, "hello world", {
      encoding: "utf-8",
    });

    const text = readHelloWorld(path);
    expect(text).toBe("hello world");
  });

  it("Request with file", async () => {
    // const file = new File(["hello"], "hello.txt", {
    //   type: "text/plain",
    // });
    const formData = new FormData();
    formData.append("file", "123123");

    const response = await request.post(BASE_URL + "/file", {
      data: formData,
      // responseType: "blob",
    });

    expect(response.data).toBeInstanceOf(Blob);
  });
});
