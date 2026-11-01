function checkTokenExpired(exp) {
    return (exp*1000 <= Date.now());
}

export default checkTokenExpired;