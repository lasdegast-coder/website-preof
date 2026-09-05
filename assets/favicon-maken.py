#!/usr/bin/env python3
"""De favicons opnieuw tekenen.

    python3 assets/favicon-maken.py

De PNG's en de .ico worden hier getekend, niet uit favicon.svg gehaald: er
staat op deze Mac geen SVG-omzetter. De vormen hieronder zijn dezelfde als
in favicon.svg, op hetzelfde raster van 64 bij 64. Verander je het merkteken,
pas dan allebei aan — en denk ook aan bridgeMark() in script.js, dat is de
fijnere versie voor op de pagina zelf.

Waarom het merkteken hier zwaarder is dan op de site: in een browsertabblad
is het icoon 16 pixels. Een dekbalk van 1/15 van de breedte wordt dan één
pixel en de boog nog dunner. Bij dit formaat overleeft alleen het silhouet.
"""

from PIL import Image, ImageDraw

ACHTERGROND = "#2B6B4F"   # --green: het middengroen van de huisstijl
MERKTEKEN   = "#F4EFE3"   # --paper
SCHAAL      = 8           # eerst groot tekenen, dan verkleinen: gladde randen


def teken(grootte):
    """Het icoon op ware grootte, met doorzichtige hoeken."""
    n = grootte * SCHAAL
    eenheid = n / 64                      # het ontwerp staat op een raster van 64
    beeld = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    tekenaar = ImageDraw.Draw(beeld)

    def vak(x1, y1, x2, y2):
        return [x1 * eenheid, y1 * eenheid, x2 * eenheid, y2 * eenheid]

    # de afgeronde vierkante achtergrond
    tekenaar.rounded_rectangle(vak(0, 0, 64, 64), radius=14 * eenheid, fill=ACHTERGROND)

    # de boog: een halve ring met middelpunt (32,48), buitenkant 20, binnenkant 14.
    # Eerst de hele bovenste halve schijf, daarna het midden er weer uit in de
    # achtergrondkleur. In PIL loopt 0 graden naar rechts en gaat het met de
    # klok mee, dus 180 tot 360 is precies de bovenste helft.
    tekenaar.pieslice(vak(12, 28, 52, 68), 180, 360, fill=MERKTEKEN)
    tekenaar.pieslice(vak(18, 34, 46, 62), 180, 360, fill=ACHTERGROND)

    # de twee pijlers en de dekbalk erboven
    tekenaar.rectangle(vak(12, 40, 18, 48), fill=MERKTEKEN)
    tekenaar.rectangle(vak(46, 40, 52, 48), fill=MERKTEKEN)
    tekenaar.rectangle(vak(12, 16, 52, 22), fill=MERKTEKEN)

    return beeld.resize((grootte, grootte), Image.LANCZOS)


def maak():
    for naam, grootte in [("favicon-32.png", 32),
                          ("favicon-192.png", 192),
                          ("apple-touch-icon.png", 180)]:
        teken(grootte).save("assets/" + naam)
        print("geschreven: assets/" + naam)

    # De .ico bevat drie formaten in één bestand; Windows en oudere browsers
    # kiezen zelf welke ze pakken.
    teken(48).save("assets/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("geschreven: assets/favicon.ico (16, 32 en 48)")

    # Ook eentje in de hoofdmap. De link in de HTML wijst naar assets/, maar
    # veel crawlers en oude browsers vragen uit gewoonte /favicon.ico op zonder
    # naar de pagina te kijken. Zonder dit bestand krijgen die een 404 en tonen
    # ze een wereldbolletje.
    teken(48).save("favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("geschreven: favicon.ico (in de hoofdmap, voor crawlers)")


if __name__ == "__main__":
    maak()
