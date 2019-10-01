export class Statics {
    static globalPeople: Person[];
    static lastItemId: number;
    static globalItems: Item[];

    constructor() {
        Statics.globalPeople = [
            {
                Id: 0,
                Name: "First Person",
                Items: [{ Id: 0 }, { Id: 1 }],
                Total: 5
            },
            {
                Id: 1,
                Name: "Second"
            },
        ];

        Statics.lastItemId = 0;
        Statics.globalItems = [
            {
                Id: 0,
                Name: "First Item",
                Price: 5,
                People: [
                    {
                        Id: 0,
                        Name: "First Person",
                        Items: [{ Id: 0 }, { Id: 1 }]
                    }
                ]

            },
        ];
    }
}