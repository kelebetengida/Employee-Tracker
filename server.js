const inquirer= require("inquirer");
const express = require("express");
const mysql=require("mysql2");
const consoleT=require("console.table");
const PORT = process.env.PORT || 3001;
const app = express();
const db = mysql.createConnection(
    {
      host: 'localhost',
      PORT: 3001,
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Jupiter123!',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  );

db.connect((error)=>{
    if (error) throw error;
    promptUser();
})
const promptUser=()=>{
    inquirer.prompt([
        
        {
            name: "options",
            type:"list",
            message:"Select from the next options please:",
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
                    return  addRole();
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
       console.table(results);
    });
    promptUser();
};

const viewAllRoles=()=>{
    db.query('SELECT roles.id, roles.title, departments.departments_name FROM roles INNER JOIN departments ON roles.department_id = departments.id', function (err, results){
        console.table(results);
    });
    promptUser();
}

const viewAllEmployee=()=>{
    let sql= 'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.departments_name, roles.salary FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id ORDER BY employees.id ASC'
    db.query(sql, function (err, results) {
        console.table(results);
    })
    promptUser();
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
        ).then((answer)=>{
        let sql = `INSERT INTO departments (departments_name) VALUES ("${answer.firstName}")` 
        db.query(sql, answer.firstName, function (err,results){
            console.log(results);
            viewAllDepartments();
        })
    })
    
    promptUser();
}

const addRole=()=>{
    
    let arr=[];
    let sql ='SELECT departments.id,departments_name FROM departments ORDER BY departments_name ASC';
    db.query(sql, function(err,results){
        console.log(results);
    }).then((departments)=>{
        for(i=0;i<departments.length;i++){
            arr.push(departments[i].name);
        }
        return departments;
    }).then((departments)=>{
        inquirer.prompt(
            [
                {
                    type: "input",
                    name: "roleT",
                    message:"What is the title of the role?"
                },
                {
                    type: "input",
                    name: "roleS",
                    message:"What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "departments",
                    message:"Departments",
                    choices: arr
                }
    
            ]
        ).then((answer)=>{
            let departmentid;
            for(i=0;i<departments.length;i++){
                departmentid=departments[i].id;
            }
            let sql = `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.roleT}", "${answer.roleS}", "${departmentid})`;
            db.query(sql, answer.firstName, function (err,results){
                console.log(results);
            })
            promptUser();

        })
    })



    inquirer.prompt(
        [
            {
                type: "input",
                name: "roleT",
                message:"What is the title of the role?"
            },
            {
                type: "input",
                name: "roleS",
                message:"What is the salary of the role?"
            },
            {
                type: "list",
                name: "departments",
                message:"Departments",
                choices: arr
            }

        ]
    ).then((answer)=>{
        let sql = `INSERT INTO departments(departments_name)VALUES (?)`;
        db.query(sql, function (err,results){
            console.log(results);
        })
    })
    promptUser();
};
 

const updateEmployeeRole=()=>{

    let employeesA=[];
    let roleA=[];

    
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });