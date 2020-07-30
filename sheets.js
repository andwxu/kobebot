const {google} = require('googleapis');

const SPREADSHEET_ID = '1ZC3VPet1mlaS05jTpDvHrgOUIerWXbcM3aDo-fJkx1A';

function write(auth, size) {
    const sheets = google.sheets({version: 'v4', auth});
    return new Promise( (resolve, reject) => {
        sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            auth,
            insertDataOption: 'INSERT_ROWS',
            resource: {values: [[size]]},
            range: 'Sheet1!A1',
            valueInputOption: 'RAW'
        }, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else resolve('success!');
        })
    });
}

module.exports = {
    write,
}