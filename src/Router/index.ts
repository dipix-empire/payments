import { Response } from "express";
import Route from "../Types/Route";
import Router from "../Types/Router";

export default new Router(
	"/",
	[
		new Route("/", "get", async (req, res: Response) => {
			res.json({ msg: "hello" })
		})
	]
)
