const inquirer= require("inquirer");
const express = require('express');
const mysql=require("mysql2");
const PORT = process.env.PORT || 3306;
const app = express();
const db = mysql.createConnection(
    {
      host: 'localhost',
      PORT: 3306,
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Jupiter123!',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  );
const promptUser=()=>{
    inquirer.prompt([
        
        {
            name: "options",
            type:"list",
            message:"Select the next options please:",
            choices:[
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role",
                "Exist",
            ]
        }
    ])
    .then((answers)=>{
        const {options}=answers;
            switch(options){
                case "view all departments":
                    return viewAllDepartments();
                case "view all roles":
                    return viewAllRoles();
                case "view all employees":
                    return viewAllEmployee();
                case "add a department":
                    return addDepartment();
                case "add a role":
                    return  c();
                case "add an employee":
                    return addEmployee();
                case "update an employee role":
                    return updateEmployeeRole();
                case "Exist":
                    return 
            }
    });
};



  
const viewAllDepartments=()=>{
    db.query('SELECT departments.id, departments.departments_name FROM departments', function (err, results) {
        console.log(results);
    })
};

const viewAllRoles=()=>{
    db.query('SELECT roles.id, roles.title, departments.departments_name FROM rolesINNER JOIN departmentsON roles.department_id = departments.id', function (err, results){
        console.log(results);
    })
    
}

const viewAllEmployee=()=>{
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title,departments.departments_name,roles.salary FROM employees, roles, departmentsWHERE departments.id = roles.department_id AND roles.id = employees.role_idORDER BY employees.id ASC', function (err, results) {
        console.log(results);
    })
}

//add

const addDepartment=()=>{
    inquirer.prompt(
        [
            {
                type: "input",
                name: "firstName",
                message:"What is the name of the department?"
            }

        ]
    )
    .then((answer)=>{
        let sql = `INSERT INTO departments(departments_name)VALUES (?)`;
        db.query(sql, answer.firstName, function (err,results){
            console.log(results);
        })
    })
}

const addRole=()=>{
    let sql ='SELECT * FROM departments';
    db.query(sql, function(err,results){
        console.log(results);
    });



    inquirer.prompt(
        [
            {
                type: "input",
                name: "firstName",
                message:"What is the name of the department?"
            }

        ]
    )
    .then((answer)=>{
        let sql = `INSERT INTO departments(departments_name)VALUES (?)`;
        db.query(sql, answer.firstName, function (err,results){
            console.log(results);
        })
    })
};


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });