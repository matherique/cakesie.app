import DashboardLayout from "@components/dashboard-layout";
import { trpc } from "@shared/trpc";
import { NextPage } from "next";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { CreateUserType } from "@shared/validations/user";
import useAlert from "@hooks/useAlerts";
import { Role } from "@prisma/client";

const CadastrarUsuario: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    },
  } = useForm<CreateUserType>()

  const { mutate: createUser, data } = trpc.useMutation(["user.create"])
  const { success, error } = useAlert()

  const onSubmit = useCallback(async (data: CreateUserType) => {
    createUser(data, {
      onSuccess: () => {
        success("Usuário criado com sucesso!")
      },
      onError: (err) => {
        console.error(err)
        error("Erro ao criar usuário!")
      }
    })
  }, [createUser, error, success])

  const inputStyle = useCallback((hasError: boolean) => {
    let style = `block w-full p-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none`

    if (hasError) return style + ` border-red-500`
    return style + ` border-gray-300`
  }, [])

  return <DashboardLayout>
    <h1 className="text-3xl text-purple-500 font-bold">Cadastrar Usuário</h1>
    <div className="flex flex-row mt-10 ">
      <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className={inputStyle(!!errors.name)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              {...register("email", { required: true })}
              className={inputStyle(!!errors.email)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              {...register("email", { required: true })}
              className={inputStyle(!!errors.password)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="role">Nível</label>
            <select
              className={inputStyle(!!errors.role)} id="role"
              {...register("role", { required: true })}
            >
              <option>Escolha um nível de acesso</option>
              <option value={Role.ENPLOYEE}>Funcionário</option>
              <option value={Role.MANEGER}>Administrador</option>
            </select>
          </div>
          <div className="flex flex-col">
            <button
              className="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </div>
  </DashboardLayout >
}

export default CadastrarUsuario