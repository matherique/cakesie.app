import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import Logo from "@/public/logo.png";

type BreadcrumbItem = {
  href: string;
  label: string;
};

type Props = {
  children: React.ReactNode;
  breadcrumb?: BreadcrumbItem[];
};

function CartIcon({ hasItens }: { hasItens: boolean }) {
  if (hasItens) {
    return <FaCartPlus size={30} color="#9333ea" />;
  }

  return <FaShoppingCart size={30} color="#9333ea" />;
}

function Menu() {
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-4 text-gray-500 hover:text-gray-700 focus:text-gray-700">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between">
        <div className="container-fluid basis-1/2">
          <Link href="/">
            <a className="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1">
              <Image src={Logo} alt="logo" width={200} height={100} />
            </a>
          </Link>
        </div>
        <div className="container-fluid flex items-center gap-x-5">
          <Link href="/criar-conta">
            <a className="text-purple-600 hover:text-purple-700 transition duration-300 ease-in-out">
              Criar conta
            </a>
          </Link>
          <Link href="/entrar">
            <a className="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
              Entrar
            </a>
          </Link>
          <Link href="/carrinho-de-compras">
            <a>
              <CartIcon hasItens={false} />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function Layout({ children, breadcrumb }: Props) {
  return (
    <section className="">
      <div className="mx-auto w-8/12">
        <Menu />
        <nav className="rounded-md w-full">
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
