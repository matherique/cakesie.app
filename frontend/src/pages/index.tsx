import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import Bolo from "../public/bolo.jpeg";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(['hello', { text: 'client' }]);
  console.log(hello)

  return (
    <Layout>
      <div className="relative">
        <input
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
          placeholder="Busque por bolo"
        />
      </div>
      <div className="container flex flex-wrap mx-auto gap-y-4  mt-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div className="basis-1/2 shadow-md p-2" key={item}>
            <div className="flex">
              <div className="w-3/4 h-full">
                <Image src={Bolo} alt="logo" objectFit="contain" />
              </div>
              <div className="flex flex-col justify-start pr-2 pl-2">
                <h5 className="basis-1/3 text-gray-900 text-xl font-medium ">
                  Card title
                </h5>
                <p className="basis-2/3 text-gray-700 text-base">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <Link href={`/bolo/${item}`}>
                  <a className="basis-1/3 place-self-end inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
                    Detalhes
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-20 mt-5">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                href="#"
              >
                Anterior
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                1
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                2
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                Próximo
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
};

export default Home;
