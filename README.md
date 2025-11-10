# Analog to Digital

A GRID of analog clocks making a digital clock.

This project was inspired by [this reddit post](https://www.reddit.com/r/oddlysatisfying/comments/paitjp/a_digital_clock_made_of_analogs).

## Live Demo
You can try out the live demo [here](http://nawab-as.software/analogToDigital/)!


## Features

- Different clock layouts (vertical/horizontal)
- Settings menu
    - 24/12-hour time formats
    - Moving colons (disableable)


## Installation

### Requirements
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Local development server
<br><br>

1. Clone this repository with git:
```bash
git clone https://github.com/Nawab-AS/analogToDigital.git
cd ./analogToDigital
```

2. Host using any web server

Since this is a static web page, you can host it with any web server, personally, I used python's builtin http server with:
```bash
python -m http.server -p 3000
```
Then visit `http://localhost:3000` in your browser


## Adding new clock layouts
To add a new clock layout you need to modify the `clockStyles.js` file.
The `clockStyles.js` file contains a nested object structure with the following schema:

```js
const clockStyles = {
    // ...

    "myNewClockStyle":{
        grid: {width: 8, height: 18}, // defines the size of the style
        hint: "Vertical (with seconds)", // the text that appears in the dropdown menu
        frame: ()=>{} // function that will be called once every 1/20 seconds
    }
}
```

There are a two helper functions that are predefined:
1. displayNumber(int Number, int xPos, int yPos)

Displays a two digit number, numbers that are less than ten are automatically padded, taking up 8x6 clocks (top-left anchor).

Will raise a `typeError` if xPos or yPos are out of bounds

<br>
2. displayColot(boolean inverted, int xPos, int yPos)

Displays a colon, the colon clocks are inverted if `inverted` is true, taking up 2x6 clocks (top-left anchor).

Will raise a `typeError` if xPos or yPos are out of bounds


### Example

```js
const clockStyles = {
    // ...

    "seconds":{
        grid: {width: 8, height: 6},
        hint: "Horizontal (seconds only)",
        frame: ()=>{
            const now = new Date(Date.now());
            
            // seconds
            let seconds = now.getSeconds();
            displayNumber(seconds, 0, 0);
        }
    }
}
```