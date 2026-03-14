// src/db/store.ts

type User = { id: number; name: string; email: string };

export class UserStore {
	private data = new Map<number, User>();
	private nextId = 1;

	getAll(): User[] {
		return [...this.data.values()];
	}

	getById(id: number): User | undefined {
		return this.data.get(id);
	}

	create(input: { name: string; email: string }): User {
		const user: User = { id: this.nextId++, ...input };
		this.data.set(user.id, user);
		return user;
	}

	delete(id: number): boolean {
		return this.data.delete(id);
	}
}
