import express from "express";
import morgan from "morgan";
import { body, validationResult } from "express-validator";
import { courses } from "./data/courses.js"
const app = express();
const port = 5000;
app.use(morgan("dev"));
app.use(express.json());



// CRUD Opirations

// get all
app.get("/api/v1/courses", (req, res) => {
    res.json(courses);
});

//get by id
app.get(`/api/v1/courses/:Id`, (req, res) => {
    const courseId = +req.params.Id;
    const course = courses.find((course) => course.id === courseId);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: "Course not found" });
    }
});

//Create course
app.post("/api/v1/courses", [
    body('name')
    .notEmpty()
    .withMessage("this filed must be not empty")
    .isLength({ min: 2 })
    .withMessage("this filed must be at least 2"),
    body('price')
    .notEmpty()
    .withMessage("this filed must be not empty")
    .isLength({ min: 2 })
    .withMessage("this filed must be at least 2"),
], (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    } else {
        const course = {
            id: courses.length + 1,
            ...req.body,
        }
        courses.push(co);
        res.status(201).json(course);
    }
});

//Update course
app.patch(`/api/v1/courses/:Id`, (req, res) => {
    const courseId = +req.params.Id;
    let course = courses.find((course) => course.id === courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    course = {...course,
        ...req.body
    };
    res.status(200).json(course);
});

// Delete Course
app.delete(`/api/v1/courses/:Id`, (req, res) => {
    const courseId = +req.params.Id;
    let course = courses.find((course) => course.id === courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    courses = courses.filter((course) => course.id !== courseId);
    res.status(200).json({
        message: `${course.name} course deleted sucess `
    });
})



app.listen(port, () => {
    console.log(`Stockfish ${port}`);
});