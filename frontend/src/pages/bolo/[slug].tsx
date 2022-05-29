import Image from "next/image";
import * as React from "react";
import Layout from "../../components/layout";
import Bolo from "../../public/bolo.jpeg";

export default function CakeDetails() {
  return (
    <Layout>
      <nav className="bg-grey-light rounded-md w-full">
        <ol className="list-reset flex">
          <li>
            <a href="#" className="text-purple-600 hover:text-purple-700">
              Home
            </a>
          </li>
          <li>
            <span className="text-gray-500 mx-2">{`>`}</span>
          </li>
          <li>
            <a href="#" className="text-purple-600 hover:text-purple-700">
              Bolo
            </a>
          </li>
          <li>
            <span className="text-gray-500 mx-2">{`>`}</span>
          </li>
          <li className="text-gray-500">Bolo de chocolate</li>
        </ol>
      </nav>
      <h1 className="font-medium leading-tight text-3xl mt-5 mb-2 text-purple-800">
        Bolo de chocolate
      </h1>
      <div className="container">
        <div className="flex gap-7">
          <div className="basis-2/5 ">
            <Image
              src={Bolo}
              alt="logo"
              objectFit="contain"
              layout="responsive"
              className="rounded-lg"
            />
          </div>

          <div className="basis-3/5">
            <div className="flex flex-col h-full justify-between">
              <div className="box-border">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
                fugit voluptatum commodi repellendus architecto labore quam quos
                iure non ea. Voluptatem unde similique vitae, in aperiam eaque
                veniam explicabo mollitia. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Itaque velit consectetur sit
                expedita provident, dolor, quos eius, beatae sequi optio sunt
                amet nulla reiciendis fugit error! Dolorum sunt tempora
                veritatis.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
                fugit voluptatum commodi repellendus architecto labore quam quos
                iure non ea. Voluptatem unde similique vitae, in aperiam eaque
                veniam explicabo mollitia. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Itaque velit consectetur sit
                expedita provident, dolor, quos eius, beatae sequi optio sunt
                amet nulla reiciendis fugit error! Dolorum sunt tempora
                veritatis.
              </div>
              <div className="self-end flex justify-between w-full">
                <h1 className="font-medium text-4xl">R$ 100,00</h1>
                <button className="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="overflow-hidden text-gray-700 ">
          <div className="container py-2 mx-auto lg:pt-12">
            <h1 className="font-medium leading-tight text-2xl mt-0 mb-2">
              Mais fotos
            </h1>
            <div className="flex flex-wrap -m-1 md:-m-2">
              {Array.from({ length: 15 }).map((_, i) => (
                <div className="flex flex-wrap w-1/4" key={i}>
                  <div className="w-full p-1 md:p-2">
                    <Image
                      src={Bolo}
                      alt="logo"
                      objectFit="contain"
                      layout="responsive"
                      className="block object-cover object-center w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
