import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	try {
		// * REQUEST *
		const block = await prisma.block.findMany({
			where: {
				timeFrom: { not: null },
				timeTo: { not: null },
				date: { not: null },
			},
		});
		return block;
	} catch (err) {
		console.error(err);
		throw err;
	} finally {
		await prisma.$disconnect(); // Disconnect the Prisma client after use
	}
});
