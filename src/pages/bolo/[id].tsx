import { useRouter } from "next/router";
import Image from "next/image";
import * as React from "react";
import Layout from "@/components/layout";
import Bolo from "@/public/bolo.jpeg";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const CakeDetails: React.FC = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const id = router.query.id as string

  const { data, isLoading } = trpc.useQuery(["cake.getById", { id }]);
  const { mutate, error } = trpc.useMutation(["shopping-cart.addItem"]);

  const add = React.useCallback(async () => {
    if (!session) return;
    mutate({ cakeId: id, userId: session.id })
  }, [id, mutate, session])

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!data) {
    router.push("/")
    return null
  }

  return (
    <Layout
      breadcrumb={[
        { href: "/", label: "Home" },
        { href: "/bolo-de-cenoura", label: "Bolo de Cenoura" },
      ]}
    >
      <h1 className="font-medium leading-tight text-3xl mt-5 mb-2 text-purple-800">
        {data.name}
      </h1>
      <div className="container">
        <div className="flex gap-7">
          <div className="basis-2/5 ">
            <Image
              src={Bolo}
              alt="logo"
              objectFit="contain"
              layout="responsive"
              className="rounded-lg"
            />
          </div>

          <div className="basis-3/5">
            <div className="flex flex-col h-full justify-between">
              <div className="box-border">
                {data.description}
              </div>
              <div className="self-end flex justify-between w-full">
                <h1 className="font-medium text-4xl">R$ {data.price},00</h1>
                <button
                  onClick={add}
                  className="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="overflow-hidden text-gray-700 ">
          <div className="container py-2 mx-auto lg:pt-12">
            <h1 className="font-medium leading-tight text-2xl mt-0 mb-2">
              Mais fotos
            </h1>
            <div className="flex flex-wrap -m-1 md:-m-2">
              {Array.from({ length: 15 }).map((_, i) => (
                <div className="flex flex-wrap w-1/4" key={i}>
                  <div className="w-full p-1 md:p-2">
                    <Image
                      src={Bolo}
                      alt="logo"
                      objectFit="contain"
                      layout="responsive"
                      className="block object-cover object-center w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default CakeDetails