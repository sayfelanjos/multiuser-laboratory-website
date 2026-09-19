import { readFileSync } from "fs";
import { resolve } from "path";
import { INTRANET_URL } from "./constants/urls";

type Redirect = { source: string; destination: string; type: number };

const { hosting } = JSON.parse(
  readFileSync(resolve(process.cwd(), "firebase.json"), "utf-8"),
);

describe("firebase hosting config", () => {
  const redirects: Redirect[] = hosting.redirects ?? [];

  it.each(["/intranet", "/intranet/**"])(
    "redirects %s to the intranet site with a temporary redirect",
    (source) => {
      const redirect = redirects.find((r) => r.source === source);

      expect(redirect).toBeDefined();
      expect(redirect?.destination).toBe(INTRANET_URL);
      expect(redirect?.type).toBe(302);
    },
  );

  it("keeps the SPA catch-all rewrite so client-side routes still work", () => {
    expect(hosting.rewrites).toContainEqual({
      source: "**",
      destination: "/index.html",
    });
  });
});
