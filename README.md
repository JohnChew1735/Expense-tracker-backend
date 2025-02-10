# Expense Management System

## Overview

This system is designed to efficiently manage expenses and income transactions by categorizing them into distinct tables. Users can perform CRUD (Create, Read, Update, Delete) operations on expenses and filter transactions based on type and category.

## Database Schema

### 1. **Income Categories Table**

```sql
CREATE TABLE income_categories(
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
```

- Stores different categories of income.
- Each category has a unique `id` and a `name`.

### 2. **Expenses Categories Table**

```sql
CREATE TABLE expenses_categories(
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
```

- Stores different categories of expenses.
- Each category has a unique `id` and a `name`.

### 3. **Expenses Table**

```sql
CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount INT,
    type VARCHAR(255),
    IncomeID INT,
    ExpensesID INT,
    FOREIGN KEY (IncomeID) REFERENCES income_categories(id) ON DELETE SET NULL,
    FOREIGN KEY (ExpensesID) REFERENCES expenses_categories(id) ON DELETE SET NULL
);
```

- Stores transactions related to both **income** and **expenses**.
- Includes:
  - `name`: Transaction name.
  - `amount`: Transaction amount (positive for income, negative for expenses).
  - `type`: Indicates whether the transaction is **Income** or **Expenses**.
  - `IncomeID`: Foreign key linking to `income_categories`.
  - `ExpensesID`: Foreign key linking to `expenses_categories`.

## Features

- **Add Transactions**: Users can add new income or expense records.
- **Edit Transactions**: Users can update existing transactions.
- **Delete Transactions**: Users can remove transactions.
- **Filter Transactions**: Users can filter records based on:
  - Type (Income or Expenses)
  - Category
  - Amount

## API Endpoints

### 1. **Add a Transaction**

**Endpoint:** `POST /add_transaction`

- Adds a new income or expense transaction.

### 2. **Edit a Transaction**

**Endpoint:** `PUT /update_transaction/:id`

- Updates an existing transaction.

### 3. **Delete a Transaction**

**Endpoint:** `DELETE /delete_transaction/:id`

- Removes a transaction from the database.

### 4. **Get Transactions by Type and Category**

**Endpoint:** `POST /get_expenses_by_type_and_category`

- Fetches transactions filtered by type and category.

## Usage

- Ensure MySQL is running.
- Create the tables using the provided schema.
- Use API endpoints to add, update, delete, and filter transactions.

## Notes

- When a category is deleted, associated transactions will have their `IncomeID` or `ExpensesID` set to NULL.
- The `amount` column should store negative values for expenses to differentiate them from income.

## License

This project is open-source and available for modification and distribution.
