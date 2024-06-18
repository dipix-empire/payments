import App from "../App";

export async function CreatePlan(name: string, code: string, cost: number, duration: number, userLimit: number) {
	return App.get().prisma.plan.create({
		data: {
			name, code, cost, duration, userLimit
		}
	});
}
