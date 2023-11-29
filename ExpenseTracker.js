export default function ExpenseTracker(db){

    //Add expense
        //Pg-promise query to add a new record to the expenses table - assuming successful validation
    //Add expense ends
    async function addExpense(expense, amount, categoryId){
        //Should be able to add expenses
    
        await db.none(`INSERT INTO expense (expense, amount, category_id)
                        VALUES ($1, $2, $3)`, [expense, amount, categoryId]);
    }

    //All expenses
        //Pg-promise query to retrieve everything in the expense table
        //return the expenses or an error message if none were found
    //All expenses ends
    async function allExpenses(){
        //Show all expenses
        let expenses = await db.many(`SELECT * FROM expense`);

        return expenses ? expenses : 'No expenses found';
    }

    //Expenses for category
        //Pg-promise query to retrieves all "expenses" for the specified category
        //Return the category expenses, or an error message if none were found
    //Expenses for category ends

    async function expensesForCatergory(categoryId){
        //Should filter by the category of the expense
        let categoryExpenses = await db.many(`SELECT * FROM expense WHERE category_id=$1`, {categoryId});
        return categoryExpenses ? categoryExpenses : 'No expenses were found for the category'; 
    }

    //Delete expense
        //Pg-promise query that deletes, from "expenses", the record with the specified id
    //Delete expense ends
    async function deleteExpense(expenseId){
        //delete a given expense
        await db.none(`DELETE FROM expenses WHERE id=$1`, [expenseId]);
    }

    //Category totals
        //Join the tables 
        //Return the total for each category
    //Category totals ends
    async function categoryTotals(){
        //Returns the totals for all categories
    }

    async function getCategoryId(category){
        let catID  = await db.one(`SELECT id FROM category WHERE category_type=$1`, [category]);
        return catID ? catID : 'That is not a recognized category';
    }

    async function getAllCategories(){
        let cats = await db.many(`SELECT category_type FROM category`);
        return cats;
    }

    return{
        addExpense,
        allExpenses,
        expensesForCatergory,
        deleteExpense,
        categoryTotals,
        getCategoryId,
        getAllCategories
    }
}