import { MenuDataItem } from '@ant-design/pro-layout';
import { AnyAction } from 'redux';
import { RouterTypes } from 'umi';

import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { ArticleModelState } from './article';
import { CategoryModelState } from './category';
import { GlobalModelState } from './global';
import { LoginModelState } from './login';
import { UserModelState } from './user';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
    global: boolean;
    effects: { [key: string]: boolean | undefined };
    models: {
        global?: boolean;
        menu?: boolean;
        setting?: boolean;
        user?: boolean;
        login?: boolean;
        article?: boolean;
        category?: boolean;
    };
}

export interface ConnectState {
    global: GlobalModelState;
    loading: Loading;
    settings: SettingModelState;
    user: UserModelState;
    login: LoginModelState;
    article: ArticleModelState;
    category: CategoryModelState;
}

export interface Route extends MenuDataItem {
    routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
    dispatch?: Dispatch<AnyAction>;
}
