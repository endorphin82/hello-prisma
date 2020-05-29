import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
/*
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: '2 Hello World' }
      },
      profile: {
        create: { bio: 'I like turtles' }
      }
    }
  })
*/
/*
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true }
  })
  console.log(post)
*/
/*
  const filteredPosts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: 'hello' } },
        { content: { contains: 'hello' } }

    }
  })
  console.dir(feredPosts, { depth: null })
*/
/*
  const post = await prisma.post.create({
    data: {
      title: 'Join us for Prisma Day 2020',
      author: {
        connect: { email: 'alice@prisma.io' }
      }
    }
  })
*/
/*
  const posts = await prisma.profile
    .findOne({
      where: { id: 1 }
    })
    .user()
    .posts()

  console.log(posts)
*/
/*
  const deletedUser = await prisma.user.delete({
    where: { email: 'sarah@prisma.io' }
  })

  console.log(deletedUser)
*/

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true
    }
  })
  console.dir(allUsers, { depth: null })

}


main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })