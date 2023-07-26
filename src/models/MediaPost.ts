export interface IMediaPost {
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number,
    numberOfElement: number;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
    };
    size: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    totalElements: number;
    totalPages: number;

    content: Array<IMediaContent>;
}

export interface IMediaContent {
    commentCount: number;
    data: any;
    id: string;
    isGroupFeed: boolean;
    likeCount: number;
    likeStatus: string;
    mediaRef: string;
    multipleMediaRef: string[];
    postType: string;
    publicPost: boolean;
    shareCount: number;
    shareID: string;
    shareWith: any;
    sourceId: string;
    text: string;
    timeInMilliseconds: number;
    type: string;
    videoLength: number;
    viewCount: number;
    viewStatus: string;
    comments:{
        content: Array<any>;
        empty: boolean;
        first: boolean;
        last: boolean;
        number: number,
        numberOfElement: number;
        pageable: {
            offset: number;
            pageNumber: number;
            pageSize: number;
            paged: boolean;
            unpaged: boolean;
            sort: {
                sorted: boolean;
                unsorted: boolean;
                empty: boolean;
            };
        };
        size: number;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
        totalElements: number;
        totalPages: number;
    };
    time: {
        dayOfMonth: number;
        monthOfYear: number;
        year: number;
        millis: number;

    },
    user: {
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
            favourites:{
                value: string;
            },
            gender: {
                value: string;
            },
            images: {
                value: string[];
            },
            imgMain: {
                value: string
            },
            maritalStatus: {
                value: string;
            }
            mobilePhone: {
                value: string;
            }
            state: {
                value: string
            },
            userSchool: {
                value: string;
            },
            webAddress: {
                value: string;
            }
            work: {
                value: string;
            }
    }
};
}