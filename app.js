//import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedbackController from "./feedbackController.js";
import * as courseController from "./courseController.js";

//const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
const app = new Hono();

//app.get("/", (c) => c.html(eta.render("index.eta")));

//app.get("/feedbacks/:id", feedbackController.getFeedback);
//app.post("/feedbacks", feedbackController.postFeedback);

app.get("/courses", courseController.showCourses);
app.post("/courses", courseController.createCourse);

app.get("/courses/:id", courseController.showCourse);
app.post("/courses/:id/delete", courseController.deleteCourse);

app.get("/courses/:id/feedbacks/:num", feedbackController.getFeedback);
app.post("/courses/:id/feedbacks/:num", feedbackController.addRating)



export default app;