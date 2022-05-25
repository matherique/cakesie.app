import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import UnauthenticatedClient from "../components/unauthenticated-client";

type CreateUser = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  fullName: yup.string().required("O nome é obrigatório"),
  email: yup.string().required("O email é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .test("passwords-match", "Senhas não são iguais", function (value) {
      return this.parent.password === value;
    }),
});

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>({ resolver: yupResolver(schema) });

  function onSubmit(data: CreateUser) {
    console.log(data);
  }

  return (
    <UnauthenticatedClient>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <input
            type="text"
            className={`${
              errors?.fullName
                ? "border-red-600 focus:border-red-600"
                : "border-gray-300 focus:border-purple-600 "
            } form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
            placeholder="Nome Completo"
            {...register("fullName")}
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            className={`${
              errors?.email
                ? "border-red-600 focus:border-red-600"
                : "border-gray-300 focus:border-purple-600 "
            } form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
            placeholder="Email"
            {...register("email")}
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            className={`${
              errors?.password
                ? "border-red-600 focus:border-red-600"
                : "border-gray-300 focus:border-purple-600 "
            } form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
            placeholder="Senha"
            {...register("password")}
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            className={`${
              errors?.confirmPassword
                ? "border-red-600 focus:border-red-600"
                : "border-gray-300 focus:border-purple-600 "
            } form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
            placeholder="Confirmação da senha"
            {...register("confirmPassword")}
          />
        </div>

        <button
          type="submit"
          className="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Cadastrar
        </button>
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">Ou</p>
        </div>
        <div className="flex items-center my-4">
          <p className="text-center font-semibold mx-4 mb-0">
            Ja possui conta?{" "}
            <Link href="/entrar">
              <a className="text-purple-600 hover:text-purple-700 transition duration-300 ease-in-out mb-4">
                Entre
              </a>
            </Link>
          </p>
        </div>
      </form>
    </UnauthenticatedClient>
  );
}
