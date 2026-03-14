// test/users.test.ts
// Simple test runner for the UserStore.

import { UserStore } from '../src/db/store.ts';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string): void {
	if (condition) {
		console.log(`  PASS: ${message}`);
		passed++;
	} else {
		console.error(`  FAIL: ${message}`);
		failed++;
	}
}

console.log('UserStore tests\n');

const store = new UserStore();

// Create
const user = store.create({ name: 'Alice', email: 'alice@example.com' });
assert(user.id === 1, 'create() assigns id 1 to first user');
assert(user.name === 'Alice', 'create() preserves name');

// Get by ID
const fetched = store.getById(1);
assert(fetched !== undefined, 'getById(1) returns the user');
assert(fetched?.email === 'alice@example.com', 'getById(1) has correct email');

// Get all
const all = store.getAll();
assert(all.length === 1, 'getAll() returns 1 user');

// Create another
store.create({ name: 'Bob', email: 'bob@example.com' });
assert(
	store.getAll().length === 2,
	'getAll() returns 2 users after second create',
);

// Delete
const deleted = store.delete(1);
assert(deleted === true, 'delete(1) returns true');
assert(
	store.getById(1) === undefined,
	'getById(1) returns undefined after delete',
);
assert(store.getAll().length === 1, 'getAll() returns 1 user after delete');

// Delete non-existent
const deletedAgain = store.delete(999);
assert(
	deletedAgain === false,
	'delete(999) returns false for non-existent user',
);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
