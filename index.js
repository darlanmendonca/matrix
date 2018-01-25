module.exports = connectedCell

function connectedCell(matrix) {
  let group = 1
  matrix = matrix.map(array => array.map(value => value == 1 ? 1 : 0))
  matrix.forEach((array, arrayIndex) => {
    array
    .forEach((value, index, array) => {
      if (isValid(value)) {
        let matches = getMatches(arrayIndex, index)
        group++

        if (matches.length) {
          matches.unshift([arrayIndex, index])
          matches.forEach(match => {
            matrix[match[0]][match[1]] = group
          })
        } else {
          matrix[arrayIndex][index] = group
        }
      }
      // else {
      //   matrix[arrayIndex][index] = 0
      // }
      
      function getMatches(currentArray, currentIndex, previousMatches = []) {
        const top = currentArray - 1
        const bottom = currentArray + 1
        const left = currentIndex - 1
        const right = currentIndex + 1
        const topArray = matrix[top] || []
        const bottomArray = matrix[bottom] || []

        let matches  = {
          '→': isValid(matrix[currentArray][right]) ? [currentArray, right] : false,
          '↓': bottomArray && isValid(bottomArray[currentIndex]) ? [bottom, currentIndex] : false,
          '↘': bottomArray && isValid(bottomArray[right]) ? [bottom, right] : false,
          
          '←': isValid(matrix[currentArray][left]) ? [currentArray, left] : false,
          '↖': topArray && isValid(topArray[left]) ? [top, left] : false,
          '↑': topArray && isValid(topArray[currentIndex]) ? [top, currentIndex] : false,
          '↗': topArray && isValid(topArray[right]) ? [top, right] : false,
          
          '↙': bottomArray && isValid(bottomArray[left]) ? [bottom, left] : false,
        }
        
        matches = Object
          .keys(matches)
          .filter(key => matches[key])
          .reduce((obj, key) => {
            const match = matches[key]
            obj.push(match)
            return obj
          }, [])
          .filter(item => !previousMatches.some(n => n[0] === item[0] && n[1] === item[1]))
          .filter(item => !(item[0] === arrayIndex && item[1] === index))

        if (!previousMatches.length) {
          let i = 0
          while (i < matches.length) {
            const match = matches[i]
            const nextMatches = getMatches(match[0], match[1], matches)
            matches.push(...nextMatches)
            i++
          }
        }

        return matches
      }
    })
  })

  const items = matrix.join().split(',').map(Number).filter(Boolean)
  const paths = Array.from(new Set(items))
  const occurrences = paths.map(path => items.filter(item => item === path).length)

  return Math.max(...occurrences)

  function isValid(value) {
    return value === 1
  }
}