export const errorHandler = (res, error) => {

  const {
    status, title=null, ...message
  } = error.response ? error.response : error;

  switch(status) {
    case 400:
      return res.status(400).send({
        title,
        message
      })
    case 401:
      return res.status(401).send({
        title: title || "Authentication Failed",
        message
      })
    case 404:
      return res.status(404).send({
        title: title || "Not Found"  
      })
    default:
      return res.status(500).send({
        title: title || "Internal Server Error"
      })
  }
}
