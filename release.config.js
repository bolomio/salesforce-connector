module.exports = {
    branches: [
        {
            name: 'main',
        },
        {
            name: 'beta/*',
            prerelease: `\${name.replace(/beta\\/(.*)/g, 'beta-$1')}`,
        },
    ],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                releaseRules: [
                    {
                        type: 'chore',
                        release: 'patch',
                    },
                    {
                        type: 'refactor',
                        release: 'patch',
                    },
                ],
            },
        ],
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        '@semantic-release/github',
        '@semantic-release/npm',
        [
            '@semantic-release/git',
            {
                assets: [
                    'CHANGELOG.md',
                    'package.json',
                    'package-lock.json',
                    'yarn.lock',
                    'README.md',
                ],
                message: 'chore(release): ${nextRelease.version}',
            },
        ],
    ],
}
