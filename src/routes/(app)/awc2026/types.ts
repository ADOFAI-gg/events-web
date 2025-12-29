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
};

export type CourseRecord = {
	user: CourseUser;
	xAccSum: number;
	playRecords: CoursePlayRecord[];
};

export type AggregatedReocrd = CourseRecord & {
	sum: {
		xAcc: number;
		hitMargins: HitMarginList;
	};
};

export type CoursePlayRecord = {
	xAcc: number;
	hitMargins: HitMarginList;
};

export type CourseUser = {
	displayName: string;
};
