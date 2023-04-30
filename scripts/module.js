export async function getSwapiData(start, end) {
    try {
        let response = await fetch(`${start}/${end}`, {
            method: 'GET',
        });
        return {
            status: 'success',
            data: response.json(),
        }
    } catch (error) {
        console.error(error)
        return {
            status: 'error',
            data: null
        }
    }
}