import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedback from "./feedbacks.js";

const app = new Hono();

app.get(
  "/feedbacks/:id", 
  async (c) => {
    const number = c.req.param("id");
    return c.text(`Feedback ${number}: ${await feedback.getFb(number)}`);
});

app.post(
  "/feedbacks/:id",
  async (c) => {
    const number = c.req.param("id");
    await feedback.incrementAt(number);
    return c.text(`Feedback ${number}: ${await feedback.getFb(number)}`);
});

export default app;
