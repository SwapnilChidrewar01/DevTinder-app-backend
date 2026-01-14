const userauth = (req, res, next) => {
    const token = "swapnil"
    if(token === 'swapniliu'){
        next()
    }else{
        res.status(401).send('You are not authorized')
    }
}
module.exports = userauth
