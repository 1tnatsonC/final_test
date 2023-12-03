//<!-- Chan Hou Ting Constant (21034774d) & Cheung Kwan Yui (21088966D)-->
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.CONNECTION_STR) {
  console.error('CONNECTION_STR is not defined');
  process.exit(1);
}

const config = {
  CONNECTION_STR: process.env.CONNECTION_STR,
};

export default config;
