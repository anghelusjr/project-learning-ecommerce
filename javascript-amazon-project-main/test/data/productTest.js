import { products, Product, Clothing, Appliance } from '../../data/products.js';
import {formatCurrency} from '../../scripts/utils/money.js';


describe('Test Suite: For Product Class properties and methods', () =>{

let product;

  beforeEach(() =>{
    product = new Product({
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        image: "images/products/black-2-slot-toaster.jpg",
        name: "2 Slot Toaster - Black",
        rating: {
          stars: 5,
          count: 2197
        },
        priceCents: 1899,
        keywords: [
          "toaster",
          "kitchen",
          "appliances"
        ],
        type: 'appliance',
        instructionLink: "images/appliance-instructions.png",
        warrantyLink: "images/appliance-warranty.png"
      })

      product.keywords = ['toaster', 'kitchen', 'appliances'];
      product.type = 'appliance';
      product.instructionLink = "images/appliance-instructions.png";
      product.warrantyLink = "images/appliance-warranty.png";
  })


  it('getting the Product class informations', () => {
    expect(product.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(product.image).toEqual('images/products/black-2-slot-toaster.jpg');
    expect(product.name).toEqual('2 Slot Toaster - Black');
    expect(product.rating.stars).toEqual(5);
    expect(product.rating.count).toEqual(2197);
    expect(product.priceCents).toEqual(1899);
    expect(product.keywords).toContain('kitchen');
    expect(product.keywords.length).toBe(3);
    expect(product.type).toEqual('appliance');
    expect(product.instructionLink).toEqual('images/appliance-instructions.png');
    expect(product.warrantyLink).toEqual('images/appliance-warranty.png');
  });

  it('should return the correct stars image URL ', () =>{
    expect(product.getStarsUrl()).toEqual('images/ratings/rating-50.png');
  })
  it('should format cents', () =>{
    expect(product.getPrice()).toEqual('$18.99');
  })
  it('the code is for showing Blank HTML', ()=>{
    expect(product.extraInfoHtml()).toEqual('');
  })
});
describe('Test Suited: Clothing Class child properties and methods', () =>{
  let clothing;

  beforeEach(() =>{
        clothing = new Clothing({
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
          stars: 4.5,
          count: 56
        },
        priceCents: 799,
        keywords: [
          "tshirts",
          "apparel",
          "mens",
          'coton'
        ],
        type: "clothing",
        sizeChartLink: "images/clothing-size-chart.png"
      })
      clothing.keywords = [  "tshirts","apparel","mens", 'coton'];
      clothing.type = "clothing";
      clothing.sizeChartLink = "images/clothing-size-chart.png";
  })


  



  it('extended class - Clothing getting all information', ()=>{
    expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(clothing.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
    expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(clothing.rating.stars).toEqual(4.5);
    expect(clothing.rating.count).toEqual(56);
    expect(clothing.priceCents).toEqual(799);
    expect(clothing.keywords).toContain('apparel');
    expect(clothing.keywords).toContain('apparel');
    expect(clothing.keywords.length).toBe(4);
    expect(clothing.type).toEqual('clothing');
    expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
  })

  it('child class for overriding methods of Products extraInfoHTML', () => {
    expect(clothing.extraInfoHtml()).toContain('<a href="images/clothing-size-chart.png" target="_blank">Size Chart</a>');
  })
})
describe('Test Suited: Appliance Class child properties and methods', () =>{
  let appliance;

  beforeEach(() =>{
        appliance = new Appliance({
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        image: "images/products/black-2-slot-toaster.jpg",
        name: "2 Slot Toaster - Black",
        rating: {
          stars: 5,
          count: 2197
        },
        priceCents: 1899,
        keywords: [
          "toaster",
          "kitchen",
          "appliances"
        ],
        type: 'appliance',
        instructionLink: "images/appliance-instructions.png",
        warrantyLink: "images/appliance-warranty.png"
      })

        appliance.keywords = ["toaster","kitchen","appliances"];
        appliance.type = 'appliance';
        appliance.instructionLink = "images/appliance-instructions.png";
        appliance.warrantyLink = "images/appliance-warranty.png";
  })  


  it('extended class - Appliance getting all information', ()=>{
    expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(appliance.image).toEqual('images/products/black-2-slot-toaster.jpg');
    expect(appliance.name).toEqual('2 Slot Toaster - Black');
    expect(appliance.rating.stars).toEqual(5);
    expect(appliance.rating.count).toEqual(2197);
    expect(appliance.priceCents).toEqual(1899);
    expect(appliance.keywords).toContain('appliances');
    expect(appliance.keywords.length).toBe(3);
    expect(appliance.type).toEqual('appliance');
    expect(appliance.instructionLink).toEqual('images/appliance-instructions.png');
    expect(appliance.warrantyLink).toEqual('images/appliance-warranty.png');
  })

  it('Appliance child class for overriding extraInfoHTML', () => {
    expect(appliance.extraInfoHtml()).toContain(`
      <a href="images/appliance-instructions.png" target="_blank">Instruction</a>
      <a href="images/appliance-warranty.png" target="_blank">Warranty</a>
    `);
  })
})