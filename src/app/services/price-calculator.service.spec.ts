import { TestBed } from '@angular/core/testing';
import { PriceCalculatorService } from './price-calculator.service';

describe('PriceCalculatorService', () => {
  let service: PriceCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate price with tax for multiple items below discount threshold', () => {
    const basePrice = 100;
    const quantity = 5;
    const expected = Number((100 * 5 * 1.08).toFixed(2));
    const result = service.calculateFinalPrice(basePrice, quantity);
    expect(result).toBe(expected);
  });

  it('should apply bulk discount when subtotal exceeds threshold', () => {
    const basePrice = 250;
    const quantity = 5; // 250 * 5 = 1250
    const discounted = 1250 * 0.9;
    const expected = Number((discounted * 1.08).toFixed(2));
    const result = service.calculateFinalPrice(basePrice, quantity);
    expect(result).toBe(expected);
  });

  it('should throw error if base price is negative', () => {
    expect(() => service.calculateFinalPrice(-50, 2)).toThrowError('Base price and quantity must be non-negative');
  });

  it('should throw error if quantity is negative', () => {
    expect(() => service.calculateFinalPrice(50, -2)).toThrowError('Base price and quantity must be non-negative');
  });

  it('should round result to 2 decimal places', () => {
    const basePrice = 333.333;
    const quantity = 1;
    const expected = Number((333.333 * 1.08).toFixed(2));
    const result = service.calculateFinalPrice(basePrice, quantity);
    expect(result).toBe(expected);
  });
});

