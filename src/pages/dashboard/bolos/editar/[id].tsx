import DashboardLayout from "@/components/dashboard-layout";
import useAlert from "@/hooks/useAlerts";
import { CreateCakeSchemaType } from "@/shared/validations/cake";
import { fileListToArrayBuffer, toBase64 } from "@/utils/convert";
import { trpc } from "@/utils/trpc";
import { NextPage } from "next";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";

type AddCake = CreateCakeSchemaType & {
  image: FileList
}

const EditarBolo: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string

  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    setValue,
  } = useForm<AddCake>()

  const { data, isSuccess, refetch } = trpc.useQuery(["cake.getById", { id }])
  const { mutate: removePhoto } = trpc.useMutation("cake.removePhoto")
  const { mutate: update } = trpc.useMutation("cake.update")
  const { success, error } = useAlert()

  useEffect(() => {
    if (!isSuccess) return

    setValue("name", data.cake.name)
    setValue("description", data.cake.description)
    setValue("price", data.cake.price)
  }, [data, isSuccess, setValue])

  const onSubmit = useCallback(async (data: AddCake) => {
    const buffers = await fileListToArrayBuffer(data.image)
    const files = buffers.map<string>(toBase64)

    update({
      ...data,
      id,
      price: Number(data.price || 0),
      photos_length: data.image.length,
      files
    }, {
      onSuccess: () => {
        success("Bolo atualizado com sucesso!")
        refetch()
      },
      onError: (err) => {
        error("Erro ao atualizar bolo: " + err.message)
        console.log(err)
      }
    })
  }, [update, id, success, error, refetch])

  const handleRemovePhoto = useCallback(async (photoId: string) => {
    removePhoto({ cakeId: id, photoId: photoId }, { onSuccess: () => refetch() })
  }, [refetch, removePhoto, id])

  const inputStyle = useCallback((hasError: boolean) => {
    let style = `block w-full p-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none`

    if (hasError) return style + ` border-red-500`
    return style + ` border-gray-300`
  }, [])

  return <DashboardLayout>
    <header className="flex gap-2 justify-between mb-5">
      <h1 className="text-3xl text-purple-500 font-bold">Editar Bolo</h1>
      <Link href="/dashboard/bolos/listar">
        <a className="px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
          Voltar
        </a>
      </Link>
    </header>
    <div className="flex flex-row mt-10 gap-10">
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
          {data?.cover ?
            <div className="w-full h-2/3">
              <Image
                src={data?.cover}
                alt={data?.cake.name}
                width={100}
                height={100}
                className="w-32"
              />
            </div>
            : null}
          <div className="flex flex-col gap-2">
            <label htmlFor="photos">Imagem principal</label>
            <input
              type="file"
              id="photos"
              {...register("cover_image", { required: true })}
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
              Salvar
            </button>
          </div>
        </div>
      </form>
      <div className="w-1/2">
        <h3 className="text-xl text-center">Photos</h3>
        <div className="flex gap-2">
          {data?.photos?.map((photo, index) => (
            <div key={photo.id} className="border border-spacing-2 w-1/4 relative">
              <Image
                src={photo.url}
                alt={`photo-${index}`}
                width={100}
                height={100}
                className="w-full"
              />
              <FaTrash
                size={32}
                className="absolute top-0 right-0 cursor-pointer bg-purple-500 text-white p-2 rounded hover:bg-purple-800 m-2"
                onClick={() => handleRemovePhoto(photo.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout >
}

export default EditarBolo