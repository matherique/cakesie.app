import { toBRL } from "@shared/convert";
import { trpc } from "@shared/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { Title } from "./title";
import { StepProps } from "./types";

const EscolhaBoloStep: React.FC<StepProps> = ({ onNext, onPrev, order, setOrder }) => {
  const [query, setQuery] = useState("");

  const router = useRouter()
  const { data } = trpc.useQuery(["cake.getAll", { query }]);

  const addCake = React.useCallback((id: string, price: number) => {
    setOrder({
      cakes: [...order.cakes, { id, price }],
      total: order.total + price,
    });
  }, [order.cakes, order.total, setOrder]);

  return (
    <div className="grid grid-rows-layout">
      <Title step={2} />
      <div className="w-full flex gap-2 my-4">
        <input
          className="w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
          placeholder="digite o nome do bolo"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Link
          href="/dashboard/bolos/cadastrar?redirect=/dashboard/pedidos/criar"
          className="px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Adicionar
        </Link>
      </div>
      <div className="flex gap-5 w-full h-full">
        <table className="w-full h-full table-auto border-collapse border border-gray-300">
          <thead className="text-left">
            <tr>
              <th className="border border-gray-300">Bolo</th>
              <th className="border border-gray-300">Preço</th>
              <th className="border border-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((cake) =>
              <tr key={cake.id}>
                <td className="border border-gray-300">{cake.name}</td>
                <td className="border border-gray-300">{toBRL(cake.price)}</td>
                <td className="border border-gray-300">
                  <button
                    onClick={() => addCake(cake.id, cake.price)}
                    className="px-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    +
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <table className="w-full h-full table-auto border-collapse border border-gray-300">
          <tr>
            <th className="border border-gray-300">Bolo</th>
            <th className="border border-gray-300">Preço</th>
            <th className="border border-gray-300">Ações</th>
          </tr>
        </table>
      </div>
      <div className="w-full  flex justify-between self-end">
        <div className="self-end">
          {/* <button
            className="px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={onPrev}
          >
            Voltar
          </button> */}
        </div>
        <div className="flex gap-1">
          <h1 className="font-bold text-2xl">Total: </h1>
          <span className="text-2xl">{toBRL(order.total)}</span>
        </div>
        <div className="self-end">
          <button
            className="px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={onNext}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default EscolhaBoloStep;
