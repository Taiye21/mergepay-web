"use client";

import { useEffect, useState } from "react";
import { useAnchorSession } from "@/lib/queries";
import { mapAnchorStatusToUiState } from "@/lib/anchor-state";

export function useAnchorTransaction(sessionId: string | null) {
  const query = useAnchorSession(sessionId);
  const [open, setOpen] = useState(Boolean(sessionId));

  useEffect(() => {
    setOpen(Boolean(sessionId));
  }, [sessionId]);

  const session = query.data?.session;
  return {
    ...query,
    session,
    uiState: session ? mapAnchorStatusToUiState(session.status) : "unknown",
    open,
    close: () => setOpen(false),
  };
}
