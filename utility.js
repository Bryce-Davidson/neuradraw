utility = {
    /**
     * If any element of arr2 is in arr1
     * 
     * @param {Array} arr1 - the array to search through
     * @param {Array} arr2 - the array that contains elements to look for
     */
    includes_any(arr1, arr2) {
        return arr2.some(k => arr1.includes(k));
    }
}