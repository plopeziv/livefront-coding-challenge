import { screen, render } from "@testing-library/react";
import ScoringTable from "../app/scoring_leaders/[team_name]/components/ScoringTable";
import mockData from "./scratch_files/liverpool_scoring_summary_sample.json";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";

describe("<ScoringTable />", () => {
  test("It should render scoring leaders", async () => {
    render(<ScoringTable rowData={mockData} />);

    const mohamed = await screen.findByText("Mohamed Salah");

    expect(mohamed).toBeInTheDocument();
  });

  test("It should be accessible", async () => {
    const { container } = render(<ScoringTable rowData={mockData} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
