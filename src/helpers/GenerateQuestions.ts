const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export const GenerateQuestions = () => {
  // Generate first number
  const firstNumber = numberGenerator(Math.round(Math.random()) + 1)
  // Choose operation
  const operations = ["+", "-", "x"]
  const operation = operations[Math.round(Math.random() * (operations.length - 1))]
  // Generate second number
  let secondNumber
  if (operation === "x") {
    secondNumber = numberGenerator(1)
  } else {
    secondNumber = numberGenerator(Math.round(Math.random()) + 1)
  }
  // Question pack ready
  const questionPack = {
    firstNumber,
    operation,
    secondNumber
  }
  // Get answer
  const answer = getAnswer(questionPack) 
  return {
    ...questionPack,
    answer
  }
}

const numberGenerator = (length:number) => {
  let number;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.round(Math.random() * (numbers.length - 1))
    number = 10**i + numbers[randomIndex]
  }
  return number;
}

const getAnswer = (questionPack:any) => {
  const {firstNumber, operation, secondNumber} = questionPack;
  if (operation === "+") {
    return firstNumber + secondNumber
  } else if (operation === "-") {
    return firstNumber - secondNumber
  } else if (operation === "x") {
    return firstNumber * secondNumber
  } else {}
}