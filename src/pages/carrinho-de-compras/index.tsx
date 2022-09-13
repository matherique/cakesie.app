import Layout from "@/components/layout";
import { NextPage } from "next";
import Bolo from "@/public/bolo.jpeg";
import Image from "next/image"
import React, { useCallback, useMemo } from "react";
import { trpc } from "@/utils/trpc";

const CarrinhoCompras: NextPage = () => {
  const { data, refetch } = trpc.useQuery(["shopping-cart.getItens"])
  const { mutateAsync } = trpc.useMutation(["shopping-cart.updateQuantity"])

  const total = useMemo(() => {
    return data?.reduce((acc, item) => {
      return acc + (item.product.price * item.quantity)
    }, 0)
  }, [data])

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    await mutateAsync({ id, quantity })
    await refetch()
  }, [mutateAsync, refetch])

  return <Layout>
    <h1 className="text-4xl text-center font-bold text-purple-600 py-5">Carrinho de compras</h1>
    <div className="w-full">
      {(data || []).map(item =>
        <div className="w-full grid grid-cols-[300px,1fr,200px] my-3" key={item.id}>
          <div className="">
            <Image
              src={Bolo}
              alt="logo"
              layout="responsive"
            />
          </div>
          <div className="flex flex-col px-2">
            <h3 className="text-2xl font-bold">{item.product.name}</h3>
            <p className="w-full h-full text-md text-gray-400">{item.product.description}</p>
          </div>
          <div className="items-center flex flex-col p-5 gap-5">
            <p className="text-2xl font-bold">R$ {item.product.price * item.quantity},00</p>
            <div className="text-center">
              <div className="flex gap-2">
                <button className="w-8 bg-purple-500 rounded text-white" onClick={() => updateQuantity(item.id, 1)} >+</button>
                <input className="w-8 text-center" readOnly value={item.quantity} />
                <button className="w-8 bg-purple-500 rounded text-white" onClick={() => updateQuantity(item.id, -1)}>-</button>
              </div>
              <a className="self-center hover:underline cursor-pointer">Remover</a>
            </div>
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
          R$ {total},00
        </div>
      </div>
      <div className="">
        <button className="w-full bg-purple-500 text-white p-3 text-2xl font-bold">Proximo</button>
      </div>
    </div >
  </Layout >
}

export default CarrinhoCompras