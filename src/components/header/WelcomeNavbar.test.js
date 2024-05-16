import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import WelcomeNavbar from "./WelcomeNavbar";

describe("WelcomeNavbar", () => {
  it("renders correctly when signed in", () => {
    const { getByAltText, queryByText } = render(<WelcomeNavbar signedIn={true} />);
    
    expect(getByAltText("Your Company")).toBeInTheDocument();
    expect(queryByText("Sign In")).toBeNull();
  });

  it("renders correctly when not signed in", () => {
    const { getByAltText, getByText } = render(
      <Router>
        <WelcomeNavbar signedIn={false} />
      </Router>
    );

    expect(getByAltText("Your Company")).toBeInTheDocument();
    expect(getByText("Sign In")).toBeInTheDocument();
  });
});
