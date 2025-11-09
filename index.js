const { createApp, ref } = Vue;

const width = 80;
const height = 20;

const title = "Analog To Digital";
const hands = ref([]);

for (let w = 0; w < width; w++) {
    hands.value.push([]);
    for (let h = 0; h < height; h++) {
        hands.value[w].push({ minute: 0, hour: 0 });
    }
}

createApp({
    setup() {
        return { title, hands };
    }
}).mount('body');