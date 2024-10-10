const config = {
    user: 'sa',
    password: 'sa',
    server: '192.168.1.2',
    database: 'Student_Management',
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCirtificate: true
    },

    port: 1433
}

module.exports = config; 

