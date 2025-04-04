import { screen, render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import Home from "@/app/page";

expect.extend(toHaveNoViolations);

describe("<Home />", () => {
  test("It should render Home component", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  test("It should be accessible", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
