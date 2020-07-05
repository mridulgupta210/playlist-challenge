import { SHOW_PROGRESS, HIDE_PROGRESS } from './actions.js';

const loaderInitialState = {
    showLoader: false,
    loaderCount: 0
};

export const loader = (state = loaderInitialState, action) => {
    switch (action.type) {
        case SHOW_PROGRESS:
            return Object.assign({}, state, {
                showLoader: true,
                loaderCount: state.loaderCount + 1
            });
        case HIDE_PROGRESS: {
            const loaderCount = state.loaderCount - 1;
            return Object.assign({}, state, {
                showLoader: loaderCount > 0,
                loaderCount: loaderCount <= 0 ? 0 : loaderCount
            });
        }
        default:
            return state;
    }
};
