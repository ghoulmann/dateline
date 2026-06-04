import { resolveLocation } from '../src/api/geocode.js';

console.log(resolveLocation({title:'US strikes Iran in overnight attack', sourcecountry:''}));
console.log(resolveLocation({title:'US conducts airstrike near Tehran', sourcecountry:''}));
console.log(resolveLocation({title:'US reports from Washington says strike', sourcecountry:'US'}));
