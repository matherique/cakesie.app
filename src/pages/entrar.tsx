import * as React from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import UnauthenticatedClient from "@/components/unauthenticated-client";
import { trpc } from "@/utils/trpc";

type LoginInput = {
  email: string;
  password: string;
};

const inputClass = `form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none`;

export default function Login() {
  const { register, handleSubmit } = useForm<LoginInput>();
  const { mutate, isError } = trpc.useMutation(["user.login"]);

  async function onSubmit({ email, password }: LoginInput) {
    await mutate({ email, password });
  }

  return (
    <UnauthenticatedClient>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <input
            type="text"
            className={inputClass}
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            className={inputClass}
            placeholder="Senha"
            {...register("password", { required: true })}
          />
        </div>

        <div className="flex justify-between items-center mb-4">
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
        {isError && (
          <div className="flex justify-between items-center mb-3 p-1 text-red-700 font-bold">
            <h1>Usuário ou senha inválidos</h1>
          </div>
        )}

        <button
          type="submit"
          className="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Entrar
        </button>
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">Ou</p>
        </div>
        <div className="flex items-center my-4">
          <p className="text-center font-semibold mx-4 mb-0">
            Não possui conta?{" "}
            <Link href="/criar-conta">
              <a className="text-purple-600 hover:text-purple-700 transition duration-300 ease-in-out mb-4">
                Cadastre-se
              </a>
            </Link>
          </p>
        </div>
      </form>
    </UnauthenticatedClient>
  );
}
