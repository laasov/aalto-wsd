import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedbackController from "./feedbackController.js";
import * as courseController from "./courseController.js";

const app = new Hono();

app.get("/courses", courseController.showCourses);
app.post("/courses", courseController.createCourse);

app.get("/courses/:id", courseController.showCourse);
app.post("/courses/:id/delete", courseController.deleteCourse);

app.get("/courses/:id/feedbacks/:num", feedbackController.getFeedback);
app.post("/courses/:id/feedbacks/:num", feedbackController.addRating)



export default app;