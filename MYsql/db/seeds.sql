INSERT INTO departments
    (department_name)
VALUES
    ("Engineering"),
    ("Sales"),
    ("Finance"),
    ("Legal"),
    ("Marketing");

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ("Engineer", 90000, 1),
    ("Sales", 30000, 2),
    ("Finance", 80000, 3),
    ("Legal", 70000, 4),
    ("Marketing", 60000, 5);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)

VALUES 
    ("Random", "Name", 1, null),
    ("Kelbet", "Engida", 2, 1),
    ("Tom", "Mendez", 3, 2),
    ("Jamie", "Moris", 4, null),
    ("James", "Corden", 5, null),


