module.exports = {
    verbose: true,
    options: {remote: false, persistent: true},
    plugins: {
        local: {
            browsers: ['chrome']
        },
        sauce: {
            disabled: true
        }
    },
    suites:      ['test/save-card-test.html']
};