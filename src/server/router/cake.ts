import { getByIdSchema, createSchema, removePhotoSchema, updateSchema, searchSchema } from "@/shared/validations/cake";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { get, remove, upload } from "@/shared/s3";
import { Cake } from "@prisma/client";

export const cakeRouter = createRouter()
  .query("getAll", {
    input: searchSchema,
    async resolve({ input: { query } }) {
      let cakes: Cake[] | undefined = []
      if (query) {
        cakes = await prisma?.cake.findMany({ where: { name: { contains: query } } })
      } else {
        cakes = await prisma?.cake.findMany()
      }

      if (!cakes) throw new Error("could not find cakes")

      return cakes
    },
  }).query("getById", {
    input: getByIdSchema,
    async resolve({ input: { id } }) {
      const cake = await prisma?.cake.findFirst({ where: { id }, include: { photos: true } })

      if (!cake) throw new Error("could not find cake")


      const withoutCover = cake.photos.filter(photo => photo.id !== cake.cover_image)

      const photos = await Promise.all(withoutCover.map(async (photo) => {
        return { id: photo.id, url: await get(`${cake.id}/${photo.id}.png`) }
      }))

      return { cake, photos: photos, cover: await get(`${cake.id}/${cake.cover_image}.png`) }
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

      const photo = await prisma?.photos.create({ data: { cakeId: cake.id } })
      if (!photo) throw new Error("could not create default photo")
      await upload(`${cake.id}/${photo.id}.png`, Buffer.from(input.cover_image, "base64"))

      await prisma?.cake.update({
        where: { id: cake.id },
        data: {
          cover_image: photo.id,
        }
      });

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
  }).mutation("update", {
    input: updateSchema,
    async resolve({ input, ctx }) {
      const { session } = ctx
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "you must be logged in",
        });
      }

      const cake = await prisma?.cake.findFirst({ where: { id: input.id } })

      if (!cake) throw new Error("could not find cake")

      const promises = []

      for (const file of input.files) {
        promises.push(new Promise(async (resolve, reject) => {
          const photo = await prisma?.photos.create({ data: { cakeId: cake.id } })
          if (!photo) return reject("could not create photo")

          return await upload(`${cake.id}/${photo.id}.png`, Buffer.from(file, "base64"))
        }))
      }

      await Promise.all(promises)

      return await prisma?.cake.update({
        where: { id: input.id },
        data: {
          description: input.description,
          name: input.name,
          price: input.price,
        }
      });
    }
  }).mutation("search", {
    input: searchSchema,
    async resolve({ input: { query } }) {
      let cakes: Cake[] | undefined = []
      if (query) {
        cakes = await prisma?.cake.findMany({ where: { name: { contains: query } } })
      } else {
        cakes = await prisma?.cake.findMany()
      }

      if (!cakes) throw new Error("could not find cakes")

      return cakes
    },
  })
