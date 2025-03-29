module.exports = {
    apps: [{
        script: 'npm',
        args: 'start',
        name: 'expense_manager',
        env: {
            NODE_ENV: 'production',
            PORT: 3028,
        },
        env_file: '.env',
        watch: false,
    }]
};