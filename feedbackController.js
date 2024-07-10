import { setCookie, } from "https://deno.land/x/hono@v3.12.11/helper.ts";
  
import * as feedbackService from "./feedbackService.js";

const getFeedback = async (c) => {
    const id = c.req.param("id");
    const num = c.req.param("num");

    return c.text(`Feedback ${num}: ${await feedbackService.getFeedback(id, num)}`);
};

const addRating = async (c) => {
    const id = c.req.param("id");
    const num = c.req.param("num");
    
    await feedbackService.incrementAt(id, num);
    setCookie(c, id, "rated");
    
    return c.redirect(`/courses/${id}`);
};

export {getFeedback, addRating};
