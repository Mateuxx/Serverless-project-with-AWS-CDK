exports.main = async function (event, context) {
    return {
        statuscode: 200,
        body:JSON.stringify("Hello from lambda!")
    }
}
