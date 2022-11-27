import { toBRL } from "@shared/convert";
import { trpc } from "@shared/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import { Title } from "./title";
import { StepProps } from "./types";

const EscolhaBoloStep: React.FC<StepProps> = ({ onNext, onPrev }) => {
  const [query, setQuery] = useState("");
  const router = useRouter()
  const { data } = trpc.useQuery(["cake.getAll", { query }]);

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
      <div className="w-full h-2/3">
        <table className="w-full table-auto">
          <thead className="text-left">
            <tr>
              <th>Bolo</th>
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((cake) =>
              <tr key={cake.id}>
                <td>{cake.name}</td>
                <td>{toBRL(cake.price)}</td>
                <td>
                  <button className="px-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
                    +
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between self-end">
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
          <span className="text-2xl"> R$ 1000,00</span>
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
