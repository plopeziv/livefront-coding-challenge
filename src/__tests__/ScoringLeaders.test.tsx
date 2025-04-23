import { axe, toHaveNoViolations } from "jest-axe";
import ScoringLeaders from "../app/scoring_leaders/[team_name]/page";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";

import mockData from "./scratch_files/complete_scoring_summary_fetch.json";
import userEvent from "@testing-library/user-event";

const pushMock = jest.fn();

jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: pushMock,
      replace: jest.fn(),
    }),
    usePathname: () => "/scoring_leaders/Arsenal_FC",
    useParams: () => ({
      team_name: "Arsenal_FC",
    }),
  };
});

expect.extend(toHaveNoViolations);

describe("<ScoringLeaders />", () => {
  const user = userEvent.setup();

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

  test("It should fetch data on render", async () => {
    render(<ScoringLeaders />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/scorers");
    });
  });

  test("It should render a loading spinner when loading", () => {
    render(<ScoringLeaders />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("It should render a table when loaded", async () => {
    render(<ScoringLeaders />);

    const renderedTable = await screen.findAllByRole("table");

    expect(renderedTable).toHaveLength(1);
  });

  test("Back button should return to home page", async () => {
    render(<ScoringLeaders />);

    const button = await screen.findByRole("button");

    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  test("Back button should allow keyboard navigaton by pressing Enter", async () => {
    render(<ScoringLeaders />);

    const button = await screen.findByRole("button", {
      name: /Go back to the homepage/i,
    });

    button.focus();
    await user.keyboard("[Enter]");

    expect(pushMock).toHaveBeenCalled();
  });

  test("Back button should allow keyboard navigaton by pressing Space", async () => {
    render(<ScoringLeaders />);

    const button = await screen.findByRole("button", {
      name: /Go back to the homepage/i,
    });

    button.focus();
    await user.keyboard("[Space]");

    expect(pushMock).toHaveBeenCalled();
  });

  test("It should be accessible", async () => {
    const { container } = render(<ScoringLeaders />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
