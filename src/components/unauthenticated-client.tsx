import Image from "next/image";
import * as React from "react";
import Logo from "@public/logo.png";

type Props = {
  children: React.ReactNode;
};

export default function UnauthenticatedClient({ children }: Props) {
  return (
    <section className="h-screen">
      <div className="container mx-auto px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-4/12 mb-12 md:mb-0">
            <Image src={Logo} layout="responsive" alt="logo" />
          </div>
          <div className="md:w-2/12 lg:w-3/12 lg:ml-20">{children}</div>
        </div>
      </div>
    </section>
  );
}
