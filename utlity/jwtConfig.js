module.exports = {
    secret: 'statijaznamotokenima',
    refreshSecret: 'statijaznamotorefreshkenima',
    expiresIn: 1000 * 60 * 15, // 15min
    refreshExpiresIn: 1000 * 60 * 60 * 24 * 7 // 7 days
}