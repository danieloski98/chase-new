export type ICommunity = {
    active: boolean;
    createdOn: number;
    id: string;
    joinStatus: 'CONNECTED',
    creator: {
        dob: string;
        firstName: string;
        joinStatus: string;
        lastName: string;
        publicProfile: boolean;
        userId: string;
        username: string;
        data: {
            about: {
                value: string;
            },
            city: {
                value: string;
            },
            country: {
                value: string;
            },
            favourites: {
                value: string;
            },
            gender: {
                value: string;
            },
            images: {
                value: string;
            },
            maritalStatus: {
                value: string;
            },
        },
    },
    data: {
        address: string,
        contactNumber: string,
        description: string,
        email: string,
        favorites: string,
        imgSrc: string,
        isPublic: boolean,
        oin_settings: 'AUTO',
        memberCount: number,
        name: string,
        password: string,
        picUrls: Array<string>,
    }
}
