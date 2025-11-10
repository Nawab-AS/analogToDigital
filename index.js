const { createApp, ref, watch, nextTick } = Vue;

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const hands = ref([]);
const clockSize = ref(40);
const clockStyle = ref(Object.keys(clockStyles)[0]);
let clockInterval;
const width = ref(8);
const height = ref(18);
const showModal = ref(false);
const timeFormat24 = ref(false);
const movingColons = ref(true);
const resizeAlerted = ref(false);


function updateClocks(number, x1, y1) {
    for (let y = 0; y < numbers[number].length; y++) {
        for (let x = 0; x < numbers[number][y].length; x++){
            hands.value[y + y1][x + x1].minute = numbers[number][y][x][0];
            hands.value[y + y1][x + x1].hour = numbers[number][y][x][1];
        }
    }
}

function displayNumber(number, x1, y1) {
    updateClocks(Math.floor(number/10), x1, y1);
    updateClocks(number % 10, x1 + 4, y1);
}

function displayColon(inverted, x1, y1) {
    if (movingColons.value) {
        updateClocks(inverted? 10:11, x1, y1);
    } else {
        updateClocks(10, x1, y1);
    }
}

function startClockInterval() {
    clockInterval = setInterval(()=>{
        clockStyles[clockStyle.value].frame();
    }, 50);
}


// initialize hands
function initializeHands() {
    hands.value = [];
    for (let h = 0; h < height.value; h++) {
        hands.value.push([]);
        for (let w = 0; w < width.value; w++) {
            hands.value[h].push({ minute: randint(0, 39)/10,
                hour: randint(0, 39)/10,
                timingM: Math.random()*0.4 + 0.5,
                timingH: Math.random()*0.4 + 0.5
            });
        }
    }
}


watch(clockStyle, (newStyle) => {
    if (clockInterval) clearInterval(clockInterval);

    width.value = clockStyles[newStyle].grid.width;
    height.value = clockStyles[newStyle].grid.height;

    initializeHands();
    startClockInterval();
});

let itsFine = ref(false);
async function resizeAlert() {
    await nextTick();
    const content = document.getElementById('clocks');
    if ((window.innerWidth < content.clientWidth || window.innerHeight < content.clientHeight) && !itsFine.value) {
        resizeAlerted.value = true;
    } else {
        resizeAlerted.value = false;
    }
}

watch([width, height], resizeAlert);
window.addEventListener('resize', resizeAlert);


// start
initializeHands();
startClockInterval();


// mount vue
const app = createApp({
    setup() {
        return { width, height, hands, clockSize, clockStyle, clockStyles, showModal, timeFormat24, movingColons, resizeAlerted, itsFine };
    }
})

app.config.compilerOptions.isCustomElement = (tag) => tag === 'content';

app.mount('body');
