import component from './en-US/component';
import footer from './en-US/footer';
import menu from './en-US/menu';
import request from './en-US/request';
import settingDrawer from './en-US/settingDrawer';

export default {
    'navBar.lang': 'Languages',
    'layout.user.link.help': 'Help',
    'layout.user.link.privacy': 'Privacy',
    'layout.user.link.terms': 'Terms',
    'app.preview.down.block': 'Download this page to your local project',
    'app.welcome.link.fetch-blocks': 'Get all block',
    'app.welcome.link.block-list':
        'Quickly build standard, pages based on `block` development',
    ...component,
    ...footer,
    ...menu,
    ...request,
    ...settingDrawer
};
