'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');
const expect = require('expect.js');

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });
    describe("Test Ride Endpoint", () => {
        const dummyRide = {
            "start_lat": 12,
            "start_long": 20,
            "end_lat": 30,
            "end_long": -30,
            "rider_name": "some-rider",
            "driver_name": "some-driver-name",
            "driver_vehicle": "super-car"
        }
        describe('POST /rides', () => {
            it('should return health', (done) => {
                request(app)
                    .post('/rides')
                    .send(dummyRide)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        return done();
                    });
            });
        });
        describe('GET /rides', () => {
            it('should return health', (done) => {
                request(app)
                    .get('/rides')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then(response => {
                        expect(response.body).to.have.length(1)
                        done();
                    })
                    .catch(err => done(err))
            });
        });
    })

});