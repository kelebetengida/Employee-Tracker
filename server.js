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
        });
    });
    
    promptUser();
}

const addRole=()=>{
    const sql=`SELECT * FROM departments`
    db.query(sql, (err, results)=>{
        let departmentsA=[];
        results.forEach((departments)=>{departmentsA.push(departments.departments_name);});
        departmentsA.push("newDepartment");
        inquirer.prompt([
            {
                name: "DepatmentN",
                type: "list",
                message: "What role would the new department be in?",
                choices: departmentsA
            }
        ]).then((answer)=>{
            if(answer.DepartmentN==="newDepartment"){
                this.addDepartment();
            }else{addNewRole(answer)
            }
        });
        const addNewRole=(departmentInfo)=>{
            insquirer.prompt([
                {
                    name: "newR",
                    type: "input",
                    message: "What is the name of the new role?"
                },
                {
                    name: "Salary",
                    type: "input",
                    message: "What is the salary of the new role?"
                },
            ]).then((answer)=>{
                let newrole=answer.newR;
                let department;

                results.forEach((departments)=>{
                    if (departmentInfo.DepartmentN===departments.departments_name){department=department.id}
                });
                let sql =`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?) `;
                let create=[newrole,answer.salary,department];
                db.query(sql, create, (err)=>{
                    viewAllRoles();
                })
            })
        }
    })
    promptUser();
};    

const addEmployee=()=>{

    inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "What is the emaplloyees first name?",
        validate: firstName=>{
            if(firstName){
                return true;
            } else {return false;}
        }
    },
    {
        type:"input",
        name: "lastName",
        message:"What is the employees last name?",
        validate: lastName=>{
            if(lastName){
                return true;
            } else{return false;}
        }
    }]).then ((answer)=>{
    const response=[answer.firstName, answer.lastName]
    let sql=`SELECT roles.id, roles.title FROM roles`;
    db.query(sql, (err, data)=>{
        const roles=data.map(({id,title})=>({name:title , value: id}));
        inquirer.prompt([
            {
                type:"list",
                name:"role",
                message:"what is the role of the emeployee?",
                choices: roles
            }
        ]).then (roleOptions=>{
            const role= roleOptions.role;
            response.push(role);
            const managerS = `SELECT * FROM employees`;
            db.query(managerS, (err, data)=>{
                const managers=data.map(({id, first_name, last_name})=>({name: first_name + " " + last_name, value: id}));
                inquirer.prompt([
                    {
                        type: "list",
                        name: "manager",
                        message: "who is the employes manager?",
                        choices: managers
                    }
                ])
                .then(managerOption=>{
                    const manager= managerOption.manager;
                    response.push(manager);
                    const sql=`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                    db.query(sql, response, (err)=>{
                        viewAllEmployee();
                    })
                })
            
            }

        )})
    })
})
};

const updateEmployeeRole= () =>{
    let employeeA=[];
    let role=[];
    
    let sql=`SELECT employees.id, employees.first_name, employees.last_name, roles.id AS "roles_id" FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id`
    db.query=(sql, (err, result)=>{
        let nameA=[];
        db.forEach((emplloyee)=>{nameA.push(`${employees.first_name} ${employees.last_name}`);});


    })
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });