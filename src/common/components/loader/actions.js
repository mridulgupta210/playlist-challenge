export const SHOW_PROGRESS = 'SHOW_PROGRESS';
export const HIDE_PROGRESS = 'HIDE_PROGRESS';

export const showProgress = () => {
    return {
        type: SHOW_PROGRESS
    };
};

export const hideProgress = () => {
    return {
        type: HIDE_PROGRESS
    };
};
