const fs = require('fs');

fs.readdir('./', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    } else {
        console.log('File contents:', data);
    }
}   );