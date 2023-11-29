export default function Routes(ExpenseTracker){
    //New expense
        //Get the expense details from the request object 
        //validate amount - make sure its numbers 
        //call the Tracker function that allows adding a new expense
        //Render a view
    //New expense ends

    async function newExpense(req, res){
        let expense = req.body.expense;
        let amount = req.body.amount;
        let category = req.body.category;
        let categoryId = await ExpenseTracker.getCategoryId(category);

        await ExpenseTracker.addExpense(expense, amount, categoryId.id);
        let allExp = await ExpenseTracker.allExpense();
        res.render('expenses', {expenses: allExp});
    }
    
    return {
        newExpense
    }
}