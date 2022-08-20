import { Title } from "./title";
import { StepProps } from "./types";

const EscolhaBoloStep: React.FC<StepProps> = () => {
  return (
    <div className="grid grid-rows-layout">
      <Title step={2} />
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
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bolo de Chocolate</td>
              <td>R$ 1000</td>
              <td>
                <button className="px-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between self-end">
        <div>
          <p>
            <span className="font-bold">Nome: </span>Matheus Henrique dos
            Santods
          </p>
          <p>
            <span className="font-bold">Telefone: </span>(12) 997713951
          </p>
          <p>
            <span className="font-bold">Telefone: </span>(12) 997713951
          </p>
        </div>
        <div className="self-end">
          <button className="px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default EscolhaBoloStep;
