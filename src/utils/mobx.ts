import React from 'react';
import { MobXProviderContext } from 'mobx-react';

export function useStores(): mobx.Store {
    return React.useContext(MobXProviderContext) as mobx.Store;
}
