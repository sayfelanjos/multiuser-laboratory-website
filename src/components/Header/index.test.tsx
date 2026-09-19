import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./index";
import { INTRANET_URL } from "../../constants/urls";
import { useAuth } from "../../hooks/useAuth";

jest.mock("../../hooks/useAuth", () => ({ useAuth: jest.fn() }));
jest.mock("../../helpers/signOutUser", () => ({ signOutUser: jest.fn() }));

const mockedUseAuth = useAuth as jest.Mock;

const renderHeader = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

describe("Header intranet link", () => {
  describe.each([
    ["signed out", null],
    ["signed in", { displayName: "Test User", email: "test@example.com" }],
  ])("when the user is %s", (_label, user) => {
    beforeEach(() => {
      mockedUseAuth.mockReturnValue({
        user,
        role: "user",
        isLoading: false,
        refreshUserData: jest.fn(),
      });
    });

    it("links to the intranet site in a new tab", () => {
      renderHeader();

      const link = screen.getByRole("link", { name: /intranet/i });

      expect(link).toHaveAttribute("href", INTRANET_URL);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("tells assistive technology that the link opens in a new tab", () => {
      renderHeader();

      expect(
        screen.getByRole("link", { name: /intranet.*abre em nova aba/i }),
      ).toBeInTheDocument();
    });

    it("keeps the other main navigation links", () => {
      renderHeader();

      expect(screen.getByRole("link", { name: /contato/i })).toHaveAttribute(
        "href",
        "/contact",
      );
      expect(
        screen.getByRole("link", { name: /agendamentos/i }),
      ).toBeInTheDocument();
    });
  });
});
