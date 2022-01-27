def Vybuchni():
    global Z
    pins.digital_write_pin(DigitalPin.P5, 1)
    Ukaz_Vybuch(XLed, YLed)
    Z = pins.digital_read_pin(DigitalPin.P5)
    if Z != 0:
        Nakresli_Bodku_Ak_Treba(True)
def Nakresli_Bodku_Ak_Treba(NaozajTreba: bool):
    global XLedPred, YLedPred
    if XLedPred != XLed or YLedPred != YLed or NaozajTreba:
        basic.clear_screen()
        led.plot(XLed, YLed)
        XLedPred = XLed
        YLedPred = YLed
def Kresli_Stvorec(x2: number, y2: number, velkost: number):
    _index2 = x2 - velkost / 2
    while _index2 < x2 + velkost / 2:
        _index3 = y2 - velkost / 2
        while _index3 < y2 + velkost / 2:
            led.plot(_index2 + 1, _index3 + 1)
            _index3 += 1
        _index2 += 1
def Zisti_Poziciu_LED():
    global Z, X, Y, XLed, YLed
    Z = pins.digital_read_pin(DigitalPin.P5)
    X = pins.analog_read_pin(AnalogPin.P0)
    Y = pins.analog_read_pin(AnalogPin.P1)
    XLed = pins.map(X, 0, 1023, 0, 4)
    YLed = pins.map(Y, 1023, 5, 0, 4)
def Ukaz_Vybuch(x: number, y: number):
    for _index in range(5):
        Kresli_Stvorec(x, y, _index + 1)
Y = 0
X = 0
YLedPred = 0
XLedPred = 0
Z = 0
YLed = 0
XLed = 0
Zisti_Poziciu_LED()

def on_forever():
    Zisti_Poziciu_LED()
    if Z == 0:
        Vybuchni()
    else:
        Nakresli_Bodku_Ak_Treba(False)
basic.forever(on_forever)
