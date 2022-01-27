function Nakresli_Bodku_Ak_Treba (NaozajTreba: boolean) {
    if (XLedPred != XLed || YLedPred != YLed || NaozajTreba) {
        basic.clearScreen()
        led.plot(XLed, YLed)
        XLedPred = XLed
        YLedPred = YLed
        radio.sendValue("XLed", XLed)
        radio.sendValue("YLed", YLed)
    }
}
function Zisti_Poziciu_LED () {
    Z = pins.digitalReadPin(DigitalPin.P5)
    X = pins.analogReadPin(AnalogPin.P0)
    Y = pins.analogReadPin(AnalogPin.P1)
    XLed = pins.map(
    X,
    0,
    1023,
    0,
    4
    )
    YLed = pins.map(
    Y,
    1023,
    5,
    0,
    4
    )
}
function Ukaz_Vybuch (x: number, y: number) {
    for (let _index = 0; _index <= 4; _index++) {
        Kresli_Stvorec(x, y, _index + 1)
    }
}
function Kresli_Stvorec (x2: number, y2: number, velkost: number) {
    _index2 = x2 - velkost / 2
    while (_index2 < x2 + velkost / 2) {
        _index3 = y2 - velkost / 2
        while (_index3 < y2 + velkost / 2) {
            led.plot(_index2 + 1, _index3 + 1)
            _index3 += 1
        }
        _index2 += 1
    }
}
let _index3 = 0
let _index2 = 0
let Y = 0
let X = 0
let Z = 0
let YLed = 0
let YLedPred = 0
let XLed = 0
let XLedPred = 0
Zisti_Poziciu_LED()
radio.setGroup(1)
basic.forever(function () {
    Zisti_Poziciu_LED()
    if (Z == 0) {
        pins.digitalWritePin(DigitalPin.P5, 1)
        Ukaz_Vybuch(XLed, YLed)
        Z = pins.digitalReadPin(DigitalPin.P5)
        if (Z != 0) {
            Nakresli_Bodku_Ak_Treba(true)
        }
    } else {
        Nakresli_Bodku_Ak_Treba(false)
    }
})
