#!/usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++; // increament
        this.name = name;
        this.courses = []; // initializa an empty array for courses
        this.balance = 100;
    }
    // method to enroll a student in a course
    enroll_course(course) {
        // method banaya hai
        this.courses.push(course);
    }
    // method to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    // method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
    }
    // method to display student status
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully, Student ID: ${student.id} `);
    }
    // method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    // method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(`Student not found. Please enter correct ID`);
        }
    }
    // METHOD TO PAY STUDENT FEES
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found. Please enter correct ID");
        }
    }
    //method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // method to find a student by student id
    find_student(student_id) {
        return this.students.find((std) => std.id === student_id);
    }
}
async function main() {
    console.log("Welcome to 'CodewithMehak'- School Management System");
    console.log("-".repeat(50));
    let Student_manager = new student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        // using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    },
                ]);
                Student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    },
                ]);
                Student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                ]);
                Student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    },
                ]);
                Student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                ]);
                Student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("exiting...");
                process.exit();
        }
    }
}
// calling a main function
main();
