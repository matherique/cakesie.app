import Link from "next/link";
import * as React from "react";
import { TypeOf } from "yup";
import Menu from "../components/menu";

type BreadcrumbItem = {
  href: string;
  label: string;
};

type Props = {
  children: React.ReactNode;
  breadcrumb?: BreadcrumbItem[];
};

export default function Layout({ children, breadcrumb }: Props) {
  let a = [1, 2, 3, 4, 5];
  return (
    <section className="">
      <div className="mx-auto w-8/12">
        <Menu />
        <nav className="bg-grey-light rounded-md w-full">
          <ol className="list-reset flex">
            {breadcrumb &&
              breadcrumb.map((item, index) => {
                const isLastItem = index === breadcrumb.length - 1;
                return (
                  <React.Fragment key={index}>
                    <li className="text-gray-500">
                      {!isLastItem ? (
                        <a
                          href={item.href}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          {item.label}{" "}
                        </a>
                      ) : (
                        item.label
                      )}
                    </li>
                    {!isLastItem ? (
                      <li>
                        <span className="text-gray-500 mx-2">{`>`}</span>
                      </li>
                    ) : null}
                  </React.Fragment>
                );
              })}
          </ol>
        </nav>
        {children}
      </div>
    </section>
  );
}
