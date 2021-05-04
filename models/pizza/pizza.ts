export interface Pizza {
	Crust: string;
	Flavor: string;
	Size: string;
	Table_No: number;
}

export interface OrderedPizza extends Pizza {
	Order_ID: number;
	Timestamp: string;
}
