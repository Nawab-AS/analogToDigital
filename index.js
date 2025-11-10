const { createApp, ref, watch } = Vue;

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const hands = ref([]);
const clockSize = ref(40);
let clockInterval;
let width = ref(8);
let height = ref(18);

function onResize() {
    if (clockInterval) clearInterval(clockInterval);
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
    startClockInterval();
}
onResize();
watch([width, height], onResize);


function updateClocks(number, x1, y1) {
    for (let y = 0; y < numbers[number].length; y++) {
        for (let x = 0; x < numbers[number][y].length; x++){
            hands.value[y + y1][x + x1].minute = numbers[number][y][x][0];
            hands.value[y + y1][x + x1].hour = numbers[number][y][x][1];
        }
    }
}

function startClockInterval() {
    clockInterval = setInterval(()=>{
        const now = new Date(Date.now());
        
        // hour
        let hours = now.getHours()%12;
        if (hours === 0) hours = 12;

        updateClocks(hours < 10 ? 0 : Number(hours.toString()[0]), 0, 0);
        updateClocks(hours < 10 ? hours : Number(hours.toString()[1]), 4, 0);
        
        // minute
        let minutes = now.getMinutes();

        updateClocks(minutes < 10 ? 0 : Number(minutes.toString()[0]), 0, 6);
        updateClocks(minutes < 10 ? minutes : Number(minutes.toString()[1]), 4, 6);

        // second
        let seconds = now.getSeconds();

        updateClocks(seconds < 10 ? 0 : Number(seconds.toString()[0]), 0, 12);
        updateClocks(seconds < 10 ? seconds : Number(seconds.toString()[1]), 4, 12);
    }, 900);
}

// mount vue
const app = createApp({
    setup() {
        return { width, height, hands, clockSize };
    }
})

app.config.compilerOptions.isCustomElement = (tag) => tag === 'content';

app.mount('body');
