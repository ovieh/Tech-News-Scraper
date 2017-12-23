const request = require('supertest');
describe('loading express', () => {
	let server;
	beforeEach( () => server = require('../server'));
	afterEach( () => server.close());

	it('repsonds to /', function testSlash(done) {
		request(server)
			.get('/')
			.expect(200, done)
	});
	it('404 everything else', function testPath(done) {
		request(server)
			.get('/foo/bar')
			.expect(404, done);
	});
});