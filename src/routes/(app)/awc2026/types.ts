export type CourseRankingData = {
	course?: CourseInfo;
	records: CourseRecord[];
};

export type HitMarginList = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number
];

export type CourseInfo = {
	name: string;
	creator: string;
	levelCount: number;
	levels: CourseLevel[];
};

export type CourseLevel = {
	artist: string;
	song: string;
	creator: string;
	tiles: number;
};

export type CourseRecord = {
	user: CourseUser;
	xAccSum: number;
	playRecords: CoursePlayRecord[];
};

export type AggregatedReocrd = Omit<CourseRecord, 'playRecords'> & {
	sum: {
		xAcc: number;
		hitMargins: HitMarginList;
	};
	playRecords: AggregatedPlayRecord[];
};

export type CoursePlayRecord = {
	xAcc: number;
	hitMargins: HitMarginList;
};

export type AggregatedPlayRecord = CoursePlayRecord & {
	levelName: string;
};

export type CourseUser = {
	displayName: string;
};
