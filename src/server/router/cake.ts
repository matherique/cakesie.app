import { getByIdSchema, createSchema, removePhotoSchema } from "@/shared/validations/cake";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { get, remove, upload } from "@/utils/s3";

export const cakeRouter = createRouter()
  .query("getAll", {
    async resolve() {
      return await prisma?.cake.findMany();
    },
  }).query("getById", {
    input: getByIdSchema,
    async resolve({ input: { id } }) {
      const cake = await prisma?.cake.findFirst({ where: { id }, include: { photos: true } })

      if (!cake) throw new Error("could not find cake")

      const photos = await Promise.all(cake.photos.map(async (photo) => {
        return { id: photo.id, url: await get(`${cake.id}/${photo.id}.png`) }
      }))

      return { cake, photos: photos }
    },
  }).mutation("create", {
    input: createSchema,
    async resolve({ input, ctx }) {
      const { session } = ctx
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "you must be logged in",
        });
      }

      const cake = await prisma?.cake.create({
        data: {
          description: input.description,
          name: input.name,
          price: input.price,
        }
      });

      if (!cake) throw new Error("could not create cake");

      const promises = []

      for (const file of input.files) {
        promises.push(new Promise(async (resolve, reject) => {
          const photo = await prisma?.photos.create({ data: { cakeId: cake.id } })
          if (!photo) return reject("could not create photo")

          return await upload(`${cake.id}/${photo.id}.png`, Buffer.from(file, "base64"))
        }))
      }

      await Promise.all(promises)
    }
  }).query("photos", {
    input: getByIdSchema,
    async resolve({ input: { id } }) {
      const cake = await prisma?.cake.findFirst({ where: { id }, include: { photos: true } })

      if (!cake) throw new Error("could not find cake")

      const photos = await Promise.all(cake.photos.map((photo) => {
        return get(`${cake.id}/${photo.id}.png`)
      }))

      return { photos: photos }
    }
  }).mutation("disable", {
    input: getByIdSchema,
    async resolve({ input: { id } }) {
      const cake = await prisma?.cake.findFirst({ where: { id } })

      if (!cake) throw new Error("could not find cake")

      return await prisma?.cake.update({ where: { id }, data: { status: !cake.status } })
    }
  }).mutation("removePhoto", {
    input: removePhotoSchema,
    async resolve({ input: { cakeId, photoId } }) {
      const cake = await prisma?.cake.findFirst({ where: { id: cakeId } })

      if (!cake) throw new Error("could not find cake")

      await remove(`${cake.id}/${photoId}.png`)

      return await prisma?.photos.delete({ where: { id: photoId } })
    }
  })
