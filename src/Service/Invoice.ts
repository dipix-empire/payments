import App from "../App";
import {User} from "@prisma/client";

export async function CreateInvoice(user: User, amount: number) {
	return App.get().prisma.invoice.create({
		data: {
			user: {
				connect: {id: user.id}
			},
			amount
		}
	});
}
