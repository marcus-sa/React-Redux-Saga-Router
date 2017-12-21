const sagas = {}

export const addSaga = (props) => sagas[props.component] = props.prefetch

export const hasSaga = (props) => !!sagas[props.component]

export const getSaga = (props) => sagas[props.component]
