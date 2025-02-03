import { fetchAllItems, addItem, modifyItem, removeItem } from "../src/api/v1/services/itemService";

describe('Item Services', () => {
    test('fetchAllItems should return an array of items', () => {
        const result = fetchAllItems();
        expect(result).toEqual(["Item 1", "Item 2"]);
    });

    test('addItem should return "Item added"', () => {
        const result = addItem('Item 3');
        expect(result).toBe("Item added");
    });

    test('ModifyItem should return "ItemUpdated"', () =>{
        const result = modifyItem(1, 'Modified Item');
        expect(result).toBe("Item updated");
    });

    test('removeItem should return "Item deleted"', () => {
        const result = removeItem(1);
        expect(result).toBe("Item deleted");
    });
});