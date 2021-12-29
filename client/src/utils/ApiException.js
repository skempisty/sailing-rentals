export default class ApiException extends Error {
    constructor(message, res) {
        super()
        this.name = 'ApiException'
        this.message = message
        this.status = res.status
        this.response = res
    }
}
