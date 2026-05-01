import { render, screen } from "@testing-library/react";
import App from "./App";

test("App renders the site title", () => {
  render(<App />);
  expect(screen.getByText(/darrenchow\.me/i)).toBeInTheDocument();
});
