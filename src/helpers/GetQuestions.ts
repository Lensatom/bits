
export const GetQuestions = (number:number) => {
  let questions = [];
  for (let i = 0; i < number; i++) {
    questions.push(generateQuestion())
  }
  return questions;
}

const generateQuestion = () => {
  // Get random length and generate number with the length
  const firstNumberLength = Math.round(Math.random() + 1)
  const firstNumber = numberGenerator(firstNumberLength)
  // Get operation operator
  const operator = operatorGenerator()
  // secondNumber length is one if firstNumber length is 2 and operator is 'x' 
  const secondNumberLength = firstNumberLength == 2 && operator == 'x' ? 1 : Math.round(Math.random() + 1);
  const secondNumber = numberGenerator(secondNumberLength)
  // Generate answer to operation
  const answer = answerGenerator(firstNumber, operator, secondNumber)
  
  // Return object with all
  return {
    firstNumber,
    operator,
    secondNumber,
    answer
  }
}

const numberGenerator = (length:number) => {
  let number = Math.round(Math.random() * 9)
  if (length == 1) {
    return number
  } else {
    number = number * 10 + Math.round(Math.random() * 9)
    return number;
  }
}

const operatorGenerator = () => {
  const operators = ["+", "-", "x"]
  const operator = operators[Math.round(Math.random() * (operators.length - 1))]
  return operator
}

const answerGenerator = (firstNumber:number, operator:string, secondNumber:number) => {
  if (operator === "+") {
    return firstNumber + secondNumber
  } else if (operator === "-") {
    return firstNumber - secondNumber
  } else if (operator === "x") {
    return firstNumber * secondNumber
  }
}