import { type BulletinBoardData } from '$lib/types/HomePageData';

const bulletinBoard: BulletinBoardData = {
    notes: [
        {
            title: "This is the LHS Connect BETA",
            content: "I (Tyler Place) am completely rewriting the entirety of LHS Connect to be more user-friendly and to be more maintainable.",
        },
        {
            title: "Main Site",
            content: "Click here to be redirect to the main site.",
            link: "https://lhsconnect.com",
        }
    ]
};

export default bulletinBoard;
