import { START_LOADING ,END_LOADING } from '../types/uiTypes'

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