import { FC, ReactNode } from "react";

interface InlineProps {
  children: ReactNode;
}

export const Inline: FC<InlineProps> = ({ children }) => {
  return (
    <div className={"flex items-center gap-3 *:flex-1 *:w-full"}>
      {children}
    </div>
  );
};
