import {PrismaClient} from "@prisma/client"
import express, {Application} from "express"
import Router from "./Router"
import {createClient, RedisClientType} from "redis";

export default class App {
	private static _this: App
	public readonly api: Application
	public readonly prisma: PrismaClient
	public readonly redis: RedisClientType
	public readonly bypassAuth: boolean

	public async start(port: number): Promise<void> {
		await this.prisma.$connect()
		await this.redis.connect()
		this.api.listen(port, () => console.log(`App listening on ${port}`))
	}

	public static get(): App {
		if (!App._this) throw new Error("Singleton must be initialized before accessing!")
		return App._this
	}

	constructor(bypassAuth = false) {
		if (App._this) throw new Error("Singleton must be single!")
		App._this = this
		this.bypassAuth = bypassAuth

		this.api = express()
		this.api.use(express.json())
		this.api.use(Router.route, Router.router)
		this.redis = createClient({
			url: process.env.REDIS_URL
		})
		this.redis.on("error", err => console.log(`Redis Client Error: `, err))
		this.prisma = new PrismaClient({datasources: {db: {url: process.env.DATABASE_URL}}})
	}
}
