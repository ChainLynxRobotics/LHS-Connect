import type { ClubPageData } from "$lib/types/ClubPageData";

const clubs = [
    {
      "id": "756731f700efdb1b415ca125",
      "name": "ASB",
      "day": "Tuesday",
      "time": "Morning",
      "location": "231",
      "advisor": "Goehring",
      "instagram": "lincolnseattle",
      "desc": "N/A"
    },
    {
      "id": "1b7f7a4a36ec9c26c708d115",
      "name": "c/o 2025",
      "day": "Friday",
      "time": "8:15 a.m.",
      "location": "442",
      "advisor": "Eisenbrey",
      "instagram": "lincolnseattle2025"
    },
    {
      "id": "3a684fd41b5f5aed364d7c5b",
      "name": "c/o 2026",
      "day": "Alt Fridays",
      "time": "Lunch",
      "location": "332",
      "advisor": "Cassidy",
      "instagram": "lincolnhs2026"
    },
    {
      "id": "77a4e296aaffb1afbfff7d2b",
      "name": "c/o 2027",
      "day": "2nd Monday",
      "time": "Lunch",
      "location": "437",
      "advisor": "",
      "instagram": "lincolnclassof27"
    },
    {
      "id": "bccca87f1e5cd63a9bb50724",
      "name": "House Reps",
      "day": "alt Wednesday",
      "time": "Lunch",
      "location": "6",
      "advisor": "Goehring"
    },
    {
      "id": "359ec1507950eb7664b49ce1",
      "name": "Spirit Committee",
      "day": "Thursday",
      "time": "Lunch",
      "location": "353",
      "advisor": "",
      "instagram": "lincolnseattle"
    },
    {
      "id": "bf42ce9412964edb9c299614",
      "name": "LHS Consent Coalition",
      "day": "",
      "time": "",
      "location": "",
      "advisor": "Flavors",
      "instagram": "lhs.consent.coalition"
    },
    {
      "id": "3a3bed9c79d315544d13eeac",
      "name": "Art Club",
      "day": "Thursdays",
      "time": "Lunch",
      "location": "134",
      "advisor": "Ms. Baker",
      "instagram": "lhs__art.club",
      "desc": "Art Club meets Thursdays during lunch each week! We love art, from a wide variety of projects (like group posters, individual projects, etc. ), to talking about it, to just hanging out and having lunch. You do not need any materials or skill level to join, were just here to have fun!"
    },
    {
      "id": "67246ce814b34a53e4234443",
      "name": "Animal Welfare Club",
      "day": "Tuesdays",
      "time": "Lunch",
      "location": "363",
      "advisor": "Ms. Cambell",
      "desc": "Animal Welfare Club is open to any students that are interested in working to protect animals and learn more about animal welfare! We meet the first Tuesday of every month, and have many volunteer opportunities and fun field trips."
    },
    {
      "id": "055d808c46329dbfbf9a6b15",
      "name": "Astronomy Club",
      "day": "Monday",
      "time": "Lunch",
      "location": "442",
      "advisor": "Mr. Garcia",
      "desc": "Astronomy club has presentations on space, physics, and of course astronomy. We are currently working on restoring the schools telescopes!"
    },
    {
      "id": "90cb8290c7125ac84daabccf",
      "name": "ASU",
      "day": "Wednesday",
      "time": "Lunch",
      "location": "Spin room",
      "advisor": "Ms. Tsujimoto and Mr. Lim",
      "instagram": "lincoln.asu",
      "desc": "Lincoln's ASU is dedicated to creating a familiar, welcoming space for all Asian students! We host movie nights, fundraise snack boxes, and aim to share our diverse, expansive culture with our Lincoln community. We're excited to meet you!"
    },
    {
      "id": "ad264a02d1d1aab08386b850",
      "name": "Baking Club",
      "day": "Mondays at lunch",
      "time": "",
      "location": "235",
      "advisor": "Mr barnes/Ms ware",
      "desc": "Baking club is open to anyone who loves to bake, and eat home baked goods! We decide on a theme every week and bring baked goods we made over the weekend to make Monday mornings a little better"
    },
    {
      "id": "8ca4eea8d02bb8723b13bc9c",
      "name": "Botany Club",
      "day": "",
      "time": "",
      "location": "341",
      "advisor": "Ms. Drouin",
      "desc": "Botany Club meets up at lunch to discuss and grow plants, and to do plant-related activities. All levels of interest welcome!"
    },
    {
      "id": "410ada2853375d9aec8f9e7a",
      "name": "Boys' Volleyball Club",
      "day": "Wednesdays and Fridays",
      "time": "7:45 AM",
      "location": "Gym",
      "advisor": "Mr. Sauvage and Mr. Barnes",
      "instagram": "lhs.boys.volleyball",
      "desc": "Boys' volleyball club is open to boys of all experience levels at Lincoln who are interested in volleyball. Bring your school and team spirit, and join us at our practices! We play scrimmages and games against Lincoln's girls' volleyball team and against other schools' clubs. Come try it and see if it's for you!"
    },
    {
      "id": "46210e80686a0d5c39d7925e",
      "name": "Bread Club",
      "day": "Mondays",
      "time": "",
      "location": "363",
      "advisor": "Campbell",
      "desc": "it's bread club"
    },
    {
      "id": "dec6651911e7d29440651bdb",
      "name": "Career Exploration",
      "day": "Tuesdays",
      "time": "Lunch",
      "location": "Mr. Barnes's room",
      "advisor": "Mr Barnes",
      "desc": "Female Finance teaches girls at our school how to manage and think of their finances so that they are empowered when it comes to their daily lives as they head into their future. Meet guest speakers, contribute to an investment portfolio, and gain financial knowledge!"
    },
    {
      "id": "f1774fd61be099f6d853b7e5",
      "name": "Chainlynx Robotics",
      "day": "",
      "time": "",
      "location": "167",
      "advisor": "Mr. Myers",
      "desc": "ChainLynx is Lincoln's robotics team, with no experience required! We do 3D modeling, programming, building robots, managing finances, and work with social media. We meet Tuesdays and Thursdays at 3:40 in room 167."
    },
    {
      "id": "9522b0baeade214cd409ead0",
      "name": "Chainlynx Robotics",
      "day": "Monday (6-7:30), Tuesday (3:45-5:30), Thursday (3:45-5:30)",
      "time": "",
      "location": "167",
      "advisor": "Mr. Myers",
      "desc": "ChainLynx Robotics is Lincoln's FRC team! No experience required to join! We do 3D modeling, programming, building robots, strategic planning, managing finances, and working with social media. We meet Mondays, Tuesdays, and Thursdays in room 167. (6pm Mondays, 3:40 Tuesdays and Thursdays)"
    },
    {
      "id": "01de254b8acf8ff5ebeee31c",
      "name": "Charcuterie Club",
      "day": "tuesday",
      "time": "Lunch",
      "location": "232",
      "advisor": "Profe Martin",
      "desc": "Charcuterie Club hangs out in room 232 on alternating tuesdays. We mostly just eat lunch, bring food to share, and talk with eachother."
    },
    {
      "id": "a1692563ab8cbd0b659c34aa",
      "name": "Chess Club",
      "day": "Wednesday's at lunch",
      "time": "",
      "location": "205",
      "advisor": "Snyder",
      "desc": "Chess club meets every Wednesday at lunch.  We play matches and hang out to music and food.  Come and join us any time, we welcome any new members."
    },
    {
      "id": "2ad2725f051b5af715d608d8",
      "name": "Chinese Club",
      "day": "Thursdays",
      "time": "Lunch",
      "location": "Room 352",
      "advisor": "Mr. Nimni",
      "instagram": "lhschinese_club",
      "desc": "Chinese Club is a club for anyone interested in Chinese culture or history! We meet every Thursday to eat snacks, play games and learn more about Chinese culture. Everyone is welcome!"
    },
    {
      "id": "d332dd7a982904a7a2ff3476",
      "name": "Calisthenics Club",
      "day": "fridays",
      "time": "Lunch",
      "location": "gym",
      "advisor": "Savauge"
    },
    {
      "id": "a879182df3ab180335e8f0fe",
      "name": "Climbing Club",
      "day": "",
      "time": "",
      "location": "432",
      "advisor": "Mr. Fox",
      "desc": "Climbing club is an environment for climbers of all skill levels to meet and talk. We help connect the climbing community of LHS and can provide day passes for those getting into the sport!"
    },
    {
      "id": "f63e46e146d8b5687593bcaf",
      "name": "Color Guard",
      "day": "Tuesday",
      "time": "Lunch",
      "location": "multipurpose room",
      "advisor": "mr macintyre",
      "instagram": "lincoln_color_guard",
      "desc": "Color Guard Club is a vibrant community where members come together to explore the artistry of flag spinning and dance. Engage in creative routines, develop precision in performances, and foster teamwork while showcasing the visual appeal of color guard and Lincoln pride. Join us to enhance your skills, express creativity, and be part of dynamic performances throughout the year!"
    },
    {
      "id": "67c7b3bf20411dd2326b4c88",
      "name": "Craft Club",
      "day": "Thursday Lunch",
      "time": "",
      "location": "441- Ms Richards",
      "advisor": "Richards",
      "desc": "Craft Club is for students who enjoy fun weekly crafts and want to make a change in the community! We do crafts that benefit the community like origami for hospitals and cards for veterans!"
    },
    {
      "id": "fc6d30aa985b8310beecf59b",
      "name": "Cultural Education Comittee",
      "day": "Tuesday",
      "time": "Lunch",
      "location": "11",
      "advisor": "",
      "desc": "Cultural Education Committee is for students passionate about sharing diverse cultures! We visit local elementary schools to teach kids about traditions, customs, and languages from around the world through fun, interactive activities. Join us to inspire young minds and celebrate cultural diversity"
    },
    {
      "id": "b8976a4ca83ff501c635f257",
      "name": "Dance Team",
      "day": "",
      "time": "",
      "location": "Multipurpose room",
      "advisor": "Ms Wyn",
      "desc": "Dance Team is open to anyone no matter the skill level, who loves to dance! We perform in assemblies, games, and showcases and have a lot of fun!"
    },
    {
      "id": "0b3e27b58b4d8442ce3d55d0",
      "name": "Dance Team",
      "day": "Mondays (3:45-4:45), Wednesdays (2:30-3:30)",
      "time": "",
      "location": "Multipurpose room",
      "advisor": "Ms. Wyn",
      "desc": "Lincoln Dance Team is an all gender hip hop based team that preforms at assembly's, football games, and showcases. We are open to all levels of dance experience and meet twice a week for practice."
    },
    {
      "id": "d2783dd123fd7550cd760e7d",
      "name": "Debate",
      "day": "Tuesdays",
      "time": "Lunch",
      "location": "133",
      "advisor": "Ms. So",
      "instagram": "lincolndebateclub",
      "desc": "Debate Club is open to debaters of all skill level! We learn how to debate and work on public speaking, which we use at district-wide competitions!!"
    },
    {
      "id": "27dba93e4e276238ab795f9a",
      "name": "DECA",
      "day": "",
      "time": "",
      "location": "271",
      "advisor": "Curtis Reed",
      "desc": "DECA is  a student-led organization that helps prepare students for college and careers in business. We meet every Friday in room 271, and we attend district, state, and national competitions against other schools."
    },
    {
      "id": "469d6d45d70b59efb2d2f5b7",
      "name": "Diabetes Student Union",
      "day": "Tuesday during lunch",
      "time": "",
      "location": "364",
      "advisor": "No - we need help finding an advisor",
      "desc": "diabetes student union for those who would like to be surrounded by other diabetics that may be going through the same thing. we talk about all sorts of different things on and off the subject of diabetes, as well as meet once a week during lunch !!!"
    },
    {
      "id": "861edcd3a2489a2ad441a09a",
      "name": "Dungenous and Dragons Club",
      "day": "Monday",
      "time": "3:40-5:30",
      "location": "369",
      "advisor": ""
    },
    {
      "id": "6216e76898ae1f480a40d66e",
      "name": "Disabled Student Union",
      "day": "Tuesday",
      "time": "",
      "location": "room 111",
      "advisor": "mrs hoban",
      "desc": "do you have a disability of some sort come join the DSU and meet all new friends we stand to show that all people with disabilities should not be treated differently because of our disability's  everyone's welcome"
    },
    {
      "id": "5cc9dba72886231b70e89d6b",
      "name": "Drama Club",
      "day": "Wednesday",
      "time": "Lunch",
      "location": "c111",
      "advisor": "Sullivan",
      "instagram": "lynxtheatrearts",
      "desc": "Drama Club is a club celebrating the love of theatre! We play games, learn about historic theatre people and events, and go see shows together! We are partners with our Thespian Troupe, a more career-focused theatre club. All are welcome at both! We meet Wednesdays at lunch."
    },
    {
      "id": "6c081383e767b35ea39e8afb",
      "name": "DSU",
      "day": "Tuesdays",
      "time": "Lunch",
      "location": "111",
      "advisor": "Ms. Hoban",
      "instagram": "Lincoln",
      "desc": "DSU meets in room 111 during lunch on Tuesdays we meet up and talk about disabilities and more and all are welcome to come to our meeting no matter what."
    },
    {
      "id": "22d5541f364d64aa7ef0b631",
      "name": "Economics Club",
      "day": "Monday",
      "time": "Lunch",
      "location": "246",
      "advisor": "Mr. Reed",
      "instagram": "lincolninvestingclub",
      "desc": "Investing club competes in economics competitions, deca events and teach lessons on finance with guest speakers! Whether your a beginner or have experience, this club is your chance to grow your investing knowledge."
    },
    {
      "id": "a9f6573ea5a906c4c727244e",
      "name": "Environmental Club",
      "day": "mondays",
      "time": "Lunch",
      "location": "161",
      "advisor": "Ms Fox",
      "instagram": "lincoln_environmentalclub",
      "desc": "Environmental Club is for everyone who loves the environment! We aim to create a more sustainable high school through fun and engaging activities about the environment."
    },
    {
      "id": "adefd0d23275dffdc610e3da",
      "name": "Ethics Bowl",
      "day": "wed, 8:00am",
      "time": "",
      "location": "351",
      "advisor": "Mr. D'Amico",
      "desc": "Ethics Bowl meets once a week- Wednesdays at 8:00am in room 351- to prepare for the *optional* ethics bowl competition ??!!   During the meetings we go over an ethical prompt/dilemma ? and work collaboratively as a group to come up with as many perspectives as possible, along with some central questions. We will also bring snacks ?? and treats ?? to share for some meetings!!  \n\nNo experience is needed, and new members are always welcome!!! If you have any questions, feel free to email 1smleblang@seattleschools.org or 1maminer@seattleschools.org . \n\nMake sure to follow our Instagram @lhs.ethicsbowl ! ????"
    },
    {
      "id": "0233ad2c3afaf17ceffb1211",
      "name": "Ethnic Food Club",
      "day": "Every Other Friday (1st and 3rd)",
      "time": "",
      "location": "",
      "advisor": "Ms. Montgomery"
    },
    {
      "id": "cf399125e9d7b1e1ece62317",
      "name": "Fabrication club",
      "day": "Monday",
      "time": "3:45-4:45",
      "location": "fab lab",
      "advisor": "Mr. Myers",
      "desc": "Fabrication Club is allowing all students of LHS access to the Fab Lab and tools inside. We meet on Mondays after school, during BASH. We also tutor for HCD classes if you need help with any of the projects. The students of Fabrication Club can help you convert your projects into actionable plans and items to manufacture."
    },
    {
      "id": "5b12e12b3b62f3d206d25676",
      "name": "Female Finance Club",
      "day": "every other Tuesday",
      "time": "lunch",
      "location": "Barnes's room",
      "advisor": "Barnes",
      "instagram": "femalefinancelynx",
      "desc": "Female Finance Club meets up every other Tuesday to learn about Finance, talk about investments, meet guest speakers, and become more financially aware! We even hope to fundraise for FWA (Financial Women’s Association)."
    },
    {
      "id": "03e7647569b37a387a68130b",
      "name": "Fashion Club",
      "day": "Wednesday",
      "time": "lunch",
      "location": "",
      "advisor": "Nimni"
    },
    {
      "id": "5f3e6976509d249d312180d3",
      "name": "Femensim Club",
      "day": "Every other Tuesday",
      "time": "Lunch",
      "location": "161",
      "advisor": "Jen Fox",
      "desc": "Feminism club is a club for people to learn about and collaborate on issues around feminism affecting society and us right, and to be a welcoming space for female-identifying students or anyone that cares about feminism!"
    },
    {
      "id": "81b1f43e6faaeadb91dbaff2",
      "name": "Film Club",
      "day": "Thursdays at lunch",
      "time": "",
      "location": "206",
      "advisor": "Mr. Bubb",
      "desc": "Film Club is for students interested in film production and movies! We make videos for the community, learn new film skills, and compete at SkillsUSA."
    },
    {
      "id": "8154e00cc797244a169980a4",
      "name": "Fishing Club",
      "day": "",
      "time": "",
      "location": "Room 235",
      "advisor": "Mr. Barnes",
      "instagram": "lincolnfishingclub",
      "desc": "The fishing club meets every Wednesday in room 235. During meetings we hangout and learn new techniques of fishing! Over the weekends, we explore local bodies of water such as Green Lake, Lake Washington and the Puget Sound. In the future, our goal is to get as many people as we can to enjoy fishing as much as we do."
    },
    {
      "id": "fb30cafbac7fa385f41304dc",
      "name": "French Club",
      "day": "Tuesday Lunch",
      "time": "",
      "location": "362",
      "advisor": "Madame Crane",
      "desc": "French Club meets to talk in French and learn about French culture. Everyone is welcome, ANY level of French."
    },
    {
      "id": "4f5e84490f56f9a09c4098ab",
      "name": "Genome Science Club",
      "day": "Thursdays",
      "time": "Lunch",
      "location": "263",
      "advisor": "Doc Vermaak",
      "desc": "Genome Science Club is for any student with a passion for genetics. Key highlights of our club include research, field trips, and book clubs!"
    },
    {
      "id": "51c8ab982d23633b0f8ac5ff",
      "name": "German Culture Appreciation Club",
      "day": "Thursdays",
      "time": "Lunch",
      "location": "232",
      "advisor": "Profe Martin"
    },
    {
      "id": "82ac8a085867c603fa722275",
      "name": "Golf Club",
      "day": "Tuesday at lunch",
      "time": "",
      "location": "Mrs. Hashemi",
      "advisor": "Ms Hashemi",
      "desc": "Lincoln golf club is a great opportunity for golfers of all skills. At our meetings, we focus on learning the basics of golf and the history of the sport. Additionally, every year we host a variety of tournaments at local golf courses."
    },
    {
      "id": "e703fd2efae54451544155ed",
      "name": "Honk Band",
      "day": "Tuesdays after school, about 3:50 to 4:50",
      "time": "",
      "location": "C102 (or C104 in case of room conflicts)",
      "advisor": "Kathryn Cassidy",
      "desc": "HONK! Band plays music inspired by jazz, pop, and brass bands. Anyone is welcome, regardless of instrument or playing level; our goal is to bring the joy of music to everyone!"
    },
    {
      "id": "39ec84cbd104db0d22bb5a0a",
      "name": "HOSA",
      "day": "Wednesday",
      "time": "Lunch",
      "location": "231",
      "advisor": "",
      "desc": "Minal Gowda and An-Li (Presidents), Natalia Fortuna (Vice President), Clementine Davis-Hall (Secretery), Lulu Scalzo Zakharenko (Social Media Manager)"
    },
    {
      "id": "f8ebdece8ea23360a126e422",
      "name": "IYNA- Neuroscience Club",
      "day": "mondays",
      "time": "lunch",
      "location": "231",
      "advisor": "",
      "desc": "Neuroscience clubs meet to learn about neuroscience with the help of IYNA, an international association for students interested in neuroscience."
    },
    {
      "id": "b73a7257af8627a5a010c9c4",
      "name": "Japanese Conversation Club",
      "day": "Tuesdays",
      "time": "Lunch",
      "location": "261",
      "advisor": "Sugihara Sensei",
      "instagram": "lhs.japanese."
    },
    {
      "id": "75b6d18eeb2d7fa4956c2c07",
      "name": "JSU",
      "day": "Mondays during lunch",
      "time": "",
      "location": "365 I think (Mr. Nimnis room)",
      "advisor": "Mr. Nimni",
      "desc": "JSU (Jewish Student Union) is a place where Jewish kids from all backgrounds can come together and bond on our culture and traditions. There will be food (most of the time) and fun activities and events!"
    },
    {
      "id": "80d17c6808057debd8768bc8",
      "name": "Junior State of America",
      "day": "tuesdays at lunch",
      "time": "",
      "location": "368",
      "advisor": "ms chapman",
      "desc": "political science club is to learn about politics and organize community service projects"
    },
    {
      "id": "d6f5e17de67b8dc0b9d5eae0",
      "name": "K-Dance Club",
      "day": "Mondays and Thursdays during lunch",
      "time": "",
      "location": "Multipurpose room",
      "advisor": "Ms. Choi",
      "desc": "Lincoln K-dance club is club centered around K-pop dance choreography! We learn dances together, film dance covers, and perform a couple times each year! We meet twice a week in school, and occasionally meet outside of school as well."
    },
    {
      "id": "3ce67b3cafc955411c25ac66",
      "name": "Keystone Club",
      "day": "Every Other Tuesday",
      "time": "Lunch",
      "location": "352",
      "advisor": "Montgomerey",
      "instagram": "lhs_keystone",
      "desc": "Keystone Club helps connect Lincoln students to local community service and volunteer opportunities. Everyone is welcome; come get your hours!"
    },
    {
      "id": "f24ab15d3017ad1183f0ce23",
      "name": "Leukemia and Lymphoma Society",
      "day": "Monday",
      "time": "Lunch",
      "location": "445",
      "advisor": "Mr. Noyes",
      "instagram": "lincoln_lls",
      "desc": "Leukemia and Lymphoma Society Club supports the funding of treatments, research, and advocacy for blood cancer patients. We do this through student led fundraising. It is an opportunity to further students’ leadership and outreach skills, while also helping blood cancer patients."
    },
    {
      "id": "42bb3b32c237bd5e772aa8e8",
      "name": "LHOG (Lincoln Hiking outdoors group)",
      "day": "Tuesdays",
      "time": "Lunch",
      "location": "441",
      "advisor": "Michener"
    },
    {
      "id": "25574d247df921375725f8bc",
      "name": "Living Outside",
      "day": "Tuesday",
      "time": "Lunch",
      "location": "337",
      "advisor": "Hawley"
    },
    {
      "id": "cf4c3417ea2add0b1ba965af",
      "name": "LHS for Climate Justice",
      "day": "Thursdays",
      "time": "Lunch",
      "location": "351",
      "advisor": "D'Amico/Michie",
      "desc": "At LHS 4 Climate Justice, we focus on an intersectional approach to making climate justice-related legislation at the city and statewide level accessible to LHS students."
    },
    {
      "id": "03a45a29ac287d674232e1f5",
      "name": "Lynx Badminton Club",
      "day": "fridays (fall and winter) after school spring",
      "time": "",
      "location": "gym",
      "advisor": "sauvage",
      "instagram": "lynxbadminton"
    },
    {
      "id": "8f5f84f47f292965967e0246",
      "name": "Lincoln Go Club",
      "day": "Thursdays",
      "time": "Lunch",
      "location": "106",
      "advisor": "Mr. BR and Ms. Kohno",
      "desc": "Lincoln Go Club is a club for all who are interested in learning and playing the four-thousand year old board game of Go! If you are even remotely curious, show up to a meeting on a Thursday lunch and check it out with no commitment."
    },
    {
      "id": "5de000a1b8300b7116eaf9d2",
      "name": "LSU",
      "day": "wednesday during lunch",
      "time": "",
      "location": "334",
      "advisor": "Mr. Rivas",
      "desc": "LSU Is a space where all students of Hispanic or Latin decent can thrive and hangout"
    },
    {
      "id": "981c14678c0644dab7be81d7",
      "name": "Magic: the gathering club",
      "day": "friday",
      "time": "Lunch",
      "location": "167",
      "advisor": "Mr. Myers"
    },
    {
      "id": "db124647b7160a383773e009",
      "name": "Math Club",
      "day": "Mondays,  Fridays",
      "time": "Mondays at lunch and fridays after school",
      "location": "8",
      "advisor": "Somayeh Hashemi",
      "instagram": "lincolnmathgroup",
      "desc": "Math Club competes in a variety of nationally recognized competitions, organizes math competitions and tutoring events for elementary schoolers, hosts professor guest lecturers, and teaches all members new math concepts in an interactive environment!"
    },
    {
      "id": "99211b515a1e07e849493cc4",
      "name": "Microbiology Club",
      "day": "Wednesday",
      "time": "Lunch",
      "location": "441",
      "advisor": "Ms. Michener",
      "desc": "Microbiology Club is a club that is dedicated to doing simple experiments involving microbes and generally just looking at things under microscopes!"
    },
    {
      "id": "b80084ab64889db532e0235c",
      "name": "Medlife Chapter at Lincoln",
      "day": "1st/3rd Tuesdays of each month during lunch",
      "time": "",
      "location": "235",
      "advisor": "Barnes",
      "desc": "Medlife is a non profit organization that works to improve access to medicine, education, and more in low income communities across the world. As a member of this club, you will be able to get volunteer hours, add to your resume in a meaningful and impactful way, and have opportunities for travel abroad with discounted prices and guaranteed scholarships!"
    },
    {
      "id": "91e1e689f465d43eff9026f7",
      "name": "Mock Trial",
      "day": "Mondays",
      "time": "after school",
      "location": "432",
      "advisor": "Mr. Fox",
      "desc": "Mock Trial club meets with real lawyers every week to prepare for our district wide competition each year!"
    },
    {
      "id": "c71999d1f383de3c0caf2f55",
      "name": "Model UN",
      "day": "Tuesday during lunch and sometimes Thursday after school",
      "time": "",
      "location": "rm 445",
      "advisor": "Daniel Noyes",
      "desc": "Model UN is a community and collaboration oriented club that is a mock simulation of the United Nations. Our club promotes learning public speaking and debate skills, learning more about the world, and learning how to do research!"
    },
    {
      "id": "bc42f8e782d82ceef425b072",
      "name": "Music Appreciation Club",
      "day": "Wednesday 11:55 - 12:25 (Lunch)",
      "time": "",
      "location": "345",
      "advisor": "Mr. Campbell",
      "desc": "Music Appreciation club is for any LHS student looking to expand or improve their music taste. We review albums, talk about music listening habits, and share out favorite music creators."
    },
    {
      "id": "8a3a2419125a4fe4b23fb41c",
      "name": "NAMI on campus",
      "day": "mondays",
      "time": "Lunch",
      "location": "243",
      "advisor": "Mr. Reed"
    },
    {
      "id": "5549facab3e1354c96175211",
      "name": "Origami Club",
      "day": "Wednesday",
      "time": "lunch",
      "location": "108",
      "advisor": "Ms. Choi",
      "desc": "Origami Club is for any students who want to learn the ancient art of paper folding! We will plan to meet every week to learn origami from more experienced students, online tutorials, books, or just to hang out and have fun. All levels of folders are welcome!"
    },
    {
      "id": "b3510099c26462490517d1cf",
      "name": "Philosophy Club",
      "day": "Mondays",
      "time": "Lunch",
      "location": "369",
      "advisor": "Mr. Erickson",
      "desc": "in Philosophy Club, we both look at ideas from all around the world and discuss ideas of our own. No prior knowledge needed to join."
    },
    {
      "id": "7dabf53339d40718786fe8b9",
      "name": "Playing Music Club",
      "day": "Thursdays",
      "time": "lunch",
      "location": "C104(orchestra room)",
      "advisor": "Ms. Greenbaum",
      "instagram": "lhs.playingmusicclub.",
      "desc": "Playing Music Club meets to play acoustic song covers and original compositions in the orchestra room at lunch on Thursdays. All skill level and acoustic instruments, including voice, are welcome. Just bring or borrow an instrument from the orchestra room!"
    },
    {
      "id": "749131579fad5d8d496c1225",
      "name": "Photography Club",
      "day": "Friday",
      "time": "lunch",
      "location": "107",
      "advisor": "Mr. Puri",
      "desc": "Photography Club meets weekly to share photos, learn skills and techniques, and build a community of photographers at Lincoln. Anyone is welcome, regardless of experience or equipment!"
    },
    {
      "id": "110f98972627dca2d4354987",
      "name": "Poetry Club",
      "day": "Thursdays at lunch",
      "time": "lunch",
      "location": "133",
      "advisor": "Ms. So",
      "desc": "Poetry club is for people to come and write, read, and talk about poetry. We meet once a week to learn all we can and participate in some competitions and events to promote or share poetry!"
    },
    {
      "id": "e6785e148cc34eeb791008f2",
      "name": "Potluck Club",
      "day": "First Monday of the month",
      "time": "",
      "location": "451",
      "advisor": "Ms. O’Hearn",
      "desc": "Potluck Club meets once a month to share food and have potlucks! You don’t have to bring something every time, but any type of store-bought or homemade food is welcome!"
    },
    {
      "id": "b573b83fb60a9bc02c974272",
      "name": "RC Club of LHS",
      "day": "Alt Tuesdays",
      "time": "Lunch",
      "location": "206",
      "advisor": "Mr. Bubb",
      "instagram": "lhsrcclub",
      "desc": "RC Club meets to explore the rc hobby and learn about course building and competitions"
    },
    {
      "id": "576bf52d9673ce358358dcd8",
      "name": "Red Cross Club",
      "day": "Wednesday",
      "time": "Lunch",
      "location": "233",
      "advisor": "Hathaway",
      "instagram": "lincolnredcrossclub",
      "desc": "Red Cross Club is for students looking to have an impact on their communities through training programs, certifications, and service projects! Work to earn medical licenses and partner with community organizations while having fun and educating others!"
    },
    {
      "id": "c176353b46c67249b96b0fff",
      "name": "Rocket Club",
      "day": "Thursdays at 4:00",
      "time": "",
      "location": "Mr. Lowes room",
      "advisor": "Mr Lowe",
      "desc": "Rocketry/Aerospace club meets to discuss anything that gets off the ground, as well as competing in he American Rocketry Challenge and GAMA, a competition about creating planes."
    },
    {
      "id": "061dc8429d2f5593546a08f2",
      "name": "SAGA",
      "day": "Thursdays after school",
      "time": "",
      "location": "The library",
      "advisor": "Ms. Scott",
      "desc": "The Sexuality and Gender Alliance (SAGA) is an affinity group for queer students to find community, learn about queer history, and engage in activism. All are welcome to join!"
    },
    {
      "id": "4ce80cbcd0ae5f3d1100cd99",
      "name": "Skate Club",
      "day": "Friday",
      "time": "lunch",
      "location": "108",
      "advisor": "Choi",
      "desc": "Lincoln skate club is not just for skaters its welcome for all people! We meet mostly on Fridays for lunch and everyone is welcome and feel free to bring your friends. We can teach people how to skate as well as help with information on purchasing skate parts and boards."
    },
    {
      "id": "0070622813b30744f8dd4368",
      "name": "Science Fair Club",
      "day": "Fridays",
      "time": "Lunch",
      "location": "8",
      "advisor": "Somayeh Hashemi Rudmajani",
      "desc": "We make our own science or engineering projects and present them at the Washington State Science and Engineering Fair with possibilities to win scholarships and monetary prizes."
    },
    {
      "id": "9dee2cc60503f420a996c786",
      "name": "Science Olympiad",
      "day": "monday lunches",
      "time": "",
      "location": "451 (temporarily)",
      "advisor": "No - we need help finding an advisor",
      "desc": "We make our own science or engineering projects and present them at the Washington State Science and Engineering Fair with possibilities to win scholarships and monetary prizes."
    },
    {
      "id": "3b43bf91197c605d9c897378",
      "name": "Teen Eclipse Fundraising",
      "day": "Monday",
      "time": "lunch",
      "location": "441",
      "advisor": "Michener",
      "instagram": "teen.eclipse",
      "desc": "Teen Eclipse is a fundraising group that raises money for cancer research at Seattle Children's Hospital. Come by our Monday meetings in 441 and get leadership, organization, and volunteer experience in a super fun environment!"
    },
    {
      "id": "7e95ce98e9faf5ae832325bb",
      "name": "Thespian Troupe",
      "day": "Wednesday’s at lunch (combined with drama club)",
      "time": "",
      "location": "C111",
      "advisor": "Tara Sullivan",
      "desc": "Troupe 10127 is for all your career-focused theatre enthusiasm! We meet the first wednesday of every month in the black box at lunch. All are welcome!"
    },
    {
      "id": "ca1ffa586e78016fa3a90dd6",
      "name": "T-Mobile Club",
      "day": "Tuesday",
      "time": "Lunch",
      "location": "433",
      "advisor": "Ms. Richards",
      "instagram": "tmobileclub",
      "desc": "T-Mobile Club is an active community of avid T-Mobile enthusiasts! We get rewards, hear from guest speakers, and all around just appreciate T-Mobile. Everyone is welcome, no matter their cell plan!"
    },
    {
      "id": "17b44543ceab10a376ea52d8",
      "name": "Unconventional Activities Club",
      "day": "Fridays",
      "time": "Lunch",
      "location": "434",
      "advisor": "noyes",
      "desc": "Unconventional Activities is a social club for folks looking to play fun card games and have unconventional mini-competitions."
    },
    {
      "id": "3b3ad462198179fc03a8d8e7",
      "name": "UNICEF",
      "day": "Thursdays",
      "time": "lunch",
      "location": "107",
      "advisor": "",
      "desc": "As a member of UNICEF, you will help our mission to protect children's rights, help children meet their basic needs, and expand their opportunities."
    },
    {
      "id": "2f89e36097052fadb81bea5f",
      "name": "Unified Sports",
      "day": "Wed",
      "time": "",
      "location": "111",
      "advisor": "Ms guy",
      "desc": "Unified Club on Wednesdays! Make new friends and make Lincoln a better place!"
    },
    {
      "id": "c5768d39481334b9368c82ec",
      "name": "UThfrift",
      "day": "Every other Wednesday at Lunch",
      "time": "",
      "location": "Ms. Montgomery/ Mr. Damico (when back from paternity leave)",
      "advisor": "Montgomery/Damico",
      "desc": "Lincoln Uthrift has monthly thrift swaps where any student can come to donate, and pick up free clothing! We also hold informational meetings talking about the environmental impacts of clothing consumption."
    },
    {
      "id": "0c894c0b2f017f9e0e63d751",
      "name": "Voice in Sports Chapter",
      "day": "1st,3rd,5th Thursday of the month",
      "time": "Lunch",
      "location": "235",
      "advisor": "Mr. Barnes",
      "instagram": "voiceinsport.lincolnhs",
      "desc": "Lincoln VIS is an advocacy group and safe space for all female and non-binary athletes at Lincoln! If you are interested in advocating for equity in sports, want to learn more about athlete health, or just need a space to hang out, VIS has a place for you!"
    },
    {
      "id": "4ed2721b872d81e5280ada0c",
      "name": "Water1st Club",
      "day": "Tuesday",
      "time": "lunch",
      "location": "442 (4th floor flex space)",
      "advisor": "Mr. Garcia",
      "desc": "Water1st Club is for students who are passionate about helping people all around the world! We meet once a week to discuss and educate ourselves on the global water issue, and cause change in our community here at Lincoln."
    },
    {
      "id": "3798c92fa28fb79d668b92cd",
      "name": "Wheels and Reels Biking",
      "day": "Thursdays",
      "time": "lunch",
      "location": "452",
      "advisor": "Mr. Laudick",
      "desc": "Wheels and Reels is here to encourage students of all abilities to come together through biking and nature appreciation through weekly meetings inside and outside of school"
    },
    {
      "id": "8d84bd34b95f14b536e41f22",
      "name": "Wiffle Ball Club",
      "day": "Tuesdays",
      "time": "lunch",
      "location": "452",
      "advisor": "Michael Laudick",
      "desc": "Wiffleball Club is a club involving anyone who wants to join that is interested in wiffleball! We have an active league of many teams, and a draft at the beginning of the year."
    },
    {
      "id": "5bd7937b4b14fb57945e2488",
      "name": "WiB",
      "day": "Thursdays",
      "time": "lunch",
      "location": "353",
      "advisor": "Ms. Montgomery",
      "desc": "The Women in Business Club if for students who are interested in learning about business. Club activities include bake sales, guest speakers, field trips, and other business related activities."
    },
    {
      "id": "4df343dcda3c77d25f559d08",
      "name": "WiM (Women in Music)",
      "day": "Friday",
      "time": "lunch",
      "location": "C102",
      "advisor": "Mr. MacIntyre",
      "desc": "WIM is a club that strives to build a community of people that support women in all forms of music and performing arts. We meet once a week to talk about our favorite female artists, jam, and celebrate the amazing and talented women in music."
    },
    {
      "id": "cd8a5284e0bbe529bcfbb99c",
      "name": "Women in STEM",
      "day": "Frid+B95+C96",
      "time": "lunch",
      "location": "007",
      "advisor": "Ms. Villa Cedillo",
      "desc": "Women in STEM is a place where students can come to get help from upperclassmen with STEM classes, learn about college or job applications through guest speakers, and most importantly - addressing and spreading knowledge about the gender disparity that is so prevalent in STEM education/careers."
    },
    {
      "id": "5343b6c35fec33ad4cb16b08",
      "name": "Writing Club",
      "day": "Wednesday",
      "time": "Lunch",
      "location": "363",
      "advisor": "Ms. Campbell",
      "desc": "Writing Club meets Wednesdays at lunch in room 363! Join us for writing games, projects, novel writing, and more!"
    },
    {
      "id": "478a0f92aa7f9fc6b972cad3",
      "name": "Yarn Club",
      "day": "Tuesdays and Mondays",
      "time": "Lunch",
      "location": "263",
      "advisor": "Doctor Vermaak",
      "desc": "Yarn club is a chill space for anybody who currently does or is interested in knitting, crocheting, or any other yarn craft to meet and create together!"
    },
    {
      "id": "5e7dc66a7017ed41cd9c7e06",
      "name": "Youth economic initiative",
      "day": "Wednesdays",
      "time": "Lunch",
      "location": "452",
      "advisor": "Mr. Laudick",
      "instagram": "lincoln.yei",
      "desc": "Lincoln’s Youth Economics Initiative Chapter meets in room 452 on Wednesdays to learn about the study of economics using materials and curriculum from the Youth Economics Initiative (YEI), an international organization that hosts competitions such as EconBowl! If you want to learn about careers in economics, participate in virtually-held, international competitions, and meet a community of passionate students, show up to a meeting! Follow us on Instagram @lincoln.yei and we can’t wait to see you there!"
    }
] as ClubPageData["clubs"];

export default {clubs: clubs} as ClubPageData;