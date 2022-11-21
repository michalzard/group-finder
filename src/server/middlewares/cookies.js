function cookieCheck(req, res, next) {
  if (req.headers.cookie) {
    next();
  } else res.status(401).send({ message: "Unauthorized" });
}

module.exports={
    cookieCheck,
}