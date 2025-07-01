/* eslint-env jest */
import cartReducer, { addToCart, removeFromCart, updateQuantity } from './cartSlice';

const sampleProduct = { _id: 'p1', name: 'Sample', price: 10 };

describe('cartSlice', () => {
    it('should return initial state', () => {
        expect(cartReducer(undefined, { type: 'unknown' })).toEqual({ items: [], total: 0, itemCount: 0 });
    });

    it('adds to cart and calculates totals', () => {
        const state = cartReducer(undefined, addToCart({ product: sampleProduct, size: 'M', quantity: 2 }));
        expect(state.items.length).toBe(1);
        expect(state.total).toBe(20);
        expect(state.itemCount).toBe(2);
    });

    it('increments quantity if same product+size added', () => {
        let state = cartReducer(undefined, addToCart({ product: sampleProduct, size: 'M', quantity: 1 }));
        state = cartReducer(state, addToCart({ product: sampleProduct, size: 'M', quantity: 2 }));
        expect(state.itemCount).toBe(3);
        expect(state.items[0].quantity).toBe(3);
    });

    it('updates quantity', () => {
        let state = cartReducer(undefined, addToCart({ product: sampleProduct, size: 'M', quantity: 1 }));
        const id = state.items[0].id;
        state = cartReducer(state, updateQuantity({ id, quantity: 5 }));
        expect(state.itemCount).toBe(5);
        expect(state.total).toBe(50);
    });

    it('removes from cart', () => {
        let state = cartReducer(undefined, addToCart({ product: sampleProduct, size: 'M', quantity: 1 }));
        const id = state.items[0].id;
        state = cartReducer(state, removeFromCart(id));
        expect(state.items.length).toBe(0);
        expect(state.total).toBe(0);
    });
});