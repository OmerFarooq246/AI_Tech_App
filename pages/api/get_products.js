import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  try{
    const products = await prisma.products.findMany({
      take: 10
    })
    res.status(200).json(products)
  }
  catch(error){
    console.error("error message:", error.message)
    res.status(500).json({ error });
  }
}
