const clubs = [
	{
		name: 'Animal Welfare Club',
		day: 'First Tuesday',
		time: 'Lunch',
		location: '363',
		advisor: 'Campbell, E',
		instagram: ''
	},
	{
		name: 'Art Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: '134',
		advisor: 'Baker',
		instagram: ''
	},
	{
		name: 'Asian Student Union (ASU)',
		day: 'Wednesday',
		time: 'Lunch',
		location: '271 (Multipurpose Room)',
		advisor: 'Tsujimoto',
		instagram: 'lincoln.asu'
	},
	{
		name: 'Astronomy Club',
		day: 'Monday',
		time: 'Lunch',
		location: '442',
		advisor: 'Eisenbery',
		instagram: ''
	},
	{
		name: 'Baking Club',
		day: 'Monday',
		time: 'Lunch',
		location: '235',
		advisor: 'Ware',
		instagram: 'lhs_bakingclub'
	},
	{
		name: 'Birding Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: '352',
		advisor: 'Melvin/Nimni',
		instagram: 'lhs_birdingclub'
	},
	{
		name: 'Black Student Union (BSU)',
		day: 'Tuesday',
		time: 'Lunch',
		location: '361',
		advisor: 'Ali, Jones, Flavors',
		instagram: 'lincolnlynxbsu'
	},
	{
		name: 'Botany Club',
		day: 'Thursday',
		time: 'Lunch',
		location: '341',
		advisor: 'Drouin',
		instagram: 'lhs.botany.club'
	},
	{
		name: "Boy's Volleyball Club",
		day: 'Every first Tuesday of the month at lunch (363), Wednesday mornings (gym), Friday mornings (gym) and during lunch (gym)',
		time: 'Lunch and Mornings',
		location: 'Gym',
		advisor: 'Sauvage, Cambells',
		instagram: ''
	},
	{
		name: 'Brawl Stars Club',
		day: '2nd/4th Wednesday',
		time: 'Lunch',
		location: '168',
		advisor: 'Myers, A',
		instagram: 'lincoln_hs_bsc'
	},
	{
		name: 'Bread Club',
		day: 'Monday',
		time: 'Afterschool 4:00 -5:00',
		location: '363',
		advisor: 'Campbell, E',
		instagram: ''
	},
	{
		name: 'Career Exploration',
		day: 'Last Thursday',
		time: 'Lunch',
		location: '445',
		advisor: 'Noyes',
		instagram: ''
	},
	{
		name: 'Chainlynx Robotics',
		day: 'Tuesday, Thursday, Friday',
		time: 'Tues/Fri 3:45 - 5:30, Thurs 5:30 - 8',
		location: '167, 168, Fab Lab',
		advisor: 'Myers, A/Myers, J',
		instagram: 'chainlynx.robotics'
	},
	{
		name: 'Charcuterie Club',
		day: 'Tuesday',
		time: 'Lunch',
		location: '232',
		advisor: 'Martin',
		instagram: ''
	},
	{
		name: 'Chess Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: '206',
		advisor: 'Snyder',
		instagram: ''
	},
	{
		name: 'Chinese Club',
		day: 'Thursday',
		time: 'Lunch',
		location: '352',
		advisor: 'Nimni',
		instagram: 'lhschinese_club'
	},
	{
		name: 'Climbing Club',
		day: 'Tuesday',
		time: 'Lunch',
		location: '432',
		advisor: 'Fox',
		instagram: 'lincoln_climbs'
	},
	{
		name: 'Color Guard',
		day: 'Tuesday',
		time: 'Lunch',
		location: '271 (Multipurpose Room)',
		advisor: 'MacIntyre',
		instagram: 'lincoln_color_guard'
	},
	{
		name: 'Craft Club',
		day: '1st/3rd Thursday',
		time: 'Lunch',
		location: '431',
		advisor: 'Richards',
		instagram: ''
	},
	{
		name: 'Crossword Club',
		day: 'Monday',
		time: 'Lunch',
		location: '445',
		advisor: 'Noyes',
		instagram: 'lincoln_crosswordclub'
	},
	{
		name: 'CSD (Communication Sciences and Disorders) Careers',
		day: 'Alt Friday',
		time: 'Lunch',
		location: '337',
		advisor: 'Babington',
		instagram: ''
	},
	{
		name: 'Cultural Education Committee',
		day: 'Tuesday',
		time: 'Lunch',
		location: '267',
		advisor: 'Ridabock',
		instagram: 'cec.lincoln'
	},
	{
		name: 'Dance Team',
		day: 'Wednesday',
		time: 'Afterschool 2:30 - 3:30',
		location: '271 (Multipurpose Room)',
		advisor: 'Wyn Pottinger-Levy',
		instagram: ''
	},
	{
		name: 'Debate Club',
		day: 'Tuesday',
		time: 'Lunch',
		location: '368',
		advisor: 'Gandy',
		instagram: 'lincolndebateclub'
	},
	{
		name: 'DECA',
		day: 'Friday',
		time: 'Lunch',
		location: '243',
		advisor: 'Reed',
		instagram: 'lincolnhsdeca'
	},
	{
		name: 'Diabetes Student Union',
		day: '1st/3rd Wednesday',
		time: 'Lunch',
		location: '366',
		advisor: 'Hanigans',
		instagram: ''
	},
	{
		name: 'Disabled Student Union (DSU)',
		day: 'Tuesday',
		time: 'Lunch',
		location: '111',
		advisor: 'Hoban',
		instagram: 'lhs.dsu'
	},
	{
		name: 'Drama Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: 'C111',
		advisor: 'Sullivan',
		instagram: 'lynxtheatrearts'
	},
	{
		name: 'Dungeons & Dragons Club',
		day: 'Monday',
		time: '3:40- 5:30',
		location: '161',
		advisor: 'Bess',
		instagram: ''
	},
	{
		name: 'Economics club',
		day: 'Friday',
		time: 'Lunch',
		location: '243',
		advisor: 'Reed',
		instagram: 'lincoln.investclub'
	},
	{
		name: 'Environmental Club',
		day: 'Monday',
		time: 'Lunch',
		location: '163',
		advisor: 'Fox',
		instagram: 'lincoln_environmentalclub'
	},
	{
		name: 'Ethics Bowl',
		day: 'Wednesday',
		time: '8:15-8:35 A.M.',
		location: '351',
		advisor: "D'amico",
		instagram: ''
	},
	{
		name: 'Fabrication Club',
		day: 'Monday',
		time: 'Afterschool 3:40 - 5:00',
		location: 'Fab Lab',
		advisor: 'Myers, J',
		instagram: ''
	},
	{
		name: 'Feminism Club',
		day: 'Alt Tuesday',
		time: 'Lunch',
		location: '163',
		advisor: 'Fox, Jen',
		instagram: 'lincolnfeminismclub'
	},
	{
		name: 'Film Club',
		day: 'Thursday',
		time: 'Lunch',
		location: '206',
		advisor: 'Bubb',
		instagram: 'lincolnhsfilmclub'
	},
	{
		name: 'Fishing Club',
		day: '2nd/4th Wednesday',
		time: 'Lunch',
		location: '235',
		advisor: 'Ware/Barnes',
		instagram: 'lincolnfishingclub'
	},
	{
		name: 'Filipino Student Union',
		day: '2nd/4th Tuesday',
		time: 'Lunch',
		location: '431',
		advisor: 'Richards',
		instagram: ''
	},
	{
		name: 'French Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: '362',
		advisor: 'Crane',
		instagram: ''
	},
	{
		name: 'Frog Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: 'Library',
		advisor: 'Scott',
		instagram: ''
	},
	{
		name: 'Garden Club',
		day: '1st/3rd Tuesday',
		time: 'Lunch',
		location: 'C116',
		advisor: 'Smith',
		instagram: ''
	},
	{
		name: 'Golf Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: '8',
		advisor: 'Hashemi',
		instagram: ''
	},
	{
		name: 'Guitar Club',
		day: 'Monday',
		time: 'Lunch',
		location: 'C102',
		advisor: 'MacIntyre',
		instagram: 'lhs.guitar'
	},
	{
		name: 'Ham Radio Club',
		day: 'Tuesday',
		time: 'Lunch',
		location: '167',
		advisor: 'Myers, A',
		instagram: ''
	},
	{
		name: 'Honk Band',
		day: 'Wednesday & Thursday',
		time: 'Afterschool 3:50 - 4:45',
		location: 'C102',
		advisor: 'Cassidy',
		instagram: 'lincoln.honk.band'
	},
	{
		name: 'HOSA',
		day: 'Wednesday',
		time: 'Lunch',
		location: '342',
		advisor: 'Drouin',
		instagram: 'hosa_atlhs'
	},
	{
		name: 'Improv Club (Drama Club)',
		day: 'Tuesday',
		time: 'Lunch',
		location: 'C111',
		advisor: 'Sullivan',
		instagram: 'lynxtheatrearts'
	},
	{
		name: 'International Youth In Neuroscience Association',
		day: 'Alt Monday',
		time: 'Lunch',
		location: '341',
		advisor: 'Nabet',
		instagram: 'lhs_iyna'
	},
	{
		name: 'Japanese Conversation Club',
		day: 'Monday',
		time: 'Lunch',
		location: '268',
		advisor: 'Ishikawa',
		instagram: 'lincolnjapaneseclub'
	},
	{
		name: 'Jewish Student Union (JSU)',
		day: 'Monday',
		time: 'Lunch',
		location: '352',
		advisor: 'Nimni',
		instagram: 'lincolnhsjsu'
	},
	{
		name: 'Journalism Club',
		day: 'Monday',
		time: 'Lunch',
		location: '363',
		advisor: 'Campbell, E',
		instagram: 'lincoln.newspaper'
	},
	{
		name: 'Junior State of America (JSA)',
		day: 'Tuesday & Thursday',
		time: 'Lunch',
		location: '333',
		advisor: 'Chapman',
		instagram: 'lincoln_jsd'
	},
	{
		name: 'Keep Calm and Carry Yarn',
		day: 'Tuesday',
		time: 'Lunch',
		location: '263',
		advisor: 'Vermaak',
		instagram: ''
	},
	{
		name: 'K-Dance Club',
		day: 'Monday & Thursday',
		time: 'Lunch',
		location: '271 (Multipurpose Room)',
		advisor: 'Choi',
		instagram: 'lhs_etern1ty'
	},
	{
		name: 'Key Club',
		day: 'Thursday',
		time: 'Lunch',
		location: '163',
		advisor: 'Fox',
		instagram: 'keyclublincolnhs'
	},
	{
		name: 'Keystone Club',
		day: 'Tuesday',
		time: 'Lunch',
		location: '353',
		advisor: 'Montgomery',
		instagram: 'lhs_keystone'
	},
	{
		name: 'Lacrosse Club',
		day: '',
		time: '',
		location: '205',
		advisor: 'Snyder',
		instagram: ''
	},
	{
		name: 'Latine Student Union (LSU)',
		day: 'Wednesday',
		time: 'Lunch',
		location: '334',
		advisor: 'Arias/Rivas',
		instagram: 'lincoln_lsu'
	},
	{
		name: 'LHS 4 Climate Justice',
		day: 'Thursday',
		time: 'Lunch',
		location: '351',
		advisor: 'D?Amico',
		instagram: 'lhs4climatejustice'
	},
	{
		name: 'Lifting Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: 'Weight Room',
		advisor: 'Savauge',
		instagram: 'lincoln_lifting'
	},
	{
		name: 'Lincoln Outdoors Group',
		day: 'Monthly Thursday',
		time: 'Lunch',
		location: '235',
		advisor: 'Ware/Barnes',
		instagram: ''
	},
	{
		name: 'Literature Club',
		day: 'Friday',
		time: 'Lunch',
		location: '437',
		advisor: 'Long',
		instagram: 'lincolnlitclub'
	},
	{
		name: 'Lynxfeed',
		day: 'Tuesday',
		time: 'Lunch',
		location: '437',
		advisor: 'Long',
		instagram: 'lynxfeed_'
	},
	{
		name: 'Math Club',
		day: 'Monday',
		time: 'Lunch',
		location: '8',
		advisor: 'Hashemi',
		instagram: ''
	},
	{
		name: 'Mock Trial',
		day: 'Monday',
		time: 'Afterschool 3:40 - 4:40',
		location: '432',
		advisor: 'Fox',
		instagram: 'lincolnmocktrialclub'
	},
	{
		name: 'Model UN',
		day: 'Tuesday & Thursday',
		time: 'Lunch/Afterschool 4:00-5:30',
		location: '445',
		advisor: 'Noyes',
		instagram: 'lhs__modelun'
	},
	{
		name: 'Movie Club',
		day: 'Friday',
		time: 'Lunch',
		location: '431',
		advisor: 'Richards',
		instagram: ''
	},
	{
		name: 'Music Appreciation Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: '326',
		advisor: 'Campbell, C',
		instagram: 'lhs_music_club'
	},
	{
		name: 'Nutrition Club',
		day: '2rd/4th Thursday',
		time: 'Lunch',
		location: '235',
		advisor: 'Barnes',
		instagram: ''
	},
	{
		name: 'Philosophy Club',
		day: 'Monday',
		time: 'Lunch',
		location: '10',
		advisor: 'Melvin',
		instagram: ''
	},
	{
		name: 'Photography/Sports Photography Club',
		day: 'Monday',
		time: 'Lunch',
		location: '331',
		advisor: 'Ahlers',
		instagram: ''
	},
	{
		name: 'Playing Music Club',
		day: 'Monday',
		time: 'Lunch',
		location: 'C104',
		advisor: 'Greenbaum',
		instagram: ''
	},
	{
		name: 'Poetry Club',
		day: 'Thursday',
		time: 'Lunch',
		location: '133',
		advisor: 'So',
		instagram: 'lincolnhspoetryclub'
	},
	{
		name: 'Potluck Club',
		day: 'First Monday',
		time: 'Lunch',
		location: '451',
		advisor: "O'Hearn",
		instagram: ''
	},
	{
		name: 'Programming Club',
		day: 'Thursday',
		time: 'Lunch',
		location: '168',
		advisor: 'Myers, A',
		instagram: 'lincoln_programmers'
	},
	{
		name: 'RC Club of Lincoln High School',
		day: 'Every other Tuesday',
		time: 'Lunch',
		location: '206',
		advisor: 'Bubb, N',
		instagram: 'lhsrcclub'
	},
	{
		name: 'Red Cross Club',
		day: 'Friday',
		time: 'Lunch',
		location: '233',
		advisor: 'Hathaway',
		instagram: 'lincolnredcrossclub'
	},
	{
		name: 'Rocket Club',
		day: 'Thursday',
		time: 'Afterschool 4:00 - 5:45',
		location: 'Fab Lab',
		advisor: 'Lowe',
		instagram: 'lhs.rockets'
	},
	{
		name: 'Romanian Language Club',
		day: 'Tuesday',
		time: 'Lunch',
		location: '246',
		advisor: 'Karp',
		instagram: ''
	},
	{
		name: 'Scholarship Society',
		day: 'Wednesday',
		time: 'Lunch',
		location: '452',
		advisor: 'Laudick',
		instagram: 'scholarshipsocietyLHS'
	},
	{
		name: 'Science Olympiad',
		day: 'Monday',
		time: 'Lunch',
		location: '162',
		advisor: 'Bess',
		instagram: ''
	},
	{
		name: 'Seattle Student Union LHS Chapter',
		day: 'Monthly Friday',
		time: 'Lunch',
		location: '352',
		advisor: 'Nimni',
		instagram: 'lhs.seattlestudentunion'
	},
	{
		name: 'Sexuality and Gender Alliance (SAGA)',
		day: 'Thursday',
		time: 'Afterschool 3:50 - 4:45',
		location: 'Library',
		advisor: 'Scott',
		instagram: 'lincolnsaga'
	},
	{
		name: 'Skateboarding Club',
		day: 'Friday',
		time: 'Lunch',
		location: '108',
		advisor: 'Choi',
		instagram: 'lincolnskateclub'
	},
	{
		name: 'Ski Club',
		day: 'Alt Tuesday',
		time: 'Lunch',
		location: '353',
		advisor: 'Montgomery',
		instagram: 'lincoln_ski_club'
	},
	{
		name: 'Social Justice Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: '434',
		advisor: 'Jones',
		instagram: 'lhs_socialjusticeclub'
	},
	{
		name: 'Sports Journalism Club',
		day: 'Tuesday',
		time: 'Lunch',
		location: '351',
		advisor: "D'amico",
		instagram: 'lhs.sportsjournalism'
	},
	{
		name: 'STEM Consulting Club',
		day: '1st/3rd Thursday',
		time: 'Lunch',
		location: '204',
		advisor: 'Theoryn',
		instagram: 'lhs.stemconsulting'
	},
	{
		name: 'Sustainability Club',
		day: '1st/3rd Thursday',
		time: 'Lunch',
		location: '342',
		advisor: 'Nabet',
		instagram: ''
	},
	{
		name: 'Table Tennis Club',
		day: 'Alt Thursday',
		time: 'Lunch',
		location: '163',
		advisor: 'Davidson',
		instagram: 'lincolntabletennis'
	},
	{
		name: 'T-Mobile Club',
		day: 'Tuesday',
		time: 'Lunch',
		location: '431',
		advisor: 'Richards',
		instagram: 'tmobileclub'
	},
	{
		name: 'Taylor Swift Club',
		day: '2nd and 4th Tuesday',
		time: 'Lunch',
		location: '351',
		advisor: "D'Amico",
		instagram: ''
	},
	{
		name: 'The Alumni of Genome Science Club',
		day: 'Thursday',
		time: 'Lunch',
		location: '263',
		advisor: 'Vermaak',
		instagram: ''
	},
	{
		name: 'Thespian Troupe (Drama Club)',
		day: 'First Thursday',
		time: 'Lunch',
		location: 'C111',
		advisor: 'Sullivan',
		instagram: 'lynxtheatrearts'
	},
	{
		name: 'Unconventional Activities Club',
		day: 'Friday',
		time: 'Lunch',
		location: '445',
		advisor: 'Noyes',
		instagram: ''
	},
	{
		name: 'Unified',
		day: 'Wednesday',
		time: '',
		location: '111',
		advisor: 'Ahlers/Guy',
		instagram: ''
	},
	{
		name: 'UThrift',
		day: 'Alt Wednesday',
		time: 'Lunch',
		location: '351',
		advisor: "D'Amico",
		instagram: 'lincolnuthrift'
	},
	{
		name: 'Voice in Sports Chapter',
		day: 'Alt Thursday',
		time: 'Lunch',
		location: '235',
		advisor: 'Ware',
		instagram: ''
	},
	{
		name: 'Water1st',
		day: 'Alt Tuesday',
		time: 'Lunch',
		location: '235',
		advisor: 'Ware',
		instagram: 'water1st_lincolnhs'
	},
	{
		name: 'Wheels and Reels Biking',
		day: 'Alt Thursday',
		time: 'Lunch',
		location: '453',
		advisor: 'Manes',
		instagram: ''
	},
	{
		name: 'Wiffle Ball Club',
		day: 'Alt Tuesday',
		time: 'Lunch',
		location: 'Gym',
		advisor: 'Sauvage',
		instagram: 'lhswiffleballclub'
	},
	{
		name: 'Women In Business',
		day: 'Friday',
		time: 'Lunch',
		location: '353',
		advisor: 'Montgomery',
		instagram: ''
	},
	{
		name: 'WOCSU (Women of Color Student Union)',
		day: 'Friday',
		time: 'Lunch',
		location: '133',
		advisor: 'So',
		instagram: 'wocsu_lhs'
	},
	{
		name: 'Women in STEM',
		day: 'Friday',
		time: 'Lunch',
		location: '7',
		advisor: 'Cedillo',
		instagram: 'women_in_stem_at_lhs'
	},
	{
		name: 'Writing Club',
		day: 'Wednesday',
		time: 'Lunch',
		location: '363',
		advisor: 'Campbell, E',
		instagram: ''
	}
];

export default clubs;
