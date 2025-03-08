import { FC, ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <div
      className={
        "w-full max-w-[80%] mx-auto my-9 bg-white shadow-2xl rounded-2xl"
      }
    >
      {children}
    </div>
  );
};
