export const handleError = async (result: Promise<unknown>, success_message: string, error_message: string) => {
    const result_state = await result
    console.log(result_state)
    if (result_state) {
        console.log(success_message)
    }

    if (!result_state) {
        console.log(error_message)
        throw Error
    }
}