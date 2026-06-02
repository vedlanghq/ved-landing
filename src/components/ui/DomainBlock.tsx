import React from "react";
import { Card } from "./Card";

interface DomainBlockProps {
  domainId: string;
  title: string;
  children: React.ReactNode;
  status?: "active" | "converging" | "quiescent" | "fault";
}

export function DomainBlock({
  domainId,
  title,
  children,
  status = "active",
}: Readonly<DomainBlockProps>) {
  const statusColors = {
    active: "text-[#00ff00]",
    converging: "text-lexum-accent",
    quiescent: "text-lexum-muted",
    fault: "text-red-500",
  };

  return (
    <Card className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-start border-b border-lexum-border pb-3 mb-2">
        <div>
          <div className="text-tag text-lexum-muted mb-1">
            DOMAIN: {domainId}
          </div>
          <h3 className="font-sans font-semibold text-lexum-text tracking-tight">
            {title}
          </h3>
        </div>
        <div className={`text-tag ${statusColors[status]}`}>
          [{status.toUpperCase()}]
        </div>
      </div>
      <div className="text-mono-body text-lexum-text flex-1">{children}</div>
    </Card>
  );
}
