import { describe, expect, it } from "vitest";
import {
  ANCHOR_POLL_INTERVAL_MS,
  ANCHOR_POLL_MAX_PERSISTENT_FAILURES,
  anchorPollInterval,
  isTerminalAnchorStatus,
} from "../anchor-state";

describe("anchor polling", () => {
  it.each(["completed", "error", "refunded"] as const)(
    "stops polling after %s",
    (status) => {
      expect(
        anchorPollInterval({ state: { data: { status } }, failureCount: 0 })
      ).toBe(false);
      expect(isTerminalAnchorStatus(status)).toBe(true);
    }
  );

  it("continues polling while a transfer is pending", () => {
    expect(
      anchorPollInterval({
        state: { data: { status: "pending_anchor" } },
        failureCount: 0,
      })
    ).toBe(ANCHOR_POLL_INTERVAL_MS);
  });

  it("stops after persistent polling failures", () => {
    expect(
      anchorPollInterval({
        state: { data: { status: "pending_anchor" } },
        failureCount: ANCHOR_POLL_MAX_PERSISTENT_FAILURES,
      })
    ).toBe(false);
  });
});
