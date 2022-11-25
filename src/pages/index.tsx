import Image from "next/image";
import * as React from "react";
import Logo from "@public/logo.png";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "@shared/validations/user";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = React.useCallback(async (data: LoginSchemaType) => {
    await signIn("credentials", { ...data, callbackUrl: "/dashboard/" });
  }, [])

  return (
    <section className="h-screen">
      <div className="container mx-auto px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-3/12 mb-6 md:mb-0">
            <Image src={Logo} alt="logo" className="w-full" />
            <h1 className="text-purple-600 text-3xl text-center mb-5">
              Painel Administrativo
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
                  placeholder="Senha"
                  {...register("password", { required: true })}
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck3"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="exampleCheck2"
                  >
                    Continuar conectado
                  </label>
                </div>
                <a
                  href="#!"
                  className="text-purple-600 hover:text-purple-700 focus:text-purple-700 active:text-purple-800 duration-200 transition ease-in-out"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
