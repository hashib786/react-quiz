import { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode }) => {
  return <main className="main">{children}</main>;
};

export default Content;
