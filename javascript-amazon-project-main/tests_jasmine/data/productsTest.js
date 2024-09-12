import { products, Product, Appliance, Clothing } from "../../data/products.js";



describe('test suite: Product class', () => {
    let product;
    
    beforeEach(() => {
        product = new Product({
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
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        }); 
    });


    it('check for valid properties and methods', () => {
        expect(product.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");  
        expect(product.priceCents).toEqual(799);      
    });


    it('gets the price', () => {
        expect(product.getPrice()).toEqual('$7.99');
    });


    it('gets rating count and stars', () => {
        expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
    });


    it('does not display extra info', () => {
        expect(product.extraInfoHTML()).toEqual('');
    });
});



describe('test suite: Clothing', () => {
    let clothing;

    beforeEach(() => {
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
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        });
    });


    it('checks for valid properties and methods', () => {
        expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(clothing.sizeChartLink).toEqual("images/clothing-size-chart.png");
        expect(clothing.type).toEqual('clothing');
    });
});



describe('test suite: Appliance class', () => {
    let appliance;

    beforeEach(() => {
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
            type: "appliance",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
        });
    });


    it('check for valid properties and methods', () => {
        expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(appliance.warrantyLink).toEqual('images/appliance-warranty.png');
    });


    it('displays instructions and warranty in extranInfoHTML', () => {
        expect(appliance.extraInfoHTML()).toContain(`<a href="images/appliance-instructions.png" target="_blank">`);
        expect(appliance.extraInfoHTML()).toContain('Instructions');
        expect(appliance.extraInfoHTML()).toContain('Warranty');
    });
});