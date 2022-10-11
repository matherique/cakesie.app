import DashboardLayout from "@/components/dashboard-layout";
import { CreateCakeSchemaType } from "@/shared/validations/cake";
import { fileListToArrayBuffer, toArrayBuffer, toBase64 } from "@/utils/convert";
import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

type AddCake = CreateCakeSchemaType & {
  image: FileList
  cover: FileList
}

const CadastrarBolo: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    },
  } = useForm<AddCake>()

  const { mutate: createCake, data } = trpc.useMutation(["cake.create"])

  const onSubmit = useCallback(async (data: AddCake) => {
    const buffers = await fileListToArrayBuffer(data.image)
    const files = buffers.map<string>(toBase64)

    let cover_image = ""
    if (data.cover.length > 0) {
      const cover = await toArrayBuffer(data.cover.item(0)!)
      cover_image = toBase64(cover)
    }

    createCake({
      ...data,
      price: Number(data.price || 0),
      photos_length: data.image.length,
      cover_image,
      files
    }, { onSuccess: () => reset() })
  }, [createCake, reset])

  const inputStyle = useCallback((hasError: boolean) => {
    let style = `block w-full p-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none`

    if (hasError) return style + ` border-red-500`
    return style + ` border-gray-300`
  }, [])

  return <DashboardLayout>
    <h1 className="text-3xl text-purple-500 font-bold">Cadastrar Bolo</h1>
    <div className="flex flex-row mt-10 ">
      <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl text-center">Informações</h3>
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
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              {...register("price", {
                required: true,
                valueAsNumber: true,
                pattern: /^\d+$/,
              })}
              className={inputStyle(!!errors.price)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              className={inputStyle(!!errors.description)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="photos">Imagem principal</label>
            <input
              type="file"
              id="photos"
              {...register("cover", { required: true })}
              accept="image/png, image/jpeg"
              className={inputStyle(false)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="photos">Fotos</label>
            <input
              type="file"
              multiple
              id="photos"
              {...register("image")}
              accept="image/png, image/jpeg"
              className={inputStyle(false)}
            />
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

export default CadastrarBolo