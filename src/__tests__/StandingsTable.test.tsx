import { screen, render, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";

import mockData from "./scratch_files/sample_standings.json";
import StandingsTable from "../app/components/StandingsTable";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("<StandingsTable />", () => {
  const pushMock = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("It renders teams in data", async () => {
    render(<StandingsTable rowData={mockData} />);

    const liverpool = await screen.findByText("Liverpool FC");

    expect(liverpool).toBeInTheDocument();
  });

  test("Clicking on a row should navigate to the team scorers page", async () => {
    render(<StandingsTable rowData={mockData} />);

    const row = await screen.findByRole("row", { name: /Liverpool FC/i });

    fireEvent.click(row);

    expect(pushMock).toHaveBeenCalledWith("/scoring_leaders/Liverpool_FC");
  });

  test("Row navigation should support accessibilty enter click events", async () => {
    render(<StandingsTable rowData={mockData} />);

    const row = await screen.findByRole("row", { name: /Liverpool FC/i });

    row.focus();
    await user.keyboard("[Enter]");

    expect(pushMock).toHaveBeenCalledWith("/scoring_leaders/Liverpool_FC");
  });

  test("Row navigation should support accessibilty space bar click events", async () => {
    render(<StandingsTable rowData={mockData} />);

    const row = await screen.findByRole("row", { name: /Liverpool FC/i });

    row.focus();
    await user.keyboard("[Space]");

    expect(pushMock).toHaveBeenCalledWith("/scoring_leaders/Liverpool_FC");
  });

  test("It should be accessible", async () => {
    const { container } = render(<StandingsTable rowData={mockData} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
