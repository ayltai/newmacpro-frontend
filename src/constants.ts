import { Package, } from './types';

export const API_MAX_RETRIES           = 5;
export const HOMEBREW_REFRESH_INTERVAL = 1000 * 60 * 60 * 18;
export const TWEAKS_REFRESH_INTERVAL   = 1000 * 60 * 60 * 48;
export const BUNDLES_REFRESH_INTERVAL  = 1000 * 60 * 60 * 4;
export const MIN_SEARCH_LENGTH         = 2;
export const SEARCH_FUZZINESS          = 0.2;
export const SEARCH_MAX_RESULTS        = 50;

export const POPULAR_APPS : Package[] = [
    {
        id          : 'google-chrome',
        displayName : 'Google Chrome',
        description : 'Download the new Google Chrome for your iPhone and iPad. Now more simple, secure and faster than ever. Get the best of Google Search, and easily sync your bookmarks and passwords with Chrome on your laptop. Download the fast, secure browser recommended by Google.',
        source      : 'Homebrew/cask',
    },
    {
        id          : 'spotify',
        displayName : 'Spotify',
        description : 'With the Spotify music and podcast app, you can play millions of songs, albums and original podcasts for free. Stream music and podcasts, discover albums, playlists or even single songs for free on your mobile or tablet. Subscribe to Spotify Premium to download and listen offline wherever you are.',
        source      : 'Homebrew/cask',
    },
    {
        id          : 'alfred',
        displayName : 'Alfred',
        description : 'Alfred is an award-winning app for macOS which boosts your efficiency with hotkeys, keywords, text expansion and more. Search your Mac and the web, and be more productive with custom actions to control your Mac.',
        source      : 'Homebrew/cask',
    },
    {
        id          : 'visual-studio-code',
        displayName : 'Visual Studio Code',
        description : 'Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.',
        source      : 'Homebrew/cask',
    },
    {
        id          : 'microsoft-office',
        displayName : 'Microsoft 365 for Mac',
        description : 'Office for Mac with Microsoft 365, gives you power and flexibility to get things done from virtually anywhere.',
        source      : 'Homebrew/cask',
    },
    {
        id          : 'notion',
        displayName : 'Notion',
        description : 'Notion is the connected workspace where better, faster work happens. Now with AI',
        source      : 'Homebrew/cask',
    },
    {
        id          : 'fantastical',
        displayName : 'Fantastical',
        description : 'Fantastical, the calendar app you won\'t be able to live without. Quickly create new events and reminders with natural language input and more.',
        source      : 'Homebrew/cask',
    },
    {
        id          : 'gimp',
        displayName : 'GIMP',
        description : 'GIMP is a cross-platform image editor available for GNU/Linux, macOS, Windows and more operating systems. It is free software, you can change its source code and distribute your changes.',
        source      : 'Homebrew/cask',
    },
    {
        id          : 'bartender',
        displayName : 'Bartender',
        description : 'Bartender is an award-winning app for macOS that superpowers your menu bar, giving you total control over your menu bar items, what\'s displayed, and when, with menu bar items only showing when you need them. Bartender improves your workflow with quick reveal, search, custom hotkeys and triggers, and lots more.',
        source      : 'Homebrew/cask',
    },
    {
        id          : '1password',
        displayName : '1Password',
        description : 'A password manager, digital vault, form filler and secure digital wallet. 1Password remembers all your passwords for you to help keep account information safe.',
        source      : 'Homebrew/cask',
    },
];

export const POPULAR_PACKAGES : Package[] = [
    {
        id          : 'node',
        displayName : 'Node.js',
        description : 'Node.js® is an open-source, cross-platform JavaScript runtime environment.',
        source      : 'Homebrew/core',
    },
    {
        id          : 'git',
        displayName : 'Git',
        description : 'Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. ',
        source      : 'Homebrew/core',
    },
    {
        id          : 'wget',
        displayName : 'Wget',
        description : 'GNU Wget is a free software package for retrieving files using HTTP, HTTPS, FTP and FTPS, the most widely used Internet protocols. It is a non-interactive commandline tool, so it may easily be called from scripts, cron jobs, terminals without X-Windows support, etc.',
        source      : 'Homebrew/core',
    },
    {
        id          : 'python3',
        displayName : 'Python 3',
        description : 'Python is a programming language that lets you work quickly and integrate systems more effectively.',
        source      : 'Homebrew/core',
    },
    {
        id          : 'awscli',
        displayName : 'AWS CLI',
        description : 'The AWS Command Line Interface (CLI) is a unified tool to manage your AWS services.',
        source      : 'Homebrew/core',
    },
    {
        id          : 'cmake',
        displayName : 'CMake',
        description : 'CMake is an open-source, cross-platform family of tools designed to build, test and package software.',
        source      : 'Homebrew/core',
    },
    {
        id          : 'maven',
        displayName : 'Maven',
        description : 'Maven is a build automation tool used primarily for Java projects.',
        source      : 'Homebrew/core',
    },
    {
        id          : 'jq',
        displayName : 'jq',
        description : 'jq is a lightweight and flexible command-line JSON processor.',
        source      : 'Homebrew/core',
    },
    {
        id          : 'docker',
        displayName : 'Docker',
        description : 'Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.',
        source      : 'Homebrew/core',
    },
    {
        id          : 'htop',
        displayName : 'htop',
        description : 'htop is an interactive process viewer for Unix systems.',
        source      : 'Homebrew/core',
    },
];

export const POPULAR_TWEAKS : Package[] = [
    {
        id          : 'tweak_macos_keep_windows',
        displayName : 'Always keep windows',
        description : 'macOS can remember all the tabs and windows you had open for the next time you launch it again.',
        source      : 'Tweak',
    },
    {
        id          : 'tweak_macos_show_hidden_files',
        displayName : 'Show hidden files in Finder',
        description : 'By default, macOS hides hidden files in Finder. This tweak disables this behavior.',
        source      : 'Tweak',
    },
    {
        id          : 'tweak_macos_disable_itunes_media_keys',
        displayName : 'Disable iTunes media keys',
        description : 'If you have iTunes installed, when you press Play on the keyboard, or connect the headset and Bluetooth speaker, iTunes will automatically run. This tweak disables this behavior.',
        source      : 'Tweak',
    },
    {
        id          : 'tweak_macos_subpixel_font_rendering',
        displayName : 'Change subpixel font rendering on external monitors',
        description : 'If you are running macOS on a Mac without a retina display, or with an external monitor that does not have an ultra-high resolution screen, you may have noticed that some fonts and text can appear as blurry and difficult to read. This is because macOS is rendering the text using subpixel font rendering.',
        source      : 'Tweak',
    },
    {
        id          : 'tweak_macos_disable_photos_auto_open',
        displayName : 'Disable Photos from opening automatically',
        description : 'macOS automatically opens Photos every time you insert a memory card or connect a device. This tweak disables this behavior.',
        source      : 'Tweak',
    },
    {
        id          : 'tweak_macos_show_file_extensions',
        displayName : 'Show file extensions in Finder',
        description : 'By default, macOS hides file extensions in Finder. This tweak disables this behavior.',
        source      : 'Tweak',
    },
    {
        id          : 'tweak_macos_disable_smart_quotes',
        displayName : 'Disable smart quotes',
        description : 'macOS automatically converts straight quotes to smart quotes. But for developers, it\'s annoying to have to manually change them back. This tweak disables this behavior.',
        source      : 'Tweak',
    },
    {
        id          : 'tweak_macos_disable_smart_dashes',
        displayName : 'Disable smart dashes',
        description : 'macOS automatically converts straight dashes to smart dashes. But for developers, it\'s annoying to have to manually change them back. This tweak disables this behavior.',
        source      : 'Tweak',
    },
];

type Document = {
    title   : string,
    docPath : string,
};

export const DOCUMENTS : Document[] = [
    {
        title   : 'footer.disclaimer',
        docPath : '/docs/disclaimer.md',
    },
    {
        title   : 'footer.privacy',
        docPath : '/docs/privacy.md',
    },
    {
        title   : 'footer.terms',
        docPath : '/docs/terms.md',
    },
];
