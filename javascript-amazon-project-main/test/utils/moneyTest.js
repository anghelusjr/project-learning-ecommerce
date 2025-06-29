import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: standard formatcurrency', () =>{
  it('convert cents to dollars', () =>{
    expect(formatCurrency(2095)).toEqual('20.95');
  })
  it('with 0', () =>{
    expect(formatCurrency(0)).toEqual('0.00');
  })

});
  