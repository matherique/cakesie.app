import * as React from "react";
import Menu from "../components/menu";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <section className="">
      <div className="mx-auto w-8/12">
        <Menu />
        {children}
      </div>
    </section>
  );
}
