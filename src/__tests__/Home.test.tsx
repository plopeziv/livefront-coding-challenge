import { screen, render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import mockData from "../../public/scratch/season_standings.json";

import Home from "@/app/page";

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve(mockData));
});

afterEach(() => {
  jest.restoreAllMocks();
});

expect.extend(toHaveNoViolations);
describe("<Home />", () => {
  test("It should render a table", async () => {
    render(<Home />);

    await screen.findAllByRole("table");

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  test("It should be accessible", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
