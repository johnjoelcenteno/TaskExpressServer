exports.RouteNotFoundMiddleware = (req, res, next) => {
    res.status(404).send({
        success: false,
        message: "Endpoint not found",
    });
}