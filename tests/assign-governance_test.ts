import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.10.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Verify member registration in assign-governance contract",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const block = chain.mineBlock([
            Tx.contractCall('assign-governance', 'register-member', [
                types.uint(1000),
                types.bool(false)
            ], deployer.address)
        ]);

        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk();
    }
});

Clarinet.test({
    name: "Verify task creation process",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const block = chain.mineBlock([
            Tx.contractCall('assign-governance', 'register-member', [
                types.uint(1000),
                types.bool(false)
            ], deployer.address),
            Tx.contractCall('assign-governance', 'create-task', [
                types.ascii("Test Task"),
                types.utf8("A comprehensive task description"),
                types.uint(5000),
                types.list([
                    { description: types.utf8("Milestone 1"), amount: types.uint(2500), completed: types.bool(false), funded: types.bool(false) },
                    { description: types.utf8("Milestone 2"), amount: types.uint(2500), completed: types.bool(false), funded: types.bool(false) }
                ])
            ], deployer.address)
        ]);

        assertEquals(block.receipts.length, 2);
        block.receipts[1].result.expectOk();
    }
});

Clarinet.test({
    name: "Test task voting mechanism",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const block = chain.mineBlock([
            Tx.contractCall('assign-governance', 'register-member', [
                types.uint(1000),
                types.bool(false)
            ], deployer.address),
            Tx.contractCall('assign-governance', 'create-task', [
                types.ascii("Voting Test Task"),
                types.utf8("Task for voting test"),
                types.uint(5000),
                types.list([
                    { description: types.utf8("Test Milestone"), amount: types.uint(5000), completed: types.bool(false), funded: types.bool(false) }
                ])
            ], deployer.address),
            Tx.contractCall('assign-governance', 'vote-on-task', [
                types.uint(1),
                types.bool(true)
            ], deployer.address)
        ]);

        assertEquals(block.receipts.length, 3);
        block.receipts[2].result.expectOk();
    }
});