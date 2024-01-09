const fs = require('fs');
const path = require('path');

const file = path.resolve(__filename);

try {
    const fileStats = fs.statSync(file);
    const fileDetails = {size: fileStats.size, birthTime: fileStats.birthtime, modificationTime: fileStats.mtime};

    const fileDetailsTableData = [
        {Attribute: 'Birth Time', Value: fileDetails.birthTime},
        {Attribute: 'Modification Time', Value: fileDetails.modificationTime},
        {Attribute: 'Size', Value: `${fileDetails.size} bytes`}
    ];

    console.table(fileDetailsTableData);
} catch (err) {
    console.error(`Error reading file '${file}'`);
}
