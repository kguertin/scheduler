import React from "react";
import { render } from "@testing-library/react";
import Appointment from "../Appointment/index";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
