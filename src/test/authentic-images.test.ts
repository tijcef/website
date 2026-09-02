import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sha256 = (path: string) =>
  createHash("sha256").update(readFileSync(new URL(path, import.meta.url))).digest("hex");

describe("TIJCEF authentic programme photography", () => {
  it("preserves the five approved real-world image originals", () => {
    expect({
      hero: sha256("../assets/hero-woman.jpg"),
      education: sha256("../assets/girls-education.jpg"),
      dignity: sha256("../assets/health-dignity.jpg"),
      training: sha256("../assets/climate-action.jpg"),
      evidence: sha256("../assets/research.jpg"),
    }).toEqual({
      hero: "0d179629f9ec45ee0704f8407b059d5da5c931b82195d4e74cf3efd8a6d85e24",
      education: "aeb1e5422d27efb3590dd6e249eabff875b1a636323f3e9e278ca09a6506a802",
      dignity: "06f96290b9781f3281b3fd5b9758168b7a13d7c5685ebd02697f076f5396b0cb",
      training: "3ade28bbbc32c3c906bf56e0b583db08fc2d26bb17593b4a1ef1c25a6ed7d890",
      evidence: "78f6d1c5d5bb4f817b7d4cc723e259e8af2f8c20f9b1019e7ea48972afcb68fb",
    });
  });
});
