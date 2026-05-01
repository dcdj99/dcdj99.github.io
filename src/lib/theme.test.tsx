import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "./theme";

function Probe() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>toggle</button>
    </>
  );
}

test("ThemeProvider toggles between light and dark", async () => {
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );
  const initial = screen.getByTestId("theme").textContent;
  expect(initial === "light" || initial === "dark").toBe(true);
  await userEvent.click(screen.getByRole("button", { name: /toggle/i }));
  expect(screen.getByTestId("theme").textContent).not.toBe(initial);
});

test("ThemeProvider applies the dark class to html", async () => {
  render(
    <ThemeProvider initial="dark">
      <Probe />
    </ThemeProvider>
  );
  expect(document.documentElement.classList.contains("dark")).toBe(true);
});
