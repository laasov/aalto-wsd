const getFeedback = async (id, num) => {
    const kv = await Deno.openKv();
    const count = await kv.get(["feedback", id, num]);
    return count.value ?? 0;
};

const incrementAt = async (id, num) => {
    let count = await getFeedback(id, num);
    count++;
    await setFeedback(id, num, count);
};
  
const setFeedback = async (id, num, count) => {
    const kv = await Deno.openKv();
    await kv.set(["feedback", id, num], count);
};

export { getFeedback, incrementAt };