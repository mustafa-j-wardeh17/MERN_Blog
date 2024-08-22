


export const PageNotFound = (req, res, next) => {
    const error = new Error(`Page with url ${req.originalUrl} does not found`)
    res.status(404)
    next(error)
}

export const ErrorHandler = (error,req,res,next)=>{
    let codeStatus = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(codeStatus).json({err:error.message})
}