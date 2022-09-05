import Layout from "@/components/layout";
import { NextPage } from "next";
import Bolo from "@/public/bolo.jpeg";
import Image from "next/image"
import React, { SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

const Quantidade: React.FC<{ set: (value: number) => void }> = ({ set }) => {
  const [quantity, setQuantity] = useState(1)

  const add = useCallback(() => {
    setQuantity(quantity + 1)
  }, [quantity])

  const sub = useCallback(() => {
    if (quantity - 1 <= 0) return;
    setQuantity(quantity - 1)
  }, [quantity])

  useEffect(() => {
    set(quantity)
  }, [quantity, set])

  const buttonStyle = "w-8 bg-purple-500 rounded text-white"

  return <div className="flex gap-2">
    <button className={buttonStyle} onClick={add} >+</button>
    <input className="w-8 text-center" readOnly defaultValue={quantity} />
    <button className={buttonStyle} onClick={sub}>-</button>
  </div>
}

const CarrinhoCompras: NextPage = () => {
  const gambiarra = Array.from({ length: 2 }, (_, x) => x + 1);

  return <Layout>
    <h1 className="text-4xl text-center font-bold text-purple-600 py-5">Carrinho de compras</h1>
    <div className="w-full">
      {gambiarra.map(x =>
        <div className="w-full grid grid-cols-[200px,1fr,200px] my-3" key={x}>
          <div className="">
            <Image
              src={Bolo}
              alt="logo"
              layout="responsive"
            />
          </div>
          <div className="flex flex-row justify-between p-5">
            <h3 className="text-2xl font-bold self-center">Bolo de Chocolate</h3>
            <div className="self-end flex flex-col text-right gap-1 px-10">
              <Quantidade set={console.log} />
              <a className="self-center hover:underline cursor-pointer">Remover</a>
            </div>

          </div>
          <div className="text-2xl font-bold items-center justify-end flex p-5 ">
            <p>R$ 1000,00</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-[1fr,1fr,200px] mt-10">
        <div className="p-5 text-right text-2xl font-bold flex gap-5">
          <div className="flex items-center gap-1">
            <input id="retirada" type="radio" value="" name="default-radio" className="w-5 h-5" />
            <label htmlFor="retirada" className="text-lg">Retirada</label>
          </div>
          <div className="flex items-center gap-1">
            <input id="entrega" type="radio" value="" name="default-radio" className="w-5 h-5" />
            <label htmlFor="entrega" className="text-lg">Entrega</label>
          </div>
        </div>
        <div className="p-5 text-right text-2xl font-bold">
          Total:
        </div>
        <div className="p-5 text-right text-2xl font-bold">
          R$ 200,00
        </div>
      </div>
      <div className="">
        <button className="w-full bg-purple-500 text-white p-3 text-2xl font-bold">Proximo</button>
      </div>
    </div >
  </Layout >
}

export default CarrinhoCompras