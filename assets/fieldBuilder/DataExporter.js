export function saveExportJson(data, fileName, path = 'assets/data', rewriteExist = false) {
    if (data && fileName) {
        const fs = require('fs');
        const fs_path = require('path');

        const dirToSave = fs_path.join(Editor.Project.path, path);
        if (!fs.existsSync(dirToSave)) {
            fs.mkdirSync(dirToSave);
        }

        if (!rewriteExist) {
            let existTries = 0;
            while (fs.existsSync(fs_path.join(dirToSave, `${fileName}.json`))) {
                fileName = `${fileName}_${++existTries}`;
            }
        }

        fs.writeFileSync(fs_path.join(dirToSave, `${fileName}.json`), JSON.stringify(data, null, 2));
        Editor.assetdb.refresh(`db://${path}`);

        cc.log(`Done! File '${fileName}.json' was saved to '${path}' folder.`);
    }
}