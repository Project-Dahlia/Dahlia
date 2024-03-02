const request = require("supertest");
const express = require("express");
const app = require("../app");

describe("Test the root path", () => {
  test("It should respond with the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual("Hello Parking User");
  });
});
