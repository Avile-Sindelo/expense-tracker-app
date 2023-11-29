import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import pgp from "pg-promise";

import ExpenseTracker from './ExpenseTracker.js';
import Routes from './routes/Routes.js';

const app = express();
const connectionString = process.env.DATABASE_URL || 'postgres://davqkzsa:k_gwxTgjZrwOTaxZhfCII2yXX_tdOcxb@flora.db.elephantsql.com/davqkzsa';
const postgresP = pgp();
const db = postgresP(connectionString);
const expenseTracker = ExpenseTracker(db);
const routes = Routes();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');

//Middleware config
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.get('/', async function(req, res){
    let cats = await expenseTracker.getAllCategories();
    console.log(cats)
    res.render('addExpense', {category: cats})
});
app.post('/expense/add', routes.newExpense)

//Server Port & start
const PORT = 5500;
app.listen(PORT, function(){
    console.log(`Server started at Port : ${PORT}`);
})