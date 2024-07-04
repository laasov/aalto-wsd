const getFb = async (id) => {
    const kv = await Deno.openKv();
    const count = await kv.get(["feedback", id]);
    return count.value ?? 0;
  }

const incrementAt = async (id) => {
    let count = await getFb(id);
    count++;
    await setFb(id, count);
};
  
const setFb = async (id, count) => {
    const kv = await Deno.openKv();
    await kv.set(["feedback", id], count);
};

export { getFb, incrementAt };