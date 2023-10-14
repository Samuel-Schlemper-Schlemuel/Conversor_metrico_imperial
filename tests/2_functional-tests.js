const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Status', (done) => {
        chai
        .request(server)
        .get('/api/convert?input=5L')
        .end((err, res) => {
            assert.equal(res.status, 200)
            done()
        })
    })

    test('Entrada válida', (done) => {
        chai
        .request(server)
        .get('/api/convert?input=5L')
        .end((err, res) => {
            assert.equal(res.text, '{"initNum":5,"initUnit":"L","returnNum":1.32086,"returnUnit":"gal","string":"5 liters converts to 1.32086 gallons"}')
            done()
        })
    })

    test('Entrada inválida (unidade)', (done) => {
        chai
        .request(server)
        .get('/api/convert?input=38ml')
        .end((err, res) => {
            assert.equal(res.text, '"invalid unit"')
            done() 
        })
    })

    test('Entrada inválida (número)', (done) => {
        chai
        .request(server)
        .get('/api/convert?input=3/4/5gal')
        .end((err, res) => {
            assert.equal(res.text, '"invalid number"')
            done() 
        })
    })

    test('Entrada inválida (número e unidade)', (done) => {
        chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end((err, res) => {
            assert.equal(res.text, '"invalid number and unit"')
            done() 
        })
    })

    test('Sem número', (done) => {
        chai
        .request(server)
        .get('/api/convert?input=mi')
        .end((err, res) => {
            assert.equal(res.text, '{"initNum":1,"initUnit":"mi","returnNum":1.60934,"returnUnit":"km","string":"1 miles converts to 1.60934 kilometers"}')
            done() 
        })
    })
});
