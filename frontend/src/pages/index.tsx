import type { NextPage } from "next";
import Image from "next/image";
import Menu from "../components/menu";
import Bolo from "../public/bolo.jpeg";

const Home: NextPage = () => {
  return (
    <section className="h-screen">
      <div className="mx-auto w-8/12">
        <Menu />
        <div className="relative">
          <input
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
            placeholder="Busque por bolo"
          />
        </div>

        <div className="container flex flex-wrap mx-auto gap-y-2 mt-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div className="basis-1/2 w-full" key={item}>
              <div className="flex">
                <div className="w-3/4 h-full">
                  <Image src={Bolo} alt="logo" objectFit="contain" />
                </div>
                <div className="flex flex-col justify-start p-2">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Card title
                  </h5>
                  <p className="text-gray-700 text-base">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
