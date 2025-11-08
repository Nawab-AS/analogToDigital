const { createApp, ref } = Vue;

const title = "Analog To Digital";

createApp({
    setup() {
        return { title };
    }
}).mount('body');