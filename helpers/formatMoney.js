function formatMoney(num){
    const str = num.toString().split('').reverse()
    const len = str.length
    const result = []
    for(let i = 0; i < len; i++){
        result.push(str[i])
        if( (i+1) % 3 === 0 && i !== len-1){
            result.push('.')
        }
    }
    return `Rp ${result.reverse().join('')},00`
}
module.exports = formatMoney