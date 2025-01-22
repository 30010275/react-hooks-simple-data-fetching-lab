import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "https://via.placeholder.com/150" }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test("displays a loading message before fetching", () => {
  render(<App />);
  const loadingMessage = screen.getByText("Loading...");
  expect(loadingMessage).toBeInTheDocument();
});

test("displays the dog image after fetching", async () => {
  render(<App />);
  const img = await waitFor(() => screen.getByAltText("A Random Dog"));
  expect(img).toBeInTheDocument();
  expect(img.src).toBe("https://via.placeholder.com/150/");
});
