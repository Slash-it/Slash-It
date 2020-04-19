function isInsideFrame(x_obj, y_obj, frameWidth, frameHeight){
    if( (x_obj <= frameWidth && y_obj <= frameHeight) && (x_obj>=0 && y_obj >= 0) ){
        return true
    }

    return false
}

export default isInsideFrame