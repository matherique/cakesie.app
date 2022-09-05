import Layout from "@/components/layout"
import { NextPage } from "next"

const inputClass = `form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none`;

const Retirada: NextPage = () => {
  const enderecos = Array.from({ length: 2 }, (_, x) => x + 1);

  return <Layout>
    <h1 className="text-4xl text-center font-bold text-purple-600 py-5">Carrinho de compras
      <small> - Entrega</small>
    </h1>
    <div className="w-full flex">
      <div className="w-full p-5 flex flex-col gap-5">
        <h1 className="text-2xl text-purple-600">Endereços cadastrados</h1>
        {enderecos.map(k =>
          <div key={k} className="flex gap-2 w-4/5">
            <input type="radio" name="endereco" id={`endereco-${k}`} />
            <label htmlFor={`endereco-${k}`}>Rua jose pereira de macedo - 57 vila albertina campos do jordão sao paulo</label>
          </div>
        )}
      </div>
      <div className="w-full p-5">
        <h1 className="text-2xl text-purple-600">Novo endereço</h1>
        <div className="w-full flex flex-col">
          <label htmlFor="rua">Rua</label>
          <input className={inputClass} type="text" name="rua" id="rua" />
        </div>
        <div className="w-full flex flex-row gap-2">
          <div className="w-full flex flex-col">
            <label htmlFor="cep">CEP</label>
            <input className={inputClass} type="text" name="cep" id="cep" />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="numero">Numero</label>
            <input className={inputClass} type="text" name="numero" id="numero" />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="complemento">Complemento</label>
          <input className={inputClass} type="text" name="complemento" id="complemento" />
        </div>
        <div className="w-full flex flex-row gap-2">
          <div className="w-full flex flex-col">
            <label htmlFor="cidade">Cidade</label>
            <input className={inputClass} type="text" name="cidade" id="cidade" />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="bairro">Bairro</label>
            <input className={inputClass} type="text" name="bairro" id="bairro" />
          </div>
        </div>
        <div className="w-full flex flex-row gap-2">
          <div className="w-full flex flex-col">
            <label htmlFor="estado">Estado</label>
            <select className={inputClass} id="estado">
              <option>Escolha um estado</option>
            </select>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="telefone">Telefone</label>
            <input className={inputClass} type="text" name="telefone" id="telefone" />
          </div>
        </div>
      </div>
    </div>

    <div className="">
      <button className="w-full bg-purple-500 text-white p-3 text-2xl font-bold">Finalizar pedido</button>
    </div>
  </Layout>
}

export default Retirada