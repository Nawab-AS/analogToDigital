const clockStyles = {
    'vetical1': {
        grid: {width: 8, height: 18},
        hint: "Vertical (with seconds)",
        onSecond: () => {
            const now = new Date(Date.now());
            
            // hour
            let hours = now.getHours();
            if (!timeFormat24.value) {
                hours = hours%12;
                if (hours === 0) hours = 12;
            }
            displayNumber(hours, 0, 0);
            
            // minute
            let minutes = now.getMinutes();
            displayNumber(minutes, 0, 6);

            // second
            let seconds = now.getSeconds();
            displayNumber(seconds, 0, 12);
        },
    },

    
    'vetical2': {
        grid: {width: 8, height: 12},
        hint: "Vertical (without seconds)",
        onSecond: (updateClocks) => {
            const now = new Date(Date.now());
            
            // hour
            let hours = now.getHours();
            if (!timeFormat24.value) {
                hours = hours%12;
                if (hours === 0) hours = 12;
            }
            displayNumber(hours, 0, 0);
            
            // minute
            let minutes = now.getMinutes();
            displayNumber(minutes, 0, 6);
        },
    },

    
    'traditional1': {
        grid: {width: 28, height: 6},
        hint: "Horizontal (with seconds)",
        onSecond: (updateClocks) => {
            const now = new Date(Date.now());
            
            // hour
            let hours = now.getHours();
            if (!timeFormat24.value) {
                hours = hours%12;
                if (hours === 0) hours = 12;
            }
            displayNumber(hours, 0, 0);
            
            // minute
            let minutes = now.getMinutes();
            displayNumber(minutes, 10, 0);

            // second
            let seconds = now.getSeconds();
            displayNumber(seconds, 20, 0);
            
            // colons
            displayColon(now.getSeconds()%2 == 1, 8, 0);
            displayColon(now.getSeconds()%2 == 1, 18, 0);
        },
    },

    
    'traditional2': {
        grid: {width: 18, height: 6},
        hint: "Horizontal (without seconds)",
        onSecond: (updateClocks) => {
            const now = new Date(Date.now());
            
            // hour
            let hours = now.getHours();
            if (!timeFormat24.value) {
                hours = hours%12;
                if (hours === 0) hours = 12;
            }
            displayNumber(hours, 0, 0);
            
            // minute
            let minutes = now.getMinutes();
            displayNumber(minutes, 10, 0);
            
            // colons
            displayColon(now.getSeconds()%2 == 1, 8, 0);
        },
    },
}