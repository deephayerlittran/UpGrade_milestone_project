import { fetchAllItems, addItem, modifyItem, removeItem } from "../src/api/v1/services/itemService";

describe('Item Services', () => {
    test('fetchAllItems should return an array of items', () => {
        const result = fetchAllItems();
        expect(result).toEqual(["Item 1", "Item 2"]);
    })
})