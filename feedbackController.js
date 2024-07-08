import * as feedbackService from "./feedbackService.js";

//const rat = {"Poor": "1", "Fair": "2", "Good": "3", "Very good": "4", "Excellent": "5"};

const getFeedback = async (c) => {
    const id = c.req.param("id");
    const num = c.req.param("num");
    console.log(num);
    return c.text(`Feedback ${num}: ${await feedbackService.getFeedback(id, num)}`);
};

const addRating = async (c) => {
    const id = c.req.param("id");
    const num = c.req.param("num");
    console.log(`id: ${id}`);
    console.log(`num: ${num}`)
    await feedbackService.incrementAt(id, num);
    return c.redirect(`/courses/${id}`);
};

export {getFeedback, addRating};
