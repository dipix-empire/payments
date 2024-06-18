import App from "../App";

export async function CreateSubscription(userId: string, planCode: string) {
	const prisma = App.get().prisma
	const plan = await prisma.plan.findUnique({ where: { code: planCode } });
	if (!plan)
		throw new PlanCodeIncorrectError(planCode)
	if (!await prisma.user.findUnique({ where: { id: userId } }))
		throw new UserIdNotFoundError(userId)
	const expires = new Date()
		.setHours(0,0,0,0)
		+ plan.duration * 24 * 60 * 60 * 1000
	return prisma.subscription.create({
		data: {
			expires: new Date(expires),
			owner: {
				connect: {id: userId}
			},
			plan: {
				connect: {id: plan.id}
			},
			users: {
				connect: {id: userId}
			}
		}
	});
}

export class PlanCodeIncorrectError extends Error {
	constructor(plan: string) {
		super(`Plan code ${plan} is incorrect`)
	}
}

export class UserIdNotFoundError extends Error {
	constructor(id: string) {
		super(`User id ${id} not found`)
	}
}
