import { loadData } from '../src/lib/loadData.js';

const data = loadData();

console.log('Loaded content:');
console.log(`  profile:    1`);
console.log(`  experience: ${data.experience.length}`);
console.log(`  projects:   ${data.projects.length}`);
console.log(`  skills:     ${data.skills.length}`);
