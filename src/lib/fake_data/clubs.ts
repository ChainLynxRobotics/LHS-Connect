import type { ClubPageData } from "$lib/types/ClubPageData";

const clubs = [
	{
	  "name": "Animal Welfare Club",
	  "day": "Tuesdays",
	  "time": "Lunch",
	  "location": "363",
	  "advisor": "Ms. Cambell",
	  "desc": "Animal Welfare Club is open to any students that are interested in working to protect animals and learn more about animal welfare! We meet the first Tuesday of every month, and have many volunteer opportunities and fun field trips."
	},
	{
	  "name": "Art Club",
	  "day": "Thursdays",
	  "time": "Lunch",
	  "location": "134",
	  "advisor": "Ms. Baker",
	  "instagram": "lhs__art.club",
	  "desc": "Art Club meets Thursdays during lunch each week! We love art, from a wide variety of projects (like group posters, individual projects, etc. ), to talking about it, to just hanging out and having lunch. You do not need any materials or skill level to join, were just here to have fun!"
	},
	{
	  "name": "ASB",
	  "day": "Tuesday",
	  "time": "Morning",
	  "location": "231",
	  "advisor": "Goehring",
	  "instagram": "lincolnseattle",
	  "desc": "N/A"
	},
	{
	  "name": "Astronomy Club",
	  "day": "Monday",
	  "time": "Lunch",
	  "location": "442",
	  "advisor": "Mr. Garcia",
	  "desc": "Astronomy club has presentations on space, physics, and of course astronomy. We are currently working on restoring the schools telescopes!"
	},
	{
	  "name": "ASU",
	  "day": "Wednesday",
	  "time": "Lunch",
	  "location": "Spin room",
	  "advisor": "Ms. Tsujimoto and Mr. Lim",
	  "instagram": "lincoln.asu",
	  "desc": "Lincoln's ASU is dedicated to creating a familiar, welcoming space for all Asian students! We host movie nights, fundraise snack boxes, and aim to share our diverse, expansive culture with our Lincoln community. We're excited to meet you!"
	},
	{
	  "name": "Baking Club",
	  "day": "Mondays at lunch",
	  "time": "",
	  "location": "235",
	  "advisor": "Mr barnes/Ms ware",
	  "desc": "Baking club is open to anyone who loves to bake, and eat home baked goods! We decide on a theme every week and bring baked goods we made over the weekend to make Monday mornings a little better"
	},
	{
	  "name": "Botany Club",
	  "day": "",
	  "time": "",
	  "location": "341",
	  "advisor": "Ms. Drouin",
	  "desc": "Botany Club meets up at lunch to discuss and grow plants, and to do plant-related activities. All levels of interest welcome!"
	},
	{
	  "name": "Boys Volleyball Club",
	  "day": "",
	  "time": "",
	  "location": "Gym",
	  "advisor": "Mr. Sauvage",
	  "instagram": "lhs.boys.volleyball",
	  "desc": "Boys' volleyball club is open to boys of all experience levels at Lincoln who are interested in volleyball. Bring your school and team spirit, and join us at our practices! We play scrimmages and games against Lincoln's girls' volleyball team and against other schools' clubs. Come try it and see if it's for you!"
	},
	{
	  "name": "Bread Club",
	  "day": "Mondays",
	  "time": "",
	  "location": "363",
	  "advisor": "Campbell",
	  "desc": "it's bread club"
	},
	{
	  "name": "c/o 2025",
	  "day": "Friday",
	  "time": "8:15 a.m.",
	  "location": "442",
	  "advisor": "Eisenbrey",
	  "instagram": "lincolnseattle2025"
	},
	{
	  "name": "c/o 2026",
	  "day": "Alt Fridays",
	  "time": "Lunch",
	  "location": "332",
	  "advisor": "Cassidy",
	  "instagram": "lincolnhs2026"
	},
	{
	  "name": "c/o 2027",
	  "day": "2nd Monday",
	  "time": "Lunch",
	  "location": "437",
	  "advisor": "",
	  "instagram": "lincolnclassof27"
	},
	{
	  "name": "Career Exploration",
	  "day": "Tuesdays",
	  "time": "Lunch",
	  "location": "Mr. Barnes's room",
	  "advisor": "Mr Barnes",
	  "desc": "Female Finance teaches girls at our school how to manage and think of their finances so that they are empowered when it comes to their daily lives as they head into their future. Meet guest speakers, contribute to an investment portfolio, and gain financial knowledge!"
	},
	{
	  "name": "Chainlynx Robotics",
	  "day": "",
	  "time": "",
	  "location": "167",
	  "advisor": "Mr. Myers",
	  "desc": "ChainLynx is Lincoln's robotics team, with no experience required! We do 3D modeling, programming, building robots, managing finances, and work with social media. We meet Tuesdays and Thursdays at 3:40 in room 167."
	},
	{
	  "name": "Chainlynx Robotics",
	  "day": "Monday (6-7:30), Tuesday (3:45-5:30), Thursday (3:45-5:30)",
	  "time": "",
	  "location": "167",
	  "advisor": "Mr. Myers",
	  "desc": "ChainLynx Robotics is Lincoln's FRC team! No experience required to join! We do 3D modeling, programming, building robots, strategic planning, managing finances, and working with social media. We meet Mondays, Tuesdays, and Thursdays in room 167. (6pm Mondays, 3:40 Tuesdays and Thursdays)"
	},
	{
	  "name": "Charcuterie Club",
	  "day": "tuesday",
	  "time": "Lunch",
	  "location": "232",
	  "advisor": "Profe Martin",
	  "desc": "Charcuterie Club hangs out in room 232 on alternating tuesdays. We mostly just eat lunch, bring food to share, and talk with eachother."
	},
	{
	  "name": "Chess Club",
	  "day": "",
	  "time": "",
	  "location": "205",
	  "advisor": "Mr. Snyder",
	  "desc": "Chess club meets up to play chess, and you can also opt in to compete once per year in the SPS chess tournament. All levels of players are welcome!"
	},
	{
	  "name": "Chess Club",
	  "day": "Wednesday's at lunch",
	  "time": "",
	  "location": "205",
	  "advisor": "Snyder",
	  "desc": "Chess club meets every Wednesday at lunch.  We play matches and hang out to music and food.  Come and join us any time, we welcome any new members."
	},
	{
	  "name": "Chinese Club",
	  "day": "Thursdays",
	  "time": "Lunch",
	  "location": "Room 352",
	  "advisor": "Mr. Nimni",
	  "instagram": "lhschinese_club",
	  "desc": "Chinese Club is a club for anyone interested in Chinese culture or history! We meet every Thursday to eat snacks, play games and learn more about Chinese culture. Everyone is welcome!"
	},
	{
	  "name": "Climbing Club",
	  "day": "",
	  "time": "",
	  "location": "432",
	  "advisor": "Mr. Fox",
	  "desc": "Climbing club is an environment for climbers of all skill levels to meet and talk. We help connect the climbing community of LHS and can provide day passes for those getting into the sport!"
	},
	{
	  "name": "Color Guard",
	  "day": "Tuesday",
	  "time": "Lunch",
	  "location": "multipurpose room",
	  "advisor": "mr macintyre",
	  "instagram": "lincoln_color_guard",
	  "desc": "Color Guard Club is a vibrant community where members come together to explore the artistry of flag spinning and dance. Engage in creative routines, develop precision in performances, and foster teamwork while showcasing the visual appeal of color guard and Lincoln pride. Join us to enhance your skills, express creativity, and be part of dynamic performances throughout the year!"
	},
	{
	  "name": "Craft Club",
	  "day": "Thursday Lunch",
	  "time": "",
	  "location": "441- Ms Richards",
	  "advisor": "Richards",
	  "desc": "Craft Club is for students who enjoy fun weekly crafts and want to make a change in the community! We do crafts that benefit the community like origami for hospitals and cards for veterans!"
	},
	{
	  "name": "Cultural Education Comittee",
	  "day": "Tuesday",
	  "time": "Lunch",
	  "location": "11",
	  "advisor": "",
	  "desc": "Cultural Education Committee is for students passionate about sharing diverse cultures! We visit local elementary schools to teach kids about traditions, customs, and languages from around the world through fun, interactive activities. Join us to inspire young minds and celebrate cultural diversity"
	},
	{
	  "name": "Dance Team",
	  "day": "",
	  "time": "",
	  "location": "Multipurpose room",
	  "advisor": "Ms Wyn",
	  "desc": "Dance Team is open to anyone no matter the skill level, who loves to dance! We perform in assemblies, games, and showcases and have a lot of fun!"
	},
	{
	  "name": "Dance Team",
	  "day": "Mondays (3:45-4:45), Wednesdays (2:30-3:30)",
	  "time": "",
	  "location": "Multipurpose room",
	  "advisor": "Ms. Wyn",
	  "desc": "Lincoln Dance Team is an all gender hip hop based team that preforms at assembly's, football games, and showcases. We are open to all levels of dance experience and meet twice a week for practice."
	},
	{
	  "name": "Debate",
	  "day": "Tuesdays",
	  "time": "Lunch",
	  "location": "133",
	  "advisor": "Ms. So",
	  "instagram": "lincolndebateclub",
	  "desc": "Debate Club is open to debaters of all skill level! We learn how to debate and work on public speaking, which we use at district-wide competitions!!"
	},
	{
	  "name": "DECA",
	  "day": "",
	  "time": "",
	  "location": "271",
	  "advisor": "Curtis Reed",
	  "desc": "DECA is  a student-led organization that helps prepare students for college and careers in business. We meet every Friday in room 271, and we attend district, state, and national competitions against other schools."
	},
	{
	  "name": "Diabetes Student Union",
	  "day": "Tuesday during lunch",
	  "time": "",
	  "location": "364",
	  "advisor": "No - we need help finding an advisor",
	  "desc": "diabetes student union for those who would like to be surrounded by other diabetics that may be going through the same thing. we talk about all sorts of different things on and off the subject of diabetes, as well as meet once a week during lunch !!!"
	},
	{
	  "name": "Disabled Student Union",
	  "day": "Tuesday",
	  "time": "",
	  "location": "room 111",
	  "advisor": "mrs hoban",
	  "desc": "do you have a disability of some sort come join the DSU and meet all new friends we stand to show that all people with disabilities should not be treated differently because of our disability's  everyone's welcome"
	},
	{
	  "name": "Drama Club",
	  "day": "Wednesday",
	  "time": "Lunch",
	  "location": "c111",
	  "advisor": "Sullivan",
	  "instagram": "lynxtheatrearts",
	  "desc": "Drama Club is a club celebrating the love of theatre! We play games, learn about historic theatre people and events, and go see shows together! We are partners with our Thespian Troupe, a more career-focused theatre club. All are welcome at both! We meet Wednesdays at lunch."
	},
	{
	  "name": "DSU",
	  "day": "Tuesdays",
	  "time": "Lunch",
	  "location": "111",
	  "advisor": "Ms. Hoban",
	  "instagram": "Lincoln",
	  "desc": "DSU meets in room 111 during lunch on Tuesdays we meet up and talk about disabilities and more and all are welcome to come to our meeting no matter what."
	},
	{
	  "name": "Economics Club",
	  "day": "Monday",
	  "time": "Lunch",
	  "location": "246",
	  "advisor": "Mr. Reed",
	  "instagram": "lincolninvestingclub",
	  "desc": "Investing club competes in economics competitions, deca events and teach lessons on finance with guest speakers! Whether your a beginner or have experience, this club is your chance to grow your investing knowledge."
	},
	{
	  "name": "Environmental Club",
	  "day": "mondays",
	  "time": "Lunch",
	  "location": "161",
	  "advisor": "Ms Fox",
	  "instagram": "lincoln_environmentalclub",
	  "desc": "Environmental Club is for everyone who loves the environment! We aim to create a more sustainable high school through fun and engaging activities about the environment."
	},
	{
	  "name": "Ethics Bowl",
	  "day": "wed, 8:00am",
	  "time": "",
	  "location": "351",
	  "advisor": "Mr. D'Amico",
	  "desc": "Ethics Bowl meets once a week- Wednesdays at 8:00am in room 351- to prepare for the *optional* ethics bowl competition ??!!   During the meetings we go over an ethical prompt/dilemma ? and work collaboratively as a group to come up with as many perspectives as possible, along with some central questions. We will also bring snacks ?? and treats ?? to share for some meetings!!  \n\nNo experience is needed, and new members are always welcome!!! If you have any questions, feel free to email 1smleblang@seattleschools.org or 1maminer@seattleschools.org . \n\nMake sure to follow our Instagram @lhs.ethicsbowl ! ????"
	},
	{
	  "name": "Ethnic Food Club",
	  "day": "Every Other Friday (1st and 3rd)",
	  "time": "",
	  "location": "",
	  "advisor": "Ms. Montgomery"
	},
	{
	  "name": "Fabrication club",
	  "day": "Monday",
	  "time": "3:45-4:45",
	  "location": "fab lab",
	  "advisor": "Mr. Myers",
	  "desc": "Fabrication Club is allowing all students of LHS access to the Fab Lab and tools inside. We meet on Mondays after school, during BASH. We also tutor for HCD classes if you need help with any of the projects. The students of Fabrication Club can help you convert your projects into actionable plans and items to manufacture."
	},
	{
	  "name": "Femensim Club",
	  "day": "Every other Tuesday",
	  "time": "Lunch",
	  "location": "161",
	  "advisor": "Jen Fox",
	  "desc": "Feminism club is a club for people to learn about and collaborate on issues around feminism affecting society and us right, and to be a welcoming space for female-identifying students or anyone that cares about feminism!"
	},
	{
	  "name": "Film Club",
	  "day": "Thursdays at lunch",
	  "time": "",
	  "location": "206",
	  "advisor": "Mr. Bubb",
	  "desc": "Film Club is for students interested in film production and movies! We make videos for the community, learn new film skills, and compete at SkillsUSA."
	},
	{
	  "name": "Fishing Club",
	  "day": "",
	  "time": "",
	  "location": "Room 235",
	  "advisor": "Mr. Barnes",
	  "instagram": "lincolnfishingclub",
	  "desc": "The fishing club meets every Wednesday in room 235. During meetings we hangout and learn new techniques of fishing! Over the weekends, we explore local bodies of water such as Green Lake, Lake Washington and the Puget Sound. In the future, our goal is to get as many people as we can to enjoy fishing as much as we do."
	},
	{
	  "name": "French Club",
	  "day": "Tuesday Lunch",
	  "time": "",
	  "location": "362",
	  "advisor": "Madame Crane",
	  "desc": "French Club meets to talk in French and learn about French culture. Everyone is welcome, ANY level of French."
	},
	{
	  "name": "Genome Science Club",
	  "day": "Thursdays",
	  "time": "Lunch",
	  "location": "263",
	  "advisor": "Doc Vermaak",
	  "desc": "Genome Science Club is for any student with a passion for genetics. Key highlights of our club include research, field trips, and book clubs!"
	},
	{
	  "name": "German Culture Appreciation Club",
	  "day": "Thursdays",
	  "time": "Lunch",
	  "location": "232",
	  "advisor": "Profe Martin"
	},
	{
	  "name": "Golf Club",
	  "day": "Tuesday at lunch",
	  "time": "",
	  "location": "Mrs. Hashemi",
	  "advisor": "Ms Hashemi",
	  "desc": "Lincoln golf club is a great opportunity for golfers of all skills. At our meetings, we focus on learning the basics of golf and the history of the sport. Additionally, every year we host a variety of tournaments at local golf courses."
	},
	{
	  "name": "Honk Band",
	  "day": "Tuesdays after school, about 3:50 to 4:50",
	  "time": "",
	  "location": "C102 (or C104 in case of room conflicts)",
	  "advisor": "Kathryn Cassidy",
	  "desc": "HONK! Band plays music inspired by jazz, pop, and brass bands. Anyone is welcome, regardless of instrument or playing level; our goal is to bring the joy of music to everyone!"
	},
	{
	  "name": "HOSA",
	  "day": "Wednesday",
	  "time": "Lunch",
	  "location": "231",
	  "advisor": "",
	  "desc": "Minal Gowda and An-Li (Presidents), Natalia Fortuna (Vice President), Clementine Davis-Hall (Secretery), Lulu Scalzo Zakharenko (Social Media Manager)"
	},
	{
	  "name": "House Reps",
	  "day": "Alt Wednesday",
	  "time": "",
	  "location": "6",
	  "advisor": "Goehring"
	},
	{
	  "name": "Japanese Conversation Club",
	  "day": "Tuesdays",
	  "time": "Lunch",
	  "location": "261",
	  "advisor": "Sugihara Sensei",
	  "instagram": "lhs.japanese."
	},
	{
	  "name": "JSU",
	  "day": "Mondays during lunch",
	  "time": "",
	  "location": "365 I think (Mr. Nimnis room)",
	  "advisor": "Mr. Nimni",
	  "desc": "JSU (Jewish Student Union) is a place where Jewish kids from all backgrounds can come together and bond on our culture and traditions. There will be food (most of the time) and fun activities and events!"
	},
	{
	  "name": "Junior State of America",
	  "day": "tuesdays at lunch",
	  "time": "",
	  "location": "368",
	  "advisor": "ms chapman",
	  "desc": "political science club is to learn about politics and organize community service projects"
	},
	{
	  "name": "K-Dance Club",
	  "day": "Mondays and Thursdays during lunch",
	  "time": "",
	  "location": "Multipurpose room",
	  "advisor": "Ms. Choi",
	  "desc": "Lincoln K-dance club is club centered around K-pop dance choreography! We learn dances together, film dance covers, and perform a couple times each year! We meet twice a week in school, and occasionally meet outside of school as well."
	},
	{
	  "name": "Keystone Club",
	  "day": "Every Other Tuesday",
	  "time": "Lunch",
	  "location": "352",
	  "advisor": "Montgomerey",
	  "instagram": "lhs_keystone",
	  "desc": "Keystone Club helps connect Lincoln students to local community service and volunteer opportunities. Everyone is welcome; come get your hours!"
	},
	{
	  "name": "Leukemia and Lymphoma Society",
	  "day": "Monday",
	  "time": "Lunch",
	  "location": "445",
	  "advisor": "Mr. Noyes",
	  "instagram": "lincoln_lls",
	  "desc": "Leukemia and Lymphoma Society Club supports the funding of treatments, research, and advocacy for blood cancer patients. We do this through student led fundraising. It is an opportunity to further students’ leadership and outreach skills, while also helping blood cancer patients."
	},
	{
	  "name": "LHOG (Lincoln Hiking outdoors group)",
	  "day": "Tuesdays",
	  "time": "Lunch",
	  "location": "441",
	  "advisor": "Michener"
	},
	{
	  "name": "LHS Consent Coalition",
	  "day": "",
	  "time": "",
	  "location": "",
	  "advisor": "Flavors",
	  "instagram": "lhs.consent.coalition"
	},
	{
	  "name": "LHS for Climate Justice",
	  "day": "Thursdays",
	  "time": "Lunch",
	  "location": "351",
	  "advisor": "D'Amico/Michie",
	  "desc": "At LHS 4 Climate Justice, we focus on an intersectional approach to making climate justice-related legislation at the city and statewide level accessible to LHS students."
	},
	{
	  "name": "Lincoln Go Club",
	  "day": "Thursdays",
	  "time": "Lunch",
	  "location": "106",
	  "advisor": "Mr. BR and Ms. Kohno",
	  "desc": "Lincoln Go Club is a club for all who are interested in learning and playing the four-thousand year old board game of Go! If you are even remotely curious, show up to a meeting on a Thursday lunch and check it out with no commitment."
	},
	{
	  "name": "LSU",
	  "day": "wednesday during lunch",
	  "time": "",
	  "location": "334",
	  "advisor": "Mr. Rivas",
	  "desc": "LSU Is a space where all students of Hispanic or Latin decent can thrive and hangout"
	},
	{
	  "name": "Magic: the gathering club",
	  "day": "friday",
	  "time": "Lunch",
	  "location": "167",
	  "advisor": "Mr. Myers"
	},
	{
	  "name": "Math Club",
	  "day": "Mondays,  Fridays",
	  "time": "Mondays at lunch and fridays after school",
	  "location": "8",
	  "advisor": "Somayeh Hashemi",
	  "instagram": "lincolnmathgroup",
	  "desc": "Math Club competes in a variety of nationally recognized competitions, organizes math competitions and tutoring events for elementary schoolers, hosts professor guest lecturers, and teaches all members new math concepts in an interactive environment!"
	},
	{
	  "name": "Microbiology Club",
	  "day": "Wednesday",
	  "time": "Lunch",
	  "location": "441",
	  "advisor": "Ms. Michener"
	},
	{
	  "name": "Mock Trial",
	  "day": "Mondays",
	  "time": "after school",
	  "location": "432",
	  "advisor": "Mr. Fox",
	  "desc": "Mock Trial club meets with real lawyers every week to prepare for our district wide competition each year!"
	},
	{
	  "name": "Model UN",
	  "day": "Tuesday during lunch and sometimes Thursday after school",
	  "time": "",
	  "location": "rm 445",
	  "advisor": "Daniel Noyes",
	  "desc": "Model UN is a community and collaboration oriented club that is a mock simulation of the United Nations. Our club promotes learning public speaking and debate skills, learning more about the world, and learning how to do research!"
	},
	{
	  "name": "Music Appreciation Club",
	  "day": "Wednesday 11:55 - 12:25 (Lunch)",
	  "time": "",
	  "location": "345",
	  "advisor": "Mr. Campbell",
	  "desc": "Music Appreciation club is for any LHS student looking to expand or improve their music taste. We review albums, talk about music listening habits, and share out favorite music creators."
	},
	{
	  "name": "NAMI on campus",
	  "day": "mondays",
	  "time": "Lunch",
	  "location": "243",
	  "advisor": "Mr. Reed"
	},
	{
	  "name": "Philosophy Club",
	  "day": "Mondays",
	  "time": "Lunch",
	  "location": "369",
	  "advisor": "Mr. Erickson",
	  "desc": "in Philosophy Club, we both look at ideas from all around the world and discuss ideas of our own. No prior knowledge needed to join."
	},
	{
	  "name": "Playing Music Club",
	  "day": "Thursdays",
	  "time": "lunch",
	  "location": "C104(orchestra room)",
	  "advisor": "Ms. Greenbaum",
	  "instagram": "lhs.playingmusicclub.",
	  "desc": "Playing Music Club meets to play acoustic song covers and original compositions in the orchestra room at lunch on Thursdays. All skill level and acoustic instruments, including voice, are welcome. Just bring or borrow an instrument from the orchestra room!"
	},
	{
	  "name": "Poetry Club",
	  "day": "Thursdays",
	  "time": "Lunch",
	  "location": "133",
	  "advisor": "",
	  "desc": "Poetry club is for people to come and write, read, and talk about poetry. We meet once a week to learn all we can and participate in some competitions and events to promote or share poetry!"
	},
	{
	  "name": "Poetry Club",
	  "day": "Thursdays at lunch",
	  "time": "lunch",
	  "location": "133",
	  "advisor": "Ms. So",
	  "desc": "Poetry club is for people to come and write, read, and talk about poetry. We meet once a week to learn all we can and participate in some competitions and events to promote or share poetry!"
	},
	{
	  "name": "Potluck Club",
	  "day": "First Monday of the month",
	  "time": "",
	  "location": "451",
	  "advisor": "Ms. O’Hearn",
	  "desc": "Potluck Club meets once a month to share food and have potlucks! You don’t have to bring something every time, but any type of store-bought or homemade food is welcome!"
	},
	{
	  "name": "RC Club of LHS",
	  "day": "Alt Tuesdays",
	  "time": "Lunch",
	  "location": "206",
	  "advisor": "Mr. Bubb",
	  "instagram": "lhsrcclub",
	  "desc": "RC Club meets to explore the rc hobby and learn about course building and competitions"
	},
	{
	  "name": "Red Cross Club",
	  "day": "Wednesday",
	  "time": "Lunch",
	  "location": "233",
	  "advisor": "Hathaway",
	  "instagram": "lincolnredcrossclub",
	  "desc": "Red Cross Club is for students looking to have an impact on their communities through training programs, certifications, and service projects! Work to earn medical licenses and partner with community organizations while having fun and educating others!"
	},
	{
	  "name": "Rocket Club",
	  "day": "Thursdays at 4:00",
	  "time": "",
	  "location": "Mr. Lowes room",
	  "advisor": "Mr Lowe",
	  "desc": "Rocketry/Aerospace club meets to discuss anything that gets off the ground, as well as competing in he American Rocketry Challenge and GAMA, a competition about creating planes."
	},
	{
	  "name": "SAGA",
	  "day": "Thursdays after school",
	  "time": "",
	  "location": "The library",
	  "advisor": "Ms. Scott",
	  "desc": "The Sexuality and Gender Alliance (SAGA) is an affinity group for queer students to find community, learn about queer history, and engage in activism. All are welcome to join!"
	},
	{
	  "name": "Science Fair Club",
	  "day": "Fridays",
	  "time": "Lunch",
	  "location": "8",
	  "advisor": "Somayeh Hashemi Rudmajani",
	  "desc": "We make our own science or engineering projects and present them at the Washington State Science and Engineering Fair with possibilities to win scholarships and monetary prizes."
	},
	{
	  "name": "Science Olympiad",
	  "day": "monday lunches",
	  "time": "",
	  "location": "451 (temporarily)",
	  "advisor": "No - we need help finding an advisor",
	  "desc": "We make our own science or engineering projects and present them at the Washington State Science and Engineering Fair with possibilities to win scholarships and monetary prizes."
	},
	{
	  "name": "Spirit Committee",
	  "day": "Thursday",
	  "time": "Lunch",
	  "location": "353",
	  "advisor": "",
	  "instagram": "lincolnseattle"
	},
	{
	  "name": "Teen Eclipse Fundraising",
	  "day": "Monday",
	  "time": "lunch",
	  "location": "441",
	  "advisor": "Michener",
	  "instagram": "teen.eclipse",
	  "desc": "Teen Eclipse is a fundraising group that raises money for cancer research at Seattle Children's Hospital. Come by our Monday meetings in 441 and get leadership, organization, and volunteer experience in a super fun environment!"
	},
	{
	  "name": "Thespian Troupe",
	  "day": "Wednesday’s at lunch (combined with drama club)",
	  "time": "",
	  "location": "C111",
	  "advisor": "Tara Sullivan",
	  "desc": "Troupe 10127 is for all your career-focused theatre enthusiasm! We meet the first wednesday of every month in the black box at lunch. All are welcome!"
	},
	{
	  "name": "T-Mobile Club",
	  "day": "Tuesday",
	  "time": "Lunch",
	  "location": "433",
	  "advisor": "Ms. Richards",
	  "instagram": "tmobileclub",
	  "desc": "T-Mobile Club is an active community of avid T-Mobile enthusiasts! We get rewards, hear from guest speakers, and all around just appreciate T-Mobile. Everyone is welcome, no matter their cell plan!"
	},
	{
	  "name": "Unconventional Activities Club",
	  "day": "Fridays",
	  "time": "Lunch",
	  "location": "434",
	  "advisor": "noyes",
	  "desc": "Unconventional Activities is a social club for folks looking to play fun card games and have unconventional mini-competitions."
	},
	{
	  "name": "Unified Sports",
	  "day": "Wed",
	  "time": "",
	  "location": "111",
	  "advisor": "Ms guy",
	  "desc": "Unified Club on Wednesdays! Make new friends and make Lincoln a better place!"
	},
	{
	  "name": "UThfrift",
	  "day": "Every other Wednesday at Lunch",
	  "time": "",
	  "location": "Ms. Montgomery/ Mr. Damico (when back from paternity leave)",
	  "advisor": "Montgomery/Damico",
	  "desc": "Lincoln Uthrift has monthly thrift swaps where any student can come to donate, and pick up free clothing! We also hold informational meetings talking about the environmental impacts of clothing consumption."
	},
	{
	  "name": "Voice in Sports Chapter",
	  "day": "1st,3rd,5th Thursday of the month",
	  "time": "Lunch",
	  "location": "235",
	  "advisor": "Mr. Barnes",
	  "instagram": "voiceinsport.lincolnhs",
	  "desc": "Lincoln VIS is an advocacy group and safe space for all female and non-binary athletes at Lincoln! If you are interested in advocating for equity in sports, want to learn more about athlete health, or just need a space to hang out, VIS has a place for you!"
	},
	{
	  "name": "Wheels and Reels Biking",
	  "day": "Thursdays",
	  "time": "lunch",
	  "location": "452",
	  "advisor": "Mr. Laudick",
	  "desc": "Wheels and Reels is here to encourage students of all abilities to come together through biking and nature appreciation through weekly meetings inside and outside of school"
	},
	{
	  "name": "Wiffle Ball Club",
	  "day": "Tuesdays",
	  "time": "lunch",
	  "location": "452",
	  "advisor": "Michael Laudick",
	  "desc": "Wiffleball Club is a club involving anyone who wants to join that is interested in wiffleball! We have an active league of many teams, and a draft at the beginning of the year."
	},
	{
	  "name": "Women in STEM",
	  "day": "Friday",
	  "time": "lunch",
	  "location": "007",
	  "advisor": "Ms. Villa Cedillo",
	  "desc": "Women in STEM is a place where students can come to get help from upperclassmen with STEM classes, learn about college or job applications through guest speakers, and most importantly - addressing and spreading knowledge about the gender disparity that is so prevalent in STEM education/careers."
	},
	{
	  "name": "Writing Club",
	  "day": "Wednesday",
	  "time": "Lunch",
	  "location": "363",
	  "advisor": "Ms. Campbell",
	  "desc": "Writing Club meets Wednesdays at lunch in room 363! Join us for writing games, projects, novel writing, and more!"
	},
	{
	  "name": "Yarn Club",
	  "day": "Tuesdays and Mondays",
	  "time": "Lunch",
	  "location": "263",
	  "advisor": "Doctor Vermaak",
	  "desc": "Yarn club is a chill space for anybody who currently does or is interested in knitting, crocheting, or any other yarn craft to meet and create together!"
	},
	{
	  "name": "Youth Economics Initiative",
	  "day": "Wednesdays",
	  "time": "Lunch",
	  "location": "452",
	  "advisor": "Mr. Laudick",
	  "instagram": "lincoln.yei",
	  "desc": "Lincoln’s Youth Economics Initiative Chapter meets in room 452 on Wednesdays to learn about the study of economics using materials and curriculum from the Youth Economics Initiative (YEI), an international organization that hosts competitions such as EconBowl! If you want to learn about careers in economics, participate in virtually-held, international competitions, and meet a community of passionate students, show up to a meeting! Follow us on Instagram @lincoln.yei and we can’t wait to see you there!"
	}
]

export default {clubs: clubs} as ClubPageData;