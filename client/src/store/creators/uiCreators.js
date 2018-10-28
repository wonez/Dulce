import { START_LOADING ,END_LOADING, SHOW_CONFIRM_DIALOG, HIDE_CONFIRM_DIALOG } from '../types/uiTypes'

export const startLoading = () => {
    return {
        type: START_LOADING
    }
}

export const endLoading = () => {
    return {
        type: END_LOADING
    }
}

export const showConfirmDialog = () => {
    return {
        type: SHOW_CONFIRM_DIALOG
    }
}

export const hideConfirmDialog = () => {
    return {
        type: HIDE_CONFIRM_DIALOG
    }
}

