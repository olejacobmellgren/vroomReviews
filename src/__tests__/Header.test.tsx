import { render } from "@testing-library/react";
import Header from "../components/Header";
import { test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

test("Go to different pages", async () => {
  const { getByText, asFragment } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const browse = getByText("Browse cars");
  expect(browse).toBeTruthy(); // The text is found
  await userEvent.click(browse);
  expect(asFragment()).toMatchSnapshot();

  const favorites = getByText("Favorites");
  expect(favorites).toBeTruthy(); // The text is found
  await userEvent.click(favorites);
  expect(asFragment()).toMatchSnapshot();

  const reviews = getByText("Your reviews");
  expect(reviews).toBeTruthy(); // The text is found
  await userEvent.click(reviews);
  expect(asFragment()).toMatchSnapshot();
});