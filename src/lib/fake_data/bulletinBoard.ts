import { StickyNoteColor, type BulletinBoardData } from '$lib/types/HomePageData';

const bulletinBoard: BulletinBoardData = {
	content: "Welcome to the bulletin board! Here you can find important announcements and information.",
    notes: [
        {
            content: "Exhibition project placement has been released! [Click Here](https://districtlms.seattleschools.org/page/7295699823) to view which project you will be exhibiting!",
            color: StickyNoteColor.Yellow,
            rotation: 2
        },
        {
            content: "This is a sticky note! Yippee!!",
            color: StickyNoteColor.Blue,
            rotation: -3
        },
        {
            content: "This is a sticky note! Yippee!!",
            color: StickyNoteColor.Pink,
            rotation: 1
        },
    ]
};

export default bulletinBoard;
