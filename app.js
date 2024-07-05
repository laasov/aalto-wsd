import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedback from "./feedbacks.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
const app = new Hono();
const rat = {"Poor": "1", "Fair": "2", "Good": "3", "Very good": "4", "Excellent": "5"};

app.get("/", (c) => c.html(eta.render("index.eta")));

app.get(
  "/feedbacks/:id", 
  async (c) => {
    const number = c.req.param("id");
    return c.text(`Feedback ${number}: ${await feedback.getFb(number)}`);
});

app.post(
  "/feedbacks",
  async (c) => {
    const body = await c.req.parseBody();
    const val = body.rating;
    const id = rat[val];
    await feedback.incrementAt(id);
    return c.redirect("/");
});

export default app;