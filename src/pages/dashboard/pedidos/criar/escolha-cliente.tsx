import { trpc } from "@/shared/trpc";
import { Title } from "./title";
import { StepProps } from "./types";

const EscolhaClienteStep: React.FC<StepProps> = ({ onNext, onPrev }) => {
  const { data } = trpc.useQuery(["user.getAll"]);

  return (
    <div className="grid grid-rows-layout gap-4">
      <Title step={1} />
      <div>
        <h1 className="font-bold text-xl">Dados do pedido:</h1>
      </div>
      <div className="w-full flex gap-2 my-6">
        <input
          className="w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
          placeholder="digite o nome ou telefone do cliente"
        />
        <button className="px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
          Adicionar
        </button>
      </div>
      <div className="w-full h-2/3">
        <table className="w-full table-auto">
          <thead className="text-left">
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="px-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between self-end">
        <div className="self-end"></div>
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

export default EscolhaClienteStep;
