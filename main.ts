function updateLED (list: number[]) {
    strip.clear()
    for (let value of list) {
        strip.setPixelColor(value, neopixel.colors(NeoPixelColors.Green))
    }
    strip.show()
}
function back (state: number) {
    mooncar.MoonCarGo(mooncar.Direction.direct5, 0)
    for (let index = 0; index < 1; index++) {
        if (state == 1) {
            mooncar.MoonCarLR(-11, 11)
        } else if (state == 2) {
            mooncar.MoonCarLR(9, -9)
        }
        basic.pause(500)
    }
    if (mooncar.LineFollowerSensor() == 0) {
        laststate = 0
    }
}
let laststate = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P12, 8, NeoPixelMode.RGB)
strip.setBrightness(16)
basic.forever(function () {
    if (mooncar.LineFollowerSensor() == 0) {
        mooncar.MoonCarLR(15, 23)
        updateLED([1, 2])
    } else if (mooncar.LineFollowerSensor() == 1) {
        mooncar.MoonCarLR(0, 11)
        updateLED([3, 4])
        laststate = 1
    } else if (mooncar.LineFollowerSensor() == 2) {
        mooncar.MoonCarLR(11, 0)
        updateLED([0, 7])
        laststate = 2
    } else {
        updateLED([5, 6])
        back(laststate)
    }
})
basic.forever(function () {
    while (mooncar.UltrasonicSensor() < 8) {
        mooncar.MoonCarGo(mooncar.Direction.direct5, 0)
    }
})
