import type { AdminShortLinkData, AdminShortLinkListData } from "$lib/types/LinkGeneratorData";

const shortLinks: AdminShortLinkData[] = [
    {
        suffix: "lhs",
        url: "https://lhs.cx",
        createdAt: 1631990400,
        uses: 0
    },
    {
        suffix: "lhslog",
        url: "https://lhslog.com",
        createdAt: 1631990400,
        uses: 0
    },
    {
        suffix: "laptopform",
        url: "https://example.com",
        password: "password123",
        createdAt: 1631990400,
        uses: 12352,
    }
];

export default { links: shortLinks } as AdminShortLinkListData;