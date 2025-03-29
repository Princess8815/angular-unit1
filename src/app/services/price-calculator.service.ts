import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorService {
  private readonly TAX_RATE = 0.08;  // 8% tax rate
  private readonly BULK_DISCOUNT_THRESHOLD = 1000;
  private readonly BULK_DISCOUNT_RATE = 0.1;  // 10% discount

  /**
   * Calculates the final price including tax and potential bulk discount
   * @param basePrice - The base price of the item
   * @param quantity - The number of items
   * @returns The final price after tax and discounts
   * @throws Error if basePrice or quantity is negative
   */
  calculateFinalPrice(basePrice: number, quantity: number): number {
    // Input validation
    if (basePrice < 0 || quantity < 0) {
      throw new Error('Base price and quantity must be non-negative');
    }

    // Calculate subtotal
    let subtotal = basePrice * quantity;

    // Apply bulk discount if applicable
    if (subtotal >= this.BULK_DISCOUNT_THRESHOLD) {
      subtotal = subtotal * (1 - this.BULK_DISCOUNT_RATE);
    }

    // Apply tax
    const finalPrice = subtotal * (1 + this.TAX_RATE);

    // Round to 2 decimal places
    return Number(finalPrice.toFixed(2));
  }
}