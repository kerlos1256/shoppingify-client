export interface PublicCategoriesData {
  id: number;
  name: string;
  state: string;
  ownerId: null;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  state: string;
  quantity: number;
  listId: null;
  categoryId: number;
  userId: null;
}
