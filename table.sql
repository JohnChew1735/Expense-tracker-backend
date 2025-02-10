CREATE TABLE income_categories(
    id int AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE expenses_categories(
    id int AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

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


INSERT INTO expenses (name, amount)
VALUES ("Electricity bill", 30);

ALTER TABLE expenses 
ADD amount float (2);

ALTER TABLE expenses 
DROP COLUMN amount;

ALTER TABLE expenses
ADD COLUMN type VARCHAR(255);

ALTER TABLE expenses
ADD COLUMN categoryId VARCHAR(255);

ALTER TABLE expenses
ADD FOREIGN KEY (categoryID) REFERENCES categoryId(id);





//Income
INSERT INTO income_categories (name)
VALUES ("Salary");

INSERT INTO income_categories (name)
VALUES ("Bonus");

INSERT INTO income_categories(name)
VALUES ("Freelance");

INSERT INTO income_categories (name)
VALUES ("Investment returns");

INSERT INTO income_categories (name)
VALUES ("Rental Income");

INSERT INTO income_categories (name)
VALUES ("Business Profits");

INSERT INTO income_categories (name)
VALUES ("Dividend Income");

INSERT INTO income_categories (name)
VALUES ("Gift/Allowance");

INSERT INTO income_categories (name)
VALUES ("Cashback & Rewards");

INSERT INTO income_categories (name)
VALUES ("Tax Refunds");


//Expenses
INSERT INTO expenses_categories (name)
VALUES ("Food & Dining");

INSERT INTO expenses_categories (name)
VALUES ("Transportation");

INSERT INTO expenses_categories (name)
VALUES ("Utlities");

INSERT INTO expenses_categories(name)
VALUES ("Rent/ Mortgage");

INSERT INTO expenses_categories (name)
VALUES ("Healthcare & Medical");

INSERT INTO expenses_categories (name)
VALUES ("Insurance");

INSERT INTO expenses_categories(name)
VALUES ("Entertainment & Leisure");

INSERT INTO expenses_categories (name)
VALUES ("Shopping");

INSERT INTO expenses_categories(name)
VALUES ("Travel & Vacation");

INSERT INTO expenses_categories (name)
VALUES ("Subscription");



DELETE FROM table_name WHERE condition;
