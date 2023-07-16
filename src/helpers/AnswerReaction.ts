export const AnswerReaction = (action:"passed" | "failed") => {
  const page = document.getElementById('gamePage');
  if (page) {
    page.style.animation = `none`
    page.style.animation = `${action} .5s forwards`
    setTimeout(() => {
      page.style.animation = `none`
    }, 500)
  }
}