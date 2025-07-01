/* global cy, describe, it */
describe('Smoke: add to cart flow', () => {
    it('adds first product to cart and reaches checkout page', () => {
        cy.visit('/products');
        // Wait for products to load
        cy.get('[data-hover="card"]').first().click();
        cy.contains('Add').click();

        cy.visit('/cart');
        cy.contains('Proceed to Checkout').click();

        cy.url().should('include', '/checkout');
    });
});