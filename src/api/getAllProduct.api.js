const URL = 'http://localhost:8888/product/getAllProduct/'

const getAllProduct = (pageNumber, setProductData, setServerError, setLoading) => {
    fetch(`${URL}${pageNumber}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.message === 'success') {
                setProductData(responseJson.product)
            } else {
                setServerError(responseJson.message)
                setLoading(false)
            }
        })
        .catch((error) => {
            setServerError(error.message)
            setLoading(false)
        });
}

export default getAllProduct;
