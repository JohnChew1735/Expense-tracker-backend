import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const database = mysql.createPool({
  host: "localhost",
  user: "test",
  password: "test",
  database: "backend",
});

//get all from table
app.get("/api/all", async (req, res) => {
  try {
    const result = await database.query(`
        SELECT e.id, e.name, e.amount, e.type, 
        COALESCE(ic.name, ec.name) AS category
        FROM expenses e
        LEFT JOIN income_categories ic ON e.IncomeID = ic.id
        LEFT JOIN expenses_categories ec ON e.ExpensesID = ec.id`);

    if (result && result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error("Error", error);
    res.status(404).send("error");
  }
});

//get income information from table
app.get("/api/income", async (req, res) => {
  try {
    const result = await database.query(`
        SELECT e.id, e.name, e.amount, e.type, 
        COALESCE(ic.name, ec.name) AS category
        FROM expenses e
        LEFT JOIN income_categories ic ON e.IncomeID = ic.id
        LEFT JOIN expenses_categories ec ON e.ExpensesID = ec.id
        WHERE e.amount > 0`);

    if (result && result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error("Error", error);
    res.status(404).send("error");
  }
});

//get income categories from table
app.get("/api/income_categories", async (req, res) => {
  try {
    const result = await database.query(`
          SELECT name from income_categories`);

    if (result && result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error("Error", error);
    res.status(404).send("error");
  }
});

//get expenses information from table
app.get("/api/expenses", async (req, res) => {
  try {
    const result = await database.query(`
        SELECT e.id, e.name, e.amount, e.type, 
        COALESCE(ic.name, ec.name) AS category
        FROM expenses e
        LEFT JOIN income_categories ic ON e.IncomeID = ic.id
        LEFT JOIN expenses_categories ec ON e.ExpensesID = ec.id
        WHERE e.amount < 0`);

    if (result && result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error("Error", error);
    res.status(404).send("error");
  }
});

//get expenses categories from table
app.get("/api/expenses_categories", async (req, res) => {
  try {
    const result = await database.query(`
          SELECT name from expenses_categories`);

    if (result && result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error("Error", error);
    res.status(404).send("error");
  }
});

//adding expenses
app.post("/add_expenses", (req, res) => {
  const query =
    "INSERT INTO expenses (name, amount, type, ExpensesID) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.amount,
    req.body.type,
    req.body.ExpensesID,
  ];
  try {
    const result = database.query(query, values);
    if (result) {
      res.status(200).json({ message: "Expenses added successfully." });
    } else {
      res.status(400).json({ message: "Expenses not added." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Expenses not added." });
  }
});

//adding income
app.post("/add_income", (req, res) => {
  const query =
    "INSERT INTO expenses (name, amount, type, IncomeID) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.amount,
    req.body.type,
    req.body.IncomeID,
  ];
  try {
    const result = database.query(query, values);
    if (result) {
      res.status(200).json({ message: "Expenses added successfully." });
    } else {
      res.status(400).json({ message: "Expenses not added." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Expenses not added." });
  }
});

//adding income category
app.post("/add_income_category", (req, res) => {
  const query = "INSERT INTO income_categories (name) VALUES (?)";
  const values = [req.body.name];
  try {
    const result = database.query(query, values);
    if (result) {
      res.status(200).json({ message: "Income category added successfully." });
    } else {
      res.status(400).json({ message: "Income category not added." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Income category not added." });
  }
});

//get income ID
app.get("/api/income_id", async (req, res) => {
  const query = "SELECT id FROM income_categories WHERE name = ?";
  const values = [req.query.name];
  try {
    const [rows] = await database.query(query, values);

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//adding expenses category
app.post("/add_expenses_category", (req, res) => {
  const query = "INSERT INTO expenses_categories (name) VALUES (?)";
  const values = [req.body.name];
  try {
    const result = database.query(query, values);
    if (result) {
      res
        .status(200)
        .json({ message: "Expenses category added successfully." });
    } else {
      res.status(400).json({ message: "Expenses category not added." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Expenses category not added." });
  }
});

//get expenses ID
app.get("/api/expenses_id", async (req, res) => {
  const query = "SELECT id FROM expenses_categories WHERE name = ?";
  const values = [req.query.name];
  try {
    const [rows] = await database.query(query, values);

    if (rows.length > 0) {
      res.status(200).json({ id: rows[0].id });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get balance
app.get("/balance", async (req, res) => {
  const query = "SELECT amount from expenses";
  try {
    const result = await database.query(query);
    if (result) {
      res.status(200).send(result[0]);
    } else {
      res.status(400).send("Server error1");
    }
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Server error2");
  }
});

//delete expenses
app.post("/delete_expenses", (req, res) => {
  const query = "DELETE FROM expenses WHERE id = ?";
  const values = [req.body.id];

  try {
    const result = database.query(query, values);
    if (result) {
      res.status(200).json({ message: "Expenses deleted successfully" });
    } else {
      res.status(400).json({ message: "Expenses not deleted" });
    }
  } catch (error) {
    console.error("Error occured:", error);
    res.status(400).json({ message: "Expenses not deleted" });
  }
});

//delete expenses category
app.post("/delete_expenses_category", async (req, res) => {
  const query = "DELETE FROM expenses_categories WHERE name = ?";
  const values = [req.body.category];

  try {
    const [result] = await database.execute(query, values); // Use `execute()` for MySQL2

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: `Expenses category '${req.body.name}' is deleted` });
    } else {
      res.status(400).json({
        message: `Expenses category '${req.body.name}' not found or not deleted`,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//delete income category
app.post("/delete_income_category", async (req, res) => {
  const query = "DELETE FROM income_categories WHERE name = ?";
  const values = [req.body.category];

  try {
    const [result] = await database.execute(query, values); // Use `execute()` for MySQL2

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: `Income category '${req.body.name}' is deleted` });
    } else {
      res.status(400).json({
        message: `Income category '${req.body.name}' not found or not deleted`,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//get expenses by name
app.post("/get_expenses_by_name", async (req, res) => {
  const query = "SELECT * FROM expenses WHERE name = ?";
  const values = [req.body.name]; // Use body for POST

  try {
    const [rows] = await database.execute(query, values);
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: `Expenses for '${req.body.name}' found`, data: rows });
    } else {
      res
        .status(404)
        .json({ message: `Expenses for '${req.body.name}' not found` });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//get expenses by type-amount
app.post("/get_expenses_by_type_and_amount", async (req, res) => {
  const { type, amount } = req.body;
  let query = "SELECT * FROM expenses WHERE type = ? AND amount = ?";
  let values = [type, amount];

  if (type === "Expenses") {
    values = [type, -Math.abs(Number(amount))];
  }

  try {
    const [rows] = await database.execute(query, values);
    if (rows.length > 0) {
      res.status(200).json({
        message: `Records for '${type}' with amount '${amount}' found`,
        data: rows,
      });
    } else {
      res.status(404).json({
        message: `No records found for '${type}' with amount '${amount}'`,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//get expenses by type and catgory
// get income/ expenses id based on category, then query the table for that id
// Get expenses or income by type and category
app.post("/get_expenses_by_type_and_category", async (req, res) => {
  const { type, category } = req.body;

  try {
    let query, values;
    let categoryRows;

    // If type is Expenses, get expenses category ID
    if (type === "Expenses") {
      query = "SELECT id FROM expenses_categories WHERE name = ?";
      values = [category];
    }
    // If type is Income, get income category ID
    else if (type === "Income") {
      query = "SELECT id FROM income_categories WHERE name = ?";
      values = [category];
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    // Execute query to get category ID
    [categoryRows] = await database.execute(query, values);
    if (categoryRows.length === 0) {
      return res
        .status(404)
        .json({ message: `${type} category '${category}' not found` });
    }

    const categoryId = categoryRows[0].id;

    // Get transactions from the expenses table based on category ID
    if (type === "Expenses") {
      query = "SELECT * FROM expenses WHERE ExpensesId = ?";
    } else {
      query = "SELECT * FROM expenses WHERE IncomeId = ?";
    }

    values = [categoryId];

    const [result] = await database.execute(query, values);

    if (result.length > 0) {
      res.status(200).json({ message: `${type} records found`, data: result });
    } else {
      res.status(404).json({ message: `${type} records not found` });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.listen(8000, () => {
  console.log("App is listening on port 8000");
});
