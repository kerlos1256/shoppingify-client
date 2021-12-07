export interface NewItemData {
  name: string;
  quantity: number;
  listId: number;
  categoryId: number;
  userId: number;
  category: Category;
  id: number;
  state: string;
  done: boolean;
}

export interface Category {
  id: number;
  name: string;
  state: string;
  ownerId: number;
}
