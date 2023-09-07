const URL_discountAmount = "/api/discount-amounts";
const URL_discount = "/api/discounts";
const URL_discountDayOfWeek = `${URL_discount}/day-of-week`;

import { DiscountAmount } from "@prisma/client";
import { storeToRefs } from "pinia";

export const useDiscountsStore = defineStore("DiscountsStore", () => {
	const storeRestaurants = useRestaurantsStore();
	const { activeRestaurantId } = storeToRefs(storeRestaurants);

	// STATE
	const discountAmountsList = ref<DiscountAmount[]>([]);
	const discountsList = ref<Discount[]>([]);

	// GETTERS
	const discountAmountsListOrdered = computed(() =>
		discountAmountsList.value
			.slice()
			.sort((a: any, b: any) => a.value - b.value)
	);

	// ACTIONS
	async function fetchDiscountAmounts(restaurantId?: Restaurant["id"]) {
		const { data } = await useFetch<DiscountAmount[]>(URL_discountAmount, {
			params: { restaurantId: restaurantId || activeRestaurantId },
		});
		if (data?.value) discountAmountsList.value = data.value;
	}

	async function fetchDiscounts(restaurantId?: Restaurant["id"]) {
		const { data } = await useFetch<Discount[]>(URL_discount, {
			params: { restaurantId: restaurantId || activeRestaurantId },
		});
		if (data?.value) discountsList.value = data.value;
	}

	async function fetchDiscountsByDayOfWeek(
		dayOfWeek: DayOfWeek,
		restaurantId?: Restaurant["id"]
	) {
		const { data } = await useFetch<Discount[]>(URL_discount, {
			params: { dayOfWeek, restaurantId: restaurantId || activeRestaurantId },
		});
		if (data?.value) discountsList.value = data.value;
	}

	async function addDiscountAmount(value: DiscountAmount["value"]) {
		const { data, error } = await useFetch<DiscountAmount>(URL_discountAmount, {
			method: "post",
			body: { value, restaurantId: activeRestaurantId },
		});
		if (data && data.value) discountAmountsList.value.push(data.value);
	}

	async function addDiscount(
		dayOfWeek: DayOfWeek,
		workTimeId: WorkTime["id"],
		discountAmountId: DiscountAmount["id"]
	) {
		const { data, error } = await useFetch<Discount>(URL_discount, {
			method: "post",
			body: {
				dayOfWeek,
				discountAmountId: discountAmountId,
				workTimeId: workTimeId,
				restaurantId: activeRestaurantId,
			},
		});
		if (data && data.value) discountsList.value.push(data.value);
	}

	async function addManyDiscounts(
		dayOfWeek: DayOfWeek,
		discountAmountId: DiscountAmount["id"]
	) {
		const { data, error } = await useFetch<Discount[]>(URL_discountDayOfWeek, {
			method: "post",
			body: {
				dayOfWeek,
				discountAmountId: discountAmountId,
				restaurantId: activeRestaurantId,
			},
		});
		if (data && data.value) {
			// replace them all with the new list returned
			if (dayOfWeek === 10) discountsList.value = data.value;
			// otherwises remove discount that have dayOfWeek === param.dayOfWeek
			else {
				discountsList.value
					.filter((x) => x.dayOfWeek === dayOfWeek)
					.forEach((x) =>
						discountsList.value.splice(discountsList.value.indexOf(x), 1)
					);

				data.value.forEach((element) => discountsList.value.push(element));
			}
		}
	}

	async function updateDiscount(
		discountId: Discount["id"],
		workTimeId: WorkTime["id"],
		discountAmountId?: DiscountAmount["id"]
	) {
		const { data } = await useFetch<Discount>(`${URL_discount}/${discountId}`, {
			method: "patch",
			body: {
				discountAmountId: discountAmountId || null,
				workTimeId: workTimeId,
			},
		});
		if (data && data.value) {
			const discountToUpdateIndex = discountsList.value.findIndex(
				(e) => e.id === discountId
			);
			discountsList.value[discountToUpdateIndex] = data.value;
		}
	}

	async function deleteDiscountAmount(discountAmountId: DiscountAmount["id"]) {
		await useFetch(`${URL_discountAmount}/${discountAmountId}`, {
			method: "delete",
		});
		const discountAmountToRemoveIndex = discountsList.value.findIndex(
			(e) => e.id === discountAmountId
		);
		discountAmountsList.value.splice(discountAmountToRemoveIndex, 1);
		await fetchDiscounts();
	}

	async function deleteDiscount(discountId: Discount["id"]) {
		await useFetch(`${URL_discount}/${discountId}`, {
			method: "delete",
		});
		const discountToRemoveIndex = discountsList.value.findIndex(
			(e) => e.id === discountId
		);
		discountsList.value.splice(discountToRemoveIndex, 1);
	}

	async function deleteAllDiscountsOnDayOfWeek(
		dayOfWeek: Discount["dayOfWeek"]
	) {
		await useFetch(`${URL_discountDayOfWeek}`, {
			method: "delete",
			body: { dayOfWeek, restaurantId: activeRestaurantId },
		});
		// remove locally, if ALL remove everything
		if (dayOfWeek === 10) {
			discountsList.value = [];
			refreshNuxtData();
		} // otherwises remove discount that have dayOfWeek === param.dayOfWeek
		else {
			discountsList.value
				.filter((x) => x.dayOfWeek === dayOfWeek)
				.forEach((x) =>
					discountsList.value.splice(discountsList.value.indexOf(x), 1)
				);
		}
	}

	return {
		discountAmountsList,
		discountAmountsListOrdered,
		discountsList,
		fetchDiscountAmounts,
		fetchDiscounts,
		fetchDiscountsByDayOfWeek,
		addDiscountAmount,
		addDiscount,
		addManyDiscounts,
		updateDiscount,
		deleteDiscountAmount,
		deleteDiscount,
		deleteAllDiscountsOnDayOfWeek,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRestaurantsStore, import.meta.hot));
}
