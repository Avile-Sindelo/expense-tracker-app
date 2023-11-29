import ExpenseTracker from "../ExpenseTracker.js";
import assert from "assert";
import pgp from "pg-promise";

const connectionString = process.env.DATABASE_URL || 'postgres://davqkzsa:k_gwxTgjZrwOTaxZhfCII2yXX_tdOcxb@flora.db.elephantsql.com/davqkzsa';
const postgresP = pgp();
const db = postgresP(connectionString);

describe('Expense tracker tests', function(){
    this.timeout(10000);
    this.beforeEach(async function(){
        await db.none("DELETE FROM expense;");
    })

    it('should test if all expenses can be returned correctly', async function(){
        //Create an instance of the FF
        let tracker = ExpenseTracker(db);
        let categoryId = await tracker.getCategoryId('daily');
       
        tracker.addExpense('Lunch', '20.00', categoryId.id);
    })
})