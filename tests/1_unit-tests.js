const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite( 'Numbers', () => {

      test( 'Normal', (done) => {
        const input = '32L';
        assert.equal(convertHandler.getNum(input), 32);
        done();
      });
  
      test( 'Decimal number', (done) => {
        const input = '1.5km';
        assert.equal(convertHandler.getNum(input), 1.5);
        done();
      });
  
      test( 'Fractional number', ( done ) => {
        const input = '1/2mi';
        assert.equal(convertHandler.getNum( input ), 0.5);
        done();
      });
  
      test( 'Fractional and decimal number', (done) => {
        const input = '4.5/2L';
        assert.equal(convertHandler.getNum(input), 2.25);
        done();
      });
  
      test( 'Invalid number', (done) => {
        const input = '5.5/2/2gal';
        assert.equal(convertHandler.getNum(input), false);
        done();
      });
  
      test( 'No number', (done) => {
        const input = 'lbs';
        assert.equal(convertHandler.getNum(input), 1);
        done();
      } );
      
    });
    
    suite( 'Units', () => {
  
      test( 'All units', (done) => {
        const input = [ 'gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG' ];
        input.forEach( ( el ) => {
          assert.equal( convertHandler.getUnit( el ), el != 'l' && el != 'L' ? el.toLowerCase() : 'L');
        });
        done();
      });
      
      test( 'Unknown Unit', (done) => {
        const input = 'gallons';
        assert.equal(convertHandler.getUnit(input), false);
        done();
      });  
      
    });
    
    suite( 'Return unit', () => {
      
      test( 'All units', ( done ) => {
        const input  = [ 'gal', 'L', 'mi', 'km', 'lbs', 'kg' ];
        const expect = [ 'L', 'gal', 'km', 'mi', 'kg', 'lbs' ];
        input.forEach( (el, i) => {
          assert.equal(convertHandler.getReturnUnit( el ), expect[ i ]);
        });
        done();
      });
  
    });
    
    suite( 'All name', () => {
      
      test( 'All units', ( done ) => {
        const input  = [ 'gal', 'L', 'mi', 'km', 'lbs', 'kg' ];
        const expect = [ 'gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms' ];
        input.forEach( ( el,i ) => {
          assert.strictEqual(convertHandler.spellOutUnit( el ), expect[ i ]);
        });
        done();
      });
  
    });
    
    suite( 'Convert', () => {
  
      test( 'Gal to L', ( done ) => {
        var input = [ 5, 'gal' ];
        var expected = 18.9271;
        assert.approximately(
          convertHandler.convert( input[0], input[1] ),
          expected,
          0.2
        );
        done();
      });
  
      test( 'L to Gal', ( done ) => {
        var input = [ 6, 'L' ];
        var expected = 1.58503;
        assert.approximately(
          convertHandler.convert( input[0], input[1] ),
          expected,
          0.2
        );
        done();
      });
  
      test( 'Mi to Km', ( done ) => {
        var input = [ 10, 'mi' ];
        var expected = 16.0934;
        assert.approximately(
          convertHandler.convert( input[0], input[1] ),
          expected,
          0.2
        );
        done();
      });
  
      test( 'Km to Mi', ( done ) => {
        var input = [ 5/2, 'km' ];
        var expected = 1.55343;
        assert.approximately(
          convertHandler.convert( input[0], input[1] ),
          expected,
          0.2
        );
        done();
      });
  
      test( 'Lbs to Kg', ( done ) => {
        var input = [ 1, 'lbs' ];
        var expected = 0.453592;
        assert.approximately(
          convertHandler.convert( input[0], input[1] ),
          expected,
          0.2
        );
        done();
      });
  
      test( 'Kg to Lbs', ( done ) => {
        var input = [ 6.3/2, 'kg' ];
        var expected = 6.944561;
        assert.approximately(
          convertHandler.convert( input[0], input[1] ),
          expected,
          0.2
        );
        done();
      });
      
    });
});