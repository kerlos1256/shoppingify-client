export interface CurrentActiveList {
  id: number;
  status: string;
  ownerId: number;
  listName: string;
  items: CurrentActiveListItem[];
}

export interface CurrentActiveListItem {
  id: number;
  name: string;
  state: string;
  ownerId: number;
  items: ItemItem[];
}

export interface ItemItem {
  id: number;
  name: string;
  state: string;
  quantity: number;
  done: boolean;
  listId: number;
  categoryId: number;
  userId: number;
}
