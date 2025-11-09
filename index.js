const { createApp, ref } = Vue;

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const hands = ref([]);
const clockSize = ref(50);
let width = 8;
let height = 12;

function onResize() {
    hands.value = [];
    for (let h = 0; h < height; h++) {
        hands.value.push([]);
        for (let w = 0; w < width; w++) {
            hands.value[h].push({ minute: randint(0, 39)/10, hour: randint(0, 39)/10, timing: Math.random() + 0.5});
        }
    }
}
onResize();
window.addEventListener('resize', onResize);


function updateClocks() {
    /*for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
        hands.value[h][w].minute = randint(0, 59);
        hands.value[h][w].hour = randint(0, 11);
        hands.value[h][w].timing = Math.random() + 0.5;
        }
    }*/
    
    let number = 1;
           
    for (let y = 0; y < numbers[number].length; y++) {
        for (let x = 0; x < numbers[number][y].length; x++){
            hands.value[y][x].minute = numbers[number][y][x][0];
            hands.value[y][x].hour = numbers[number][y][x][1];
        }
    }
}

// mount vue
const app = createApp({
    setup() {
        return { width, height, hands, clockSize };
    }
})

app.config.compilerOptions.isCustomElement = (tag) => tag === 'content';

app.mount('body');
