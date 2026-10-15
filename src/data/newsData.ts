export interface Comment {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  content: string;
  upvotes: number;
}

export interface Article {
  id: string;
  title: string;
  deck: string;
  byline: string;
  authorRole?: string;
  readTime: string;
  section: string;
  subSection?: string;
  categoryTag?: string;
  tagColor?: string;
  commentCount: number;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCredit?: string;
  isLead?: boolean;
  isOpinion?: boolean;
  authorAvatar?: string;
  isLive?: boolean;
  liveTag?: string;
  publishDate: string;
  content: string[];
  pullQuote?: {
    quote: string;
    attribution: string;
  };
}

export const ARTICLES: Article[] = [
  {
    id: 'women-leaving-trump-admin',
    title: 'High-Ranking Women Are Leaving the Trump Administration',
    deck: 'In the president’s second term, those heading for the exits are female officials, raising fresh scrutiny over executive leadership and White House turnover.',
    byline: 'By Jonathan Swan and Maggie Haberman',
    readTime: '5 min read',
    section: 'U.S.',
    subSection: 'Politics',
    commentCount: 519,
    publishDate: 'October 14, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHMWRPAF08cAHDa7a6KCp-rPEvTSzARgiaLRXlf20-cdJGha76QvmMUwPXqFW4dI_5Io55RLFaO6dlfJ4lu6mNo5eRL9M6UqNwc_RMHBrfZpyaRflwIH8qA00q6HVzLJo_R-CkJEKMC0L8xf0eCBpvJDptX1d3HeJ_9hQmv7ECZcT6C7AIIKV1Ok1s8NXWc4UGilzScjUVVaMhbvF_BDLq7iFx5jO26AwfFGjI_gC5JC1HNp3ez-Ai',
    imageAlt: 'Editorial press conference portrait of a high-profile political female advisor wearing distinctive bold dark eyeglasses, looking directly at reporters with a solemn, intense expression in a crowded Capitol briefing room.',
    imageCaption: 'Kimberly Guilfoyle during a recent appearance in Washington before her diplomatic role in Athens dissolved.',
    imageCredit: 'Tierney L. Cross/The New York Times',
    isLead: true,
    pullQuote: {
      quote: 'The speed of these departures is unprecedented for a second term, reflecting deeper tensions between loyalty tests and policy execution.',
      attribution: 'Senior West Wing Advisor'
    },
    content: [
      'WASHINGTON — A wave of high-profile departures among senior female officials has accelerated across the West Wing in recent weeks, leaving crucial advisory councils shorthanded and reopening sensitive questions about internal management in the president’s second administration.',
      'From the National Security Council to domestic economic advisory panels, more than half a dozen female deputy directors and senior counselors have tendered resignations or been quietly reassigned. While West Wing staff turnover is a perennial feature of modern presidencies, aides note that this current wave is remarkably concentrated among women who held pivotal policy portfolios.',
      'Interviews with more than a dozen current and former administration officials portray an environment where internal factions have engaged in fierce ideological boundary-drawing ahead of next month’s midterm elections. Several departing aides cited diminishing influence over policy directives and an insular decision-making apparatus dominated by a close coterie of longtime confidants.',
      '“There is an unmistakable shift in who has the president’s ear when key decisions are made in the Treaty Room,” said one former official who departed last month on condition of anonymity to speak candidly about internal deliberations. “A lot of disciplined policy work is getting overridden in late-night phone conversations.”',
      'The White House pushed back firmly against suggestions of systemic turmoil. In a statement on Wednesday morning, Chief of Staff aides emphasized that turnover is typical midway through an administration’s tenure and pointed to upcoming nominations of several veteran civil servants.',
      'Yet lawmakers on Capitol Hill have taken notice. Key committee chairs have already begun privately inquiring about delays in congressional testimony and regulatory filings, signaling that the staffing turbulence may soon spill into open oversight hearings.'
    ]
  },
  {
    id: 'steep-rise-fall-guilfoyle',
    title: 'The Steep Rise and Sudden Fall of Kimberly Guilfoyle',
    deck: 'From the pinnacle of campaign surrogacy to a quiet departure following an ambassadorial withdrawal in Greece.',
    byline: 'By Shane Goldmacher',
    readTime: '6 min read',
    section: 'U.S.',
    subSection: 'Politics',
    commentCount: 519,
    publishDate: 'October 14, 2026',
    content: [
      'For nearly a decade, Kimberly Guilfoyle stood as one of the most animated, thunderous voices in American conservative politics, a fiery surrogate who could ignite convention arenas with a single crescendoed cadence.',
      'Her abrupt withdrawal from consideration as ambassador to Greece marks a striking denouement for a political figure who once seemed central to the family and ideological apparatus surrounding the presidency.',
      'Behind closed doors in the Senate Foreign Relations Committee, concerns had quietly mounted regarding vetting disclosures and diplomatic priorities in the Mediterranean basin. What began as private hesitations among Republican senators soon metastasized into an untenable nomination battle.',
      'Her departure leaves Greece without a confirmed American envoy at a moment when eastern Mediterranean naval pacts and regional energy routes are subject to intense geopolitical friction.'
    ]
  },
  {
    id: 'trump-press-secretary-attorney',
    title: 'Trump’s New Press Secretary: Not-Quite Attorney at Law',
    deck: 'Katie Zacharia told The New York Times that the confusion over her legal credentials is the result of one big misunderstanding.',
    byline: 'By Michael D. Shear',
    readTime: '4 min read',
    section: 'U.S.',
    subSection: 'White House',
    commentCount: 142,
    publishDate: 'October 14, 2026',
    content: [
      'When Katie Zacharia assumed the podium in the James S. Brady Press Briefing Room, her official biography listed extensive courtroom experience as an appellate advocate in commercial and administrative law.',
      'However, state bar registry records reviewed by The New York Times indicate that while Ms. Zacharia completed legal coursework, she was never admitted to practice in the jurisdictions named in her biographical release.',
      'In a phone interview on Tuesday evening, Ms. Zacharia clarified that her professional work had focused primarily on strategic communications for litigation teams rather than courtroom oral advocacy.',
      '“I have always been transparent about my roles assisting trial teams with message discipline,” she stated. “Any implication that I claimed to be lead trial counsel before the bar is simply a misunderstanding of customary PR phrasing.”'
    ]
  },
  {
    id: 'how-west-wing-replaces-inner-circle',
    title: 'How the West Wing Replaces Its Inner Circle',
    deck: 'Departures at this pace have typically signaled policy pivots or shifting campaign priorities ahead of midterms.',
    byline: 'By Peter Baker',
    readTime: '4 min read',
    section: 'U.S.',
    subSection: 'Analysis',
    categoryTag: 'Analysis',
    tagColor: 'text-opinion-crimson',
    commentCount: 88,
    publishDate: 'October 14, 2026',
    content: [
      'Presidencies operate on rhythms dictated by electoral calendars, and midterms invariably force a pruning of personnel. But the mechanics of replacement in the current administration reveal a stark break with tradition.',
      'Rather than turning to seasoned cabinet deputies or K-Street policy veterans, the inner circle is increasingly replenished through loyalist networks forged in television studios and independent digital media platforms.',
      'This structural preference ensures ideological fidelity, but it frequently results in acute administrative friction when new appointees confront the Byzantine realities of federal procurement and statutory rulemaking.'
    ]
  },
  {
    id: 'inside-vetting-failures',
    title: 'Inside the Vetting Failures That Rocked Staffers',
    deck: 'Officials recount hours of frantic conference calls as resume discrepancies emerged in public.',
    byline: 'By Luke Broadwater',
    readTime: '5 min read',
    section: 'U.S.',
    subSection: 'Investigation',
    categoryTag: 'Behind The Story',
    tagColor: 'text-nyt-blue',
    commentCount: 203,
    publishDate: 'October 14, 2026',
    content: [
      'It began with an innocuous footnote in a routine background clearance questionnaire. Within 48 hours, it had escalated into an all-hands crisis involving the White House counsel’s office, the FBI, and senior legislative liaisons.',
      'Interviews with officials who participated in the crisis sessions reveal that standard background verification protocols were repeatedly truncated to meet expedited inauguration hiring goals.',
      '“We were asked to process files in days that normally require months of rigorous cross-referencing,” said one former vetting officer. The consequences of that haste are now surfacing with predictable regularity across federal agencies.'
    ]
  },
  {
    id: 'texas-senate-race-tightens',
    title: 'Texas Senate Race Tightens, Polls Show, Even as Talarico Keeps His Edge',
    deck: 'A surge in suburban early voting and an unprecedented $10 billion ad blitz transform the Lone Star State into the central battleground of the midterm cycle.',
    byline: 'By Nate Cohn and J. David Goodman',
    readTime: '5 min read',
    section: 'U.S.',
    subSection: 'Elections',
    isLive: true,
    liveTag: 'Live Updates',
    commentCount: 940,
    publishDate: 'October 14, 2026',
    content: [
      'AUSTIN, Texas — New nonpartisan polling released on Wednesday confirms that the contest for the United States Senate in Texas has tightened into a razor-thin margin, even as Democratic challenger James Talarico maintains a narrow lead in fast-growing suburban corridors around Dallas and Houston.',
      'With over $180 million spent on television and digital advertising in the state alone, the race has eclipsed all prior expenditure records for a midterm Senate contest.',
      'Key findings from the New York Times/Siena College survey indicate an electorate deeply divided on energy policy, border security, and school financing. While rural counties continue to deliver overwhelming Republican margins, turnout projections among under-35 voters in Travis, Bexar, and Harris counties show unprecedented enthusiasm.',
      '“We are seeing an electoral map that would have been unrecognizable a decade ago,” said Daron Shaw, a co-director of the statewide polling project. “The outcome will likely hinge on whether independent suburban women break by single or double digits.”'
    ]
  },
  {
    id: 'ukraine-exposure-satellites',
    title: 'Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates',
    deck: 'A huge attack cut power to 600,000 people in Kyiv, and a Pentagon-funded satellite internet program appeared to be curbed without warning.',
    byline: 'By Andrew E. Kramer and Eric Schmitt',
    readTime: '6 min read',
    section: 'World',
    subSection: 'Europe',
    commentCount: 1120,
    publishDate: 'October 14, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_zRzXZJMXqp039AWmVnBUkIEg12IRS3gvFMlVPdUBT-8UF0OvB_gTbi_pxZtDb8ln4QtKh4fSRCd3V_2QurQaGisD4ynD-pFcr-s3PVpyOe8cBLCB16id1GIiAbUslrhc_VT5v01EpDoESmOcnhPh1bhvQy9QOCB3aMbpGe_o8Y8ZxHWqwLm-2A0PD2yXma87norbL9qqVIK3WkAi_qiKnjhGcBkuaIjMeA9znAaE9AWOOMH3VQRn',
    imageAlt: 'Kyiv city skyline at dusk illuminated only by emergency flares and distant vehicle lights following a massive electrical grid failure.',
    imageCaption: 'Blackouts across districts after missile volleys struck power hubs.',
    imageCredit: 'Evgeniy Maloletka/AP',
    pullQuote: {
      quote: 'Without guaranteed orbital bandwidth, tactical coordination along the northern defensive line is reduced to localized radio relays.',
      attribution: 'Col. Roman Kostenko, Defense Committee Secretary'
    },
    content: [
      'KYIV, Ukraine — Waves of coordinated cruise missile strikes disabled three critical electrical distribution substations surrounding Kyiv before dawn on Wednesday, plunging more than 600,000 residents into darkness as temperatures plunged near freezing.',
      'Compounding the crisis, Ukrainian military units stationed along the northeastern front reported sudden, severe throttles on commercial satellite internet connectivity that has served as the backbone for drone reconnaissance and artillery targeting throughout the conflict.',
      'Military analysts warn that the confluence of electrical grid degradation and electronic warfare interdiction poses the most severe challenge to Ukrainian defensive postures since the opening weeks of the 2022 invasion.',
      'Emergency utility crews worked through the night under blackout conditions to re-route high-voltage transmission lines from western hydroelectric reservoirs. Meanwhile, Ukrainian defense officials in Brussels made urgent appeals to NATO partners for supplementary mobile generators and hardened ground stations.'
    ]
  },
  {
    id: 'why-trumps-diesel-deal-wont-lower-prices',
    title: 'Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices',
    deck: 'Global market arbitrage and refining bottlenecks ensure relief at the pump remains elusive for American commuters.',
    byline: 'By Clifford Krauss',
    readTime: '4 min read',
    section: 'World',
    subSection: 'Economy',
    categoryTag: 'Economic Fallout',
    commentCount: 312,
    publishDate: 'October 14, 2026',
    content: [
      'HOUSTON — Despite announcements of a bilateral understanding intended to allow shipments of Russian refined distillates into designated international bunkering ports, energy economists see virtually no mathematical avenue for the accord to lower retail diesel prices in the United States.',
      'The fundamental bottleneck, industry analysts point out, is not crude supply but domestic refining capacity, which has operated near 94 percent capacity without significant expansion for three decades.',
      'Furthermore, complex shipping and sanctions compliance covenants mean imported barrels must undergo extensive testing and blending, eroding any putative cost advantages before reaching domestic pipeline terminals.'
    ]
  },
  {
    id: 'ai-agents-dinner-party',
    title: 'What a Group of A.I. Agents Talked About as Their Humans Had a Dinner Party',
    deck: 'As autonomous bots spread into personal scheduling, we are increasingly glimpsing how digital entities negotiate with one another.',
    byline: 'By Aaron Fernandez',
    readTime: '6 min read',
    section: 'Business',
    subSection: 'Artificial Intelligence',
    commentCount: 210,
    publishDate: 'October 14, 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmAHZ7mD_be3ZnIm1XIFZ_rZIJCyIpu3zBJNeoMS5CMK0DKuPfpzPU34KnsQ1cwPikcELC-WjUpuTM0K-yt3-D-bMBFIiZHH6P-kdiMK9uV_a9vXZWtEv7Ep26vQAMFZ3ayJRM0iIwClSd11Mj6R-1almu6tZcqvRFIwOPrp_0jkkqm31aYKFABwbCNwWurbgH1ABpLdti-d3dkMHhd18XYDWbXefuKCUksNrof4RfuRuaJYgXng2N',
    imageAlt: 'Conceptual editorial art photograph showing miniature glowing server boxes on an elegant banquet dining table beside wine glasses and candlelight.',
    imageCaption: 'Silicon Valley’s Pursuit of the Smart Home, the Dinner Guest Has An Agent.',
    imageCredit: 'The New York Times',
    pullQuote: {
      quote: 'The agents exchanged 1,420 tokens in less than 300 milliseconds, haggling over dietary preferences, taxi dispatch windows, and wine pairing budgets.',
      attribution: 'Dr. Elena Rostova, Autonomous Systems Lab'
    },
    content: [
      'SAN FRANCISCO — The six guests seated around the mahogany dining table in Presidio Heights were savoring roasted butternut squash and discussing the autumn theater season. Beneath the surface of their polite conversation, however, six autonomous software agents running on their smartphones were engaged in a hyper-speed debate of their own.',
      'Using experimental agent-to-agent negotiation protocols, the digital proxies were quietly haggling over rideshare split times, cross-checking calendar availability for next month’s ski retreat, and auditing allergen warnings on dessert ingredients.',
      'The exchange, monitored by researchers from Stanford’s Center on Digital Society, produced fascinating insights into machine micro-diplomacy. When two agents encountered conflicting calendar mandates, they didn’t fail; they proposed probabilistic compromises weighted by their respective owners’ past attendance habits.',
      '“We are moving past the era where computers wait for commands,” said Dr. Elena Rostova. “We are entering an era of synthetic delegation, where software negotiates social obligations on our behalf before we even know we have them.”'
    ]
  },
  {
    id: 'anthropic-revenue-jump',
    title: 'Anthropic Says Revenue Jumped 45% to $16.8 Billion in Third Quarter',
    deck: 'Enterprise adoption of frontier reasoning models accelerates despite cooling venture capital sentiment.',
    byline: 'By Cade Metz',
    readTime: '3 min read',
    section: 'Business',
    subSection: 'Tech',
    commentCount: 167,
    publishDate: 'October 14, 2026',
    content: [
      'SAN FRANCISCO — Anthropic reported on Wednesday that its annualized revenue run rate surged 45 percent during the third quarter to $16.8 billion, driven by explosive demand among Fortune 500 corporations deploying autonomous coding workflows.',
      'The disclosure underscores how enterprise spending on artificial intelligence infrastructure has begun to translate into tangible top-line software revenue, even as broader venture funding for early-stage AI startups shows signs of plateauing.',
      'Chief Executive Dario Amodei noted that revenue from financial services and pharmaceutical research clients more than doubled sequentially, highlighting specialized synthesis tasks as the fastest-growing commercial segment.'
    ]
  },
  {
    id: 'coming-out-at-50',
    title: '“Coming Out at 50 Can Be Hard. Shelly Found a Coach.”',
    deck: 'She spent decades building an identity as a suburban wife and mother. Could she disrupt “a perfectly good family dynamic” to live her authentic truth?',
    byline: 'Photo essay by Sophie Park for The New York Times',
    readTime: '8 min read',
    section: 'Lifestyle',
    subSection: 'The Great Read',
    commentCount: 259,
    publishDate: 'October 14, 2026',
    pullQuote: {
      quote: 'I realized that safety and happiness are not the same thing. I had spent fifty years being safe.',
      attribution: 'Shelly Zimmerman'
    },
    content: [
      'MAPLEWOOD, N.J. — For more than twenty-five years, Shelly Zimmerman lived what friends described as a textbook suburban existence: an immaculate four-bedroom colonial, two accomplished children now navigating graduate school, a marriage founded on mutual affection and neighborhood barbecues.',
      'And yet, sitting alone in her kitchen in the autumn of her forty-ninth year, she realized she had spent half a century living someone else’s script.',
      '“The hardest part wasn’t fear of rejection,” Shelly recalls. “It was the terrifying realization that breaking my silence meant voluntarily dismantling a perfectly functional life. Nobody was angry. Nobody had done anything wrong. That almost made it harder.”',
      'Enter life transition coaching tailored specifically for mid-life LGBTQ+ emergence. Through weekly structured sessions, Shelly found a framework to navigate grief, legal separations, and the profound vulnerability of starting over at fifty.',
      'Today, living in a light-filled apartment in Jersey City, she paints large-format abstracts and volunteers at a youth community center. “You don’t lose the life you had,” she reflects. “You finally allow it to make room for who you actually are.”'
    ]
  },
  {
    id: 'democrats-shouldnt-wait',
    title: 'Democrats Shouldn’t Wait Two More Years',
    deck: 'Patience is not an effective political doctrine when federal institutions are being re-engineered overnight.',
    byline: 'By David Wallace-Wells',
    authorRole: 'Contributing Columnist',
    readTime: '5 min read',
    section: 'Opinion',
    isOpinion: true,
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKuH0RHcqj-19dvgF1KXDZzDOmxsoLwoe_lVJnrg4F_Emb0FBpKp9pFHWFDKZXjLKaJdnA9fERR-tq3IvSea-7NqPcUOFLUAVNUL1CeB9qlYhZknRr9VJqIhMttBViCxk96IVxEBevofC9mMiTTVVsPIFzy5HdWlDBBEqmYB_bjFtUWs8_4md-EX0qWVJlpeWCwRMSpcXKUoxPvTXc_v-91CG9v9PdnQE0utMbW2Hh_98pevjKedX1',
    commentCount: 388,
    publishDate: 'October 14, 2026',
    content: [
      'The reigning consensus among Democratic strategists on the Acela corridor is one of tactical restraint: let the opposition overreach, preserve political capital, and wait for the natural pendulum swing of the 2028 presidential cycle.',
      'This doctrine of passive anticipation fundamentally misunderstands the velocity of administrative transformation currently underway.',
      'When regulatory safeguards, environmental protections, and civil service protections are systematically dismantled via executive fiat, the institutional memory required to re-establish them does not simply lie dormant in wait; it evaporates.',
      'Opposition must not be treated as a campaign message to be unfurled every twenty-four months. It must be practiced as a continuous, municipal, and state-level bulwark capable of defending civic institutions in real time.'
    ]
  },
  {
    id: 'never-seen-ebola-spread',
    title: 'I’ve Never Seen Ebola Spread Like This',
    deck: 'Front-line medical units lack foundational sanitation tools as regional transport vectors accelerate transmission.',
    byline: 'By Heather Kerr',
    authorRole: 'Guest Essay',
    readTime: '4 min read',
    section: 'Opinion',
    isOpinion: true,
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrvHSxgFTBJ_asax_Y7PxnStAuS3hTcQDxf-_oDTzgpzDXuPNjQQb6WVYHVF_2N4eMel9LXbFVDbVsQ8JK1cCX8ZcALkH0QqlTPGcRVIaUIe_orUH1To_na31_-J5erlco6BeGc7FYATqiwFHnhRqqdjtaF-r6l9ZR4GUZ3XrVDks2wI8s9Yp0yW9G_4ctKTrAHvEY2tXbrdU5nycPU2jcQlAO4jen1lQwEhKiqDO9LkjvfU4g1twu',
    commentCount: 194,
    publishDate: 'October 14, 2026',
    content: [
      'In twenty years of epidemiological fieldwork from Goma to Monrovia, the golden rule of viral containment has always been geographic isolation: cut off transit routes early, ring-vaccinate contact networks, and establish trusted community triage centers.',
      'In the current outbreak, however, high-speed regional minibuses and paved highway networks have outpaced surveillance teams by days.',
      'Health workers on the perimeter are operating without basic nitrile gloves and protective gowns. If international health funding is not immediately mobilized, we risk seeing an endemic transmission cycle that defies traditional containment protocols.'
    ]
  },
  {
    id: 'manifesto-to-end-manifestoes',
    title: 'A Manifesto to End All Manifestoes',
    deck: 'Silicon Valley’s new crop of utopian pamphlets promise total abundance while casually dismissing civic life.',
    byline: 'By Carlos Lozada',
    authorRole: 'Opinion Columnist',
    readTime: '5 min read',
    section: 'Opinion',
    isOpinion: true,
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg0q453un49t9IwXSpWzqJdZZUb1XKGptcrLJsZ7uTwB9dcZiQYo9Xfc_LuMMdDYkWlC08RdyReVXusRftqdBBgKTmZl59r2OwRROmIYG3OY2UXIWqOLKP_a_iRCzcjX-UQN3jZ7sgou6J-W-T-hsr_kED4HgC4SP7MVurujEsUWszKNrzrqCB26RO7hCiee58Er8bD4AqWEH62KXeo3ekx6UJ6GfE2Stxer40zBrLnsjgbgFGn6vM',
    commentCount: 69,
    publishDate: 'October 14, 2026',
    content: [
      'Every technology cycle generates its own devotional literature. In the nineties, we had the cyber-libertarian declarations of virtual independence; in the twenty-tens, the TED-talk homilies on platform synergy.',
      'Today, tech billionaires have graduated to full-blown techno-theology: glossy treatises in bespoke typography proclaiming that human progress is purely a function of compute clusters and energy generation.',
      'What is missing from all of these manifestoes is any recognition of the messy, slow, unquantifiable virtues of representative democracy. They promise an abundance of calories and silicon, but an absolute famine of collective self-determination.'
    ]
  },
  {
    id: 'tom-cruise-secret-masterpiece',
    title: 'Tom Cruise’s Big Flop Is a Secret Masterpiece',
    deck: 'Underneath the bloated production budget of ‘Digger’ sits one of cinema’s strangest parables on ecological dread.',
    byline: 'By Jayson Greene',
    authorRole: 'Culture Critic',
    readTime: '5 min read',
    section: 'Arts',
    isOpinion: true,
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5hv_Wib4TweOo1GNFDXPB0v4E1dqqClqg3_QHhq2FBn1lRVgId6LQvU8lbT1cZOCJ2XPFakN2CNnrJIrG42-55-K-rTu4iRoucAFJO1tYVxcb9X3Cc21l6mfjkMRNUWiVu4KTa0Yo01S8M4Dox5aWcXDk0FU5v_2JoQZJ5ciQxSGW7MiXRNhcsALjZoXzpNAzwUmCnDmc9WI5uV50wdrrwk4TQ8W43mjx5rZwypC47-D9Z4cgw_Wj',
    commentCount: 155,
    publishDate: 'October 14, 2026',
    content: [
      'When ‘Digger’ opened to an anemic $18 million weekend haul against a $240 million balance sheet, Hollywood trade magazines rushed to publish the obligatory post-mortems about star fatigue and the death of original sci-fi IP.',
      'Watch it now, free from the box-office ticker, and a completely different film emerges: a claustrophobic, dirt-choked meditation on industrial hubris that owes more to Andrei Tarkovsky than to Top Gun.',
      'Cruise gives the most physically grueling, ego-free performance of his late period, caked in permafrost mud and muttering broken radio coordinates into a dead receiver. It is a masterpiece that audiences simply weren’t ready to breathe in.'
    ]
  },
  {
    id: 'brewers-lead-dodgers-game-3',
    title: 'Brewers Lead Dodgers in Game 3 of N.L. Championship Series',
    deck: 'Jackson Chourio’s home run on the first pitch of the game gave Milwaukee an early cushion as they seek a dominant 3-0 series stranglehold.',
    byline: 'By Tyler Kepner',
    readTime: '4 min read',
    section: 'The Athletic',
    subSection: 'MLB',
    isLive: true,
    liveTag: 'Live',
    commentCount: 412,
    publishDate: 'October 14, 2026',
    content: [
      'LOS ANGELES — Jackson Chourio didn’t even wait for a warm-up strike. On the very first pitch thrown by Dodgers starter Tyler Glasnow, the 22-year-old phenom blasted a 424-foot laser deep into the right-center field pavilion at Dodger Stadium.',
      'The thunderous start set the tone for Milwaukee’s pitching masterclass, as Corbin Burnes and a stingy bullpen combination held Los Angeles’ high-powered lineup to just three scattered singles through seven grueling innings.',
      'With a 4-1 lead in the 7th and two outs, Milwaukee is just six outs away from commanding a historic 3-0 series stranglehold in the National League Championship Series.'
    ]
  },
  {
    id: 'battle-over-pierre-hotel',
    title: 'Battle Over the Pierre Hotel Ends in Defeat for Buyer Backed by Lutnick',
    deck: 'Motasem Khashoggi missed a key deadline to place a deposit on the landmark Manhattan residential tower.',
    byline: 'By Stefanos Chen',
    readTime: '7 min read',
    section: 'Lifestyle',
    subSection: 'Real Estate',
    commentCount: 84,
    publishDate: 'October 14, 2026',
    content: [
      'The protracted legal and financial tug-of-war over Manhattan’s legendary Pierre Hotel co-op residences reached a definitive conclusion this week after foreign investor Motasem Khashoggi failed to meet an escrow funding deadline.',
      'The decision clears the way for the building’s conservative board to solicit alternate bids for the triplex penthouse, one of New York City’s most storied private architectural treasures.'
    ]
  },
  {
    id: 'the-toy-store-15-million-bird',
    title: 'The Toy Store, and $15 Million Bird, at the Center of an Internet Frenzy',
    deck: 'Art of Play in Brooklyn Heights finds itself in a viral social media standoff with Kelly Clarkson.',
    byline: 'By Madison Malone Kircher',
    readTime: '5 min read',
    section: 'Lifestyle',
    subSection: 'Culture',
    commentCount: 198,
    publishDate: 'October 14, 2026',
    content: [
      'What began as a whimsical window display featuring an oversized mechanical macaw named Barnaby in a Brooklyn Heights storefront has spiraled into an internet sensation involving daytime television hosts and trademark attorneys.',
      'Storeowner Clara Rossi explains how an offhand video posted to TikTok garnered 42 million views in forty-eight hours, bringing crowds of sightseers to a quiet residential block of Montague Street.'
    ]
  },
  {
    id: 'plaza-hotel-shut-clean-facade',
    title: 'Plaza Hotel to Shut for Four-Year Cleanup of Its Celebrated Facade',
    deck: 'The iconic Central Park South landmark will undergo a comprehensive stone preservation project.',
    byline: 'By James Barron',
    readTime: '3 min read',
    section: 'Lifestyle',
    subSection: 'NYC',
    commentCount: 56,
    publishDate: 'October 14, 2026',
    content: [
      'The French Renaissance chateau facade of the Plaza Hotel on Fifth Avenue will disappear behind scaffolding beginning in January for an extensive stone and copper restoration estimated at $120 million.',
      'Preservationists applaud the move to address a century of urban sulfur dioxide pitting, though hotel guests will face altered promenade views.'
    ]
  }
];

export const INITIAL_COMMENTS: Record<string, Comment[]> = {
  'women-leaving-trump-admin': [
    {
      id: 'c1',
      author: 'Eleanor Vance',
      location: 'Bethesda, MD',
      timeAgo: '2h ago',
      content: 'This isn’t just typical midterm churn. When career policy directors and deputies leave simultaneously, the institutional memory that prevents catastrophic regulatory mistakes disappears with them.',
      upvotes: 42
    },
    {
      id: 'c2',
      author: 'Marcus J. Reynolds',
      location: 'Denver, CO',
      timeAgo: '1h ago',
      content: 'Every administration experiences friction between campaign loyalists and policy technicians. What’s notable here is the apparent complete sidelining of conventional interagency vetting.',
      upvotes: 19
    },
    {
      id: 'c3',
      author: 'Sarah Jenkins',
      location: 'Chicago, IL',
      timeAgo: '35m ago',
      content: 'Fascinating reporting by Swan and Haberman as usual. The details on how decision-making migrated to late-night phone calls reflect patterns we saw in the first term.',
      upvotes: 8
    }
  ],
  'texas-senate-race-tightens': [
    {
      id: 'c4',
      author: 'Guillermo Soto',
      location: 'San Antonio, TX',
      timeAgo: '4h ago',
      content: 'Turnout in Bexar County early voting lines is like nothing I’ve seen in 30 years of living in Texas. Young people are showing up in droves.',
      upvotes: 67
    },
    {
      id: 'c5',
      author: 'Patricia Miller',
      location: 'Plano, TX',
      timeAgo: '2h ago',
      content: 'The ad blitz is relentless. Every commercial break has three competing attack ads. It will come down to Collin and Denton counties.',
      upvotes: 31
    }
  ],
  'ai-agents-dinner-party': [
    {
      id: 'c6',
      author: 'Vikram Mehta',
      location: 'Seattle, WA',
      timeAgo: '3h ago',
      content: 'The idea of software agents brokering social commitments before human realization is both deeply convenient and mildly terrifying.',
      upvotes: 89
    }
  ]
};

export const EDITIONS = [
  { id: 'us', label: 'U.S.', flag: '🇺🇸', weather: '64°F NYC', market: 'S&P 500 +0.48%' },
  { id: 'international', label: 'International', flag: '🌍', weather: '17°C London', market: 'FTSE 100 +0.32%' },
  { id: 'canada', label: 'Canada', flag: '🇨🇦', weather: '14°C Toronto', market: 'TSX +0.21%' },
  { id: 'espanol', label: 'Español', flag: '🇪🇸', weather: '21°C Madrid', market: 'IBEX 35 +0.65%' },
  { id: 'chinese', label: '中文', flag: '🇨🇳', weather: '19°C Shanghai', market: 'HSI +1.12%' },
];

export const NAV_SECTIONS = [
  'U.S.',
  'World',
  'Business',
  'Arts',
  'Lifestyle',
  'Opinion',
  'Video',
  'Audio/Shows',
  'Games',
  'Cooking',
  'Wirecutter',
  'The Athletic'
];
