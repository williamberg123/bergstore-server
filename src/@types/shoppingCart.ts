import { ProductType } from './product';

export interface ShoppingCartType {
	_id: string;
	products: ProductType[];
}
