import App from "../App";

export default async function UpdateSubscriptions() {
	const prisma = App.get().prisma
	const expiringSubscriptions = await prisma.subscription.findMany({
		where: {
			expires: {
				lt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				gt: new Date()
			}
		},
		select: {
			owner: true,
			plan: true,
			expires: true
		}
	})
	//TODO: Send Notifications

}
