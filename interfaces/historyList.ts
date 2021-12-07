export interface HistoryList {
  id: number;
  status: string;
  ownerId: number;
  listName: string;
  items: HistoryListItem[];
}

export interface HistoryListItem {
  id: number;
  name: string;
  state: string;
  ownerId: number | null;
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
