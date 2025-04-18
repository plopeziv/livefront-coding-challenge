import { screen, render, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";

import mockData from "./data/sample-standings.json";
import StandingsTable from "../app/components/StandingsTable";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("<StandingsTable />", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
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
    fireEvent.keyDown(row, { key: "Enter" });

    expect(pushMock).toHaveBeenCalledWith("/scoring_leaders/Liverpool_FC");
  });

  test("Row navigation should support accessibilty space bar click events", async () => {
    render(<StandingsTable rowData={mockData} />);

    const row = await screen.findByRole("row", { name: /Liverpool FC/i });

    row.focus();
    fireEvent.keyDown(row, { key: " " });

    expect(pushMock).toHaveBeenCalledWith("/scoring_leaders/Liverpool_FC");
  });

  test("It should be accessible", async () => {
    const { container } = render(<StandingsTable rowData={mockData} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
