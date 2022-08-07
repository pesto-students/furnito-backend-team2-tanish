import dotenv from 'dotenv-safe';
import add from '@src/math/math';

dotenv.config();

console.log(add(1, 9));
console.log(process.env.MY_NAME);
