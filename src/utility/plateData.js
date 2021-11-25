const plateData = [
    {
        tankName: "Panther (A, D)",
        nation: "Germany",
        plates: [
            {
                plateName: "Upper front plate",
                thickness: 85,
                angle: 55
            },
            {
                plateName: "Lower front plate",
                thickness: 65,
                angle: 55
            },
            {
                plateName: "Gun mantlet",
                thickness: 110,
                angle: 0
            },
            {
                plateName: "Upper side plate",
                thickness: 40,
                angle: 40
            },
            {
                plateName: "Lower side plate",
                thickness: 40,
                angle: 0
            },
            {
                plateName: "Turret side",
                thickness: 45,
                angle: 25
            },
        ]
    },
    {
        tankName: "Tiger I",
        nation: "Germany",
        plates: [
            {
                plateName: "Upper front plate",
                thickness: 102,
                angle: 10
            },
            {
                plateName: "Lower front plate",
                thickness: 102,
                angle: 20
            },
            {
                plateName: "Gun mantlet",
                thickness: 110,
                angle: 0
            },
            {
                plateName: "Upper side plate",
                thickness: 82,
                angle: 0
            },
            {
                plateName: "Lower side plate",
                thickness: 62,
                angle: 0
            },
            {
                plateName: "Turret side",
                thickness: 82,
                angle: 0
            },
        ]
    },
    {
        tankName: "Tiger II (H)",
        nation: "Germany",
        plates: [
            {
                plateName: "Upper front plate",
                thickness: 150,
                angle: 50
            },
            {
                plateName: "Lower front plate",
                thickness: 100,
                angle: 50
            },
            {
                plateName: "Turret front",
                thickness: 185,
                angle: 10
            },
            {
                plateName: "Upper side plate",
                thickness: 80,
                angle: 25
            },
            {
                plateName: "Lower side plate",
                thickness: 80,
                angle: 0
            },
            {
                plateName: "Turret side",
                thickness: 80,
                angle: 20
            },
        ]
    },
    {
        tankName: "Panzer IV (H)",
        nation: "Germany",
        plates: [
            {
                plateName: "Upper front plate",
                thickness: 80,
                angle: 9
            },
            {
                plateName: "Lower front plate",
                thickness: 80,
                angle: 12
            },
            {
                plateName: "Turret front",
                thickness: 50,
                angle: 10
            },
            {
                plateName: "Upper side plate",
                thickness: 30,
                angle: 0
            },
            {
                plateName: "Lower side plate",
                thickness: 30,
                angle: 0
            },
            {
                plateName: "Turret side",
                thickness: 30,
                angle: 25
            },
        ]
    },


    {
        tankName: "M4A3E8 Sherman",
        nation: "USA",
        plates: [
            {
                plateName: "Upper front plate",
                thickness: 63.5,
                angle: 47
            },
            {
                plateName: "Lower front plate",
                thickness: 63.5,
                angle: 56
            },
            {
                plateName: "Gun mantlet",
                thickness: 88,
                angle: 10
            },
            {
                plateName: "Upper side plate",
                thickness: 38.1,
                angle: 0
            },
            {
                plateName: "Lower side plate",
                thickness: 38.1,
                angle: 0
            },
            {
                plateName: "Turret side",
                thickness: 63.5,
                angle: 13
            },
        ]
    },
    {
        tankName: "M4A3E2 Sherman Jumbo",
        nation: "USA",
        plates: [
            {
                plateName: "Upper front plate",
                thickness: 102,
                angle: 48
            },
            {
                plateName: "Lower front plate",
                thickness: 114,
                angle: 66
            },
            {
                plateName: "Gun mantlet",
                thickness: 177.8,
                angle: 3
            },
            {
                plateName: "Upper side plate",
                thickness: 76.2,
                angle: 0
            },
            {
                plateName: "Lower side plate",
                thickness: 38.1,
                angle: 0
            },
            {
                plateName: "Turret side",
                thickness: 152,
                angle: 13
            },
        ]
    },
    {
        tankName: "M26 Pershing",
        nation: "USA",
        plates: [
            {
                plateName: "Upper front plate",
                thickness: 101.6,
                angle: 46
            },
            {
                plateName: "Lower front plate",
                thickness: 76.2,
                angle: 53
            },
            {
                plateName: "Gun mantlet",
                thickness: 150,
                angle: 0
            },
            {
                plateName: "Side plate",
                thickness: 76.2,
                angle: 0
            },
            {
                plateName: "Turret side",
                thickness: 80,
                angle: 5
            },
        ]
    },


    {
        tankName: "T-34 (1942)",
        nation: "USSR",
        plates: [
            {
                plateName: "Upper front plate",
                thickness: 45,
                angle: 60
            },
            {
                plateName: "Lower front plate",
                thickness: 45,
                angle: 60
            },
            {
                plateName: "Turret front",
                thickness: 53,
                angle: 30
            },
            {
                plateName: "Upper side plate",
                thickness: 40,
                angle: 40
            },
            {
                plateName: "Lower side plate",
                thickness: 45,
                angle: 0
            },
            {
                plateName: "Turret side",
                thickness: 53,
                angle: 21
            },
        ]
    },
    {
        tankName: "KV-1",
        nation: "USSR",
        plates: [
            {
                plateName: "Upper front plate",
                thickness: 75,
                angle: 31
            },
            {
                plateName: "Lower front plate",
                thickness: 75,
                angle: 26
            },
            {
                plateName: "Gun mantlet",
                thickness: 90,
                angle: 0
            },
            {
                plateName: "Side plate",
                thickness: 75,
                angle: 0
            },
            {
                plateName: "Turret side",
                thickness: 82,
                angle: 0
            },
        ]
    },
    {
        tankName: "IS-2 (1944)",
        nation: "USSR",
        plates: [
            {
                plateName: "Upper front plate",
                thickness: 100,
                angle: 60
            },
            {
                plateName: "Lower front plate",
                thickness: 100,
                angle: 29
            },
            {
                plateName: "Gun mantlet",
                thickness: 115,
                angle: 0
            },
            {
                plateName: "Upper side plate",
                thickness: 102,
                angle: 13
            },
            {
                plateName: "Lower side plate",
                thickness: 90,
                angle: 0
            },
            {
                plateName: "Turret side",
                thickness: 100,
                angle: 21
            },
        ]
    },
];

export default plateData;