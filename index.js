const { createApp, ref } = Vue;

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const hands = ref([]);
let width = 8;
let height = 2;

function onResize() {
    const margin = 50;
    hands.value = [];
    for (let h = 0; h < (window.innerHeight - 60 - 25)/55 -1; h++) {
        hands.value.push([]);
        for (let w = 0; w < (window.innerWidth - margin)/55 -1; w++) {
            hands.value[h].push({ minute: randint(0, 59), hour: randint(0, 11) });
        }
    }
}
onResize();
window.addEventListener('resize', onResize);

// mount vue
createApp({
    setup() {
        return { width, height, hands };
    }
}).mount('body');
