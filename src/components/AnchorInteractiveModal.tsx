"use client";

import { ExternalLink } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAnchorTransaction } from "@/hooks/useAnchorTransaction";
import { getStateDescription } from "@/lib/anchor-state";

export function AnchorInteractiveModal({
  sessionId,
  onClose,
}: {
  sessionId: string | null;
  onClose: () => void;
}) {
  const transfer = useAnchorTransaction(sessionId);
  const session = transfer.session;
  const isOpen = Boolean(sessionId) && transfer.open;

  function close() {
    transfer.close();
    onClose();
  }

  return (
    <Dialog open={isOpen} onClose={close} title="Complete anchor transfer" className="max-w-4xl">
      {transfer.isLoading && <p className="p-6 text-sm">Loading anchor session...</p>}
      {transfer.isError && (
        <div className="space-y-3 p-6">
          <p className="font-bold">We could not refresh this transfer.</p>
          <Button variant="outline" onClick={() => transfer.refetch()}>Retry</Button>
        </div>
      )}
      {session && (
        <div className="space-y-4 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink/10 pb-3">
            <p className="font-bold capitalize">{session.kind} · {session.assetCode}</p>
            <Badge tone={statusTone(session.status)}>{session.status.replace(/_/g, " ")}</Badge>
          </div>
          <p className="text-sm text-ink/70">{getStateDescription(transfer.uiState)}</p>
          {session.interactiveUrl && transfer.uiState === "pending" && (
            <iframe
              title="Anchor transfer"
              src={session.interactiveUrl}
              className="h-[min(65vh,36rem)] w-full rounded-xl border-3 border-ink bg-white"
              sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
            />
          )}
          {session.interactiveUrl && (
            <a href={session.interactiveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex">
              <Button variant="outline"><ExternalLink className="h-4 w-4" /> Open in new tab</Button>
            </a>
          )}
        </div>
      )}
    </Dialog>
  );
}
