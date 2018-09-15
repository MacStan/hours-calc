const common = require('../js/common.js');
const momentModule = require('../moment/moment.min.js')
test('Converts 3,600,000 miliseconds to 1 hour', () => {
  expect(common.hoursFromMicroseconds(60 * 60 * 1000)).toBe(1);
});

test('Converts 3 * 3,600,000 miliseconds to 3 hours', () => {
  expect(common.hoursFromMicroseconds(3 * 60 * 60 * 1000)).toBe(3);
});

test('Converts 3 * 3,600,000 miliseconds to 3 hours', () => {
  expect(common.hoursFromMicroseconds(3 * 60 * 60 * 1000)).toBe(3);
});

test('Testing start of week', () => {
  let model = new Date(2018,7,19);
  let example = new Date( Date.UTC(2018,7,21,21,9,0,0) );


  expect(common.getSundayDate( example ) ).toEqual (model );
});

test('Testing start of next week', () => {
  let model = new Date(2018,7,26);
  let example = new Date(2018,7,21,21,9,0,0);
  expect(common.getNextSundayDate( example ) ).toEqual (model );
});


test('Testing offset of minus one week: start of week', () => {
  let model = new Date(2018,7,12);
  let example =new Date(2018,7,14,21,9,0,0);

  expect(common.getSundayDate( example, -1 ) ).toEqual (model );
});

test('Testing offset of minus one week: start of next week', () => {
  let model = new Date(2018,7,19);
  let example = new Date(2018,7,14,21,9,0,0);
  expect(common.getNextSundayDate( example, -1 ) ).toEqual (model );
});

test('Testing offset of plus one week: start of week', () => {
  let model = new Date(2018,7,26);
  let example =new Date(2018,7,14,21,9,0,0);
  expect(common.getSundayDate( example, 1 ) ).toEqual (model );
});

test('Testing offset of plus  one week: start of next week', () => {
  let model = new Date(2018,8,2);
  let example = new Date(2018,7,14,21,9,0,0);
  expect(common.getNextSundayDate( example, 1 ) ).toEqual (model );
});

test( 'Test getting next dates', () => {
  expect(common.getNextDate(new Date(2018,0,1), 1) ).toEqual( new Date(2018,0,2));
  expect(common.getNextDate(new Date(2018,0,1), 11) ).toEqual( new Date(2018,0,12));
  expect(common.getNextDate(new Date(2018,0,1), 21) ).toEqual( new Date(2018,0,22));
  expect(common.getNextDate(new Date(2018,0,1), 31) ).toEqual( new Date(2018,0,32));
});
