import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import * as courseService from "./courseService.js";
import { getCookie, setCookie, } from "https://deno.land/x/hono@v3.12.11/helper.ts";
  

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const validator = z.object({
    name: z.string().min(4, {message : "The course name should be a string of at least 4 characters."}),
  });

const showCourses = async (c) => {
    const sessionId = await getCookie(c,  "sessionId") ?? crypto.randomUUID();
    setCookie(c, "sessionId", sessionId, { path: "/", });
    return c.html(
      eta.render("courses.eta", { courses: await courseService.listCourses() }),
    );
};

const showCourse = async (c) => {
    const id = c.req.param("id");
    return c.html(
        eta.render("course.eta",
            { course: await courseService.getCourse(id),
              cookie: getCookie(c, id)}),
      );
};

const createCourse = async (c) => {
    const body = await c.req.parseBody();
    const validationResult = validator.safeParse(body);

    if (!validationResult.success) {
        return c.html(
            eta.render("courses.eta", {
                errors: validationResult.error.format(),
                courses: await courseService.listCourses()
            })
        );
    }

    await courseService.createCourse(body);
    return c.redirect("/courses");
};

const deleteCourse = async (c) => {
    const id = c.req.param("id");
    await courseService.deleteCourse(id);
    return c.redirect("/courses");
};

export { showCourses, createCourse, deleteCourse, showCourse };