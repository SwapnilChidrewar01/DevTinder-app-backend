const auth = (req, res, next) => {
    const token ="swapnilpo"
    if(token === 'swapnil'){
        next()
    }else{
        res.status(401).send('You are not authorized')
    }
}

module.exports = auth