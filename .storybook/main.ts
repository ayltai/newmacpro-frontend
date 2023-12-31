import type { StorybookConfig, } from '@storybook/react-webpack5';

const config : StorybookConfig = {
    stories    : [
        '../src/**/*.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons     : [
        '@storybook/addon-essentials',
        '@storybook/addon-styling',
        '@storybook/preset-create-react-app',
        {
            name    : '@storybook/addon-styling',
            options : {
            },
        },
    ],
    framework  : {
        name    : '@storybook/react-webpack5',
        options : {
        },
    },
    docs       : {
        autodocs : 'tag',
    },
    staticDirs : [
        '../public',
    ],
};
export default config;
