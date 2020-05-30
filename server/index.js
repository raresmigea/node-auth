import { listen } from './app';

// Start the server
const port = process.env.PORT || 5000;
listen(port);
console.log(`Server listening at ${port}`);

// refactored code for easier test and feature scale
