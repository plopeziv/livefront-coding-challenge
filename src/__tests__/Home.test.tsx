import { screen, render, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import mockData from "./scratch_files/premier_league_fetch.json";

import Home from "../app/page";

jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      replace: jest.fn(),
    }),
    usePathname: () => "/",
  };
});

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

expect.extend(toHaveNoViolations);
describe("<Home />", () => {
  test("It should render a table", async () => {
    render(<Home />);

    const renderedTable = await screen.findAllByRole("table");

    expect(renderedTable).toHaveLength(1);
  });

  test("It should fetch data on render", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/standings");
    });
  });

  test("It should be accessible", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
