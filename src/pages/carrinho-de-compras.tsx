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

  const buttonStyle = "w-8 bg-purple-500"

  return <div className="flex gap-2">
    <button className={buttonStyle} onClick={add} >+</button>
    <input className="w-8 text-center" readOnly defaultValue={quantity} />
    <button className={buttonStyle} onClick={sub}>-</button>
  </div>
}

const CarrinhoCompras: NextPage = () => {
  const gambiarra = Array.from({ length: 2 }, (_, x) => x + 1);

  return <Layout>
    <h1 className="text-2xl font-bold text-purple-600">Carrinho de compras</h1>
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
      <div className="grid grid-cols-[1fr,200px] border-2 border-purple-300">
        <div className="p-5 text-right text-2xl font-bold">
          Total:
        </div>
        <div className="p-5 text-right text-2xl font-bold">
          R$ 200,00
        </div>
      </div>
    </div >
  </Layout >
}

export default CarrinhoCompras