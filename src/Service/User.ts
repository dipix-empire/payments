import { User } from "@prisma/client";
import App from "../App";

export async function CreateUser(id: string) {
	return App.get().prisma.user.create({data: {id}});
}

export async function GetUser(id: string) {
	return App.get().prisma.user.findUnique({where: {id}});
}

export async function GetOrCreateUser(id: string): Promise<User> {
	return await GetUser(id) || await CreateUser(id)
}
