import { getProductsreducer } from "./ProductReducer";
import {combineReducers} from 'redux'

const rootreducers = combineReducers({
    getproductsdata: getProductsreducer
})

export default rootreducers;