declare interface WorkTime {
	id?: number;
	mealType: string;
	time: string;
	restaurantId: Restaurant["id"];
}

enum DayOfWeek {
	MONDAY = 1,
	TUESDAY = 2,
	WEDNESDAY = 3,
	THURSDAY = 4,
	FRIDAY = 5,
	SATURDAY = 6,
	SUNDAY = 7,
}

declare interface DiscountAmount {
	id: number;
	value: number;
	restaurantId: Restaurant["id"];
}

declare interface Discount {
	id?: number;
	dayOfWeek: DayOfWeek;
	value: DiscountAmount["value"];
	discountAmount?: DiscountAmount;
	discountAmountId?: DiscountAmount["id"];
	workTime: WorkTime;
	workTimeId?: WorkTime["id"];
	restaurantId?: Restaurant["id"];
}

declare interface Block {
	id?: number;
	dayOfWeek: DayOfWeek | null;
	timeStart: string | null;
	timeEnd: string | null;
	date: Date | null;
	dateStart: Date | null;
	dateEnd: Date | null;
	periodTitle: string | null;
	restaurantId: Restaurant["id"];
}

declare interface Reservation {
	id?: number;
	createdAt?: Date;
	date: Date | string;
	time: string;
	discountAmount: number | null;
	personName: string;
	personPhone: string;
	personEmail: string;
	peopleAmount: number;
	personInstagram: string | null;
	accepted: boolean | null;
	restaurantId: Restaurant["id"];
}

declare interface Restaurant {
	id?: number;
	name: string;
	address: string;
	city: string;
	zipCode: number | null;
}

type ModalType = "restaurant" | "reservation";
