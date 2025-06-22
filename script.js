const form = document.querySelector('.form')
const cards = document.getElementById('recipes')

const entries = JSON.parse(localStorage.getItem('entriesRecipe')) || []

createCard()

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(form)

  const data = {
    name: formData.get('recipeName'),
    ingridients: formData.get('ingredients'),
    instructions: formData.get('instructions'),
    category: formData.get('category'),
  }

  entries.push(data)

  localStorage.setItem('entriesRecipe', JSON.stringify(entries))

  form.reset()

  createCard()
})

function createCard() {
  clearHTML()

  const savedEntries = JSON.parse(localStorage.getItem('entriesRecipe')) || []

  console.log(savedEntries)

  savedEntries.forEach((entrie) => {
    const card = document.createElement('article')
    card.classList.add('card_recipes')

    const ingridientsFormat = entrie.ingridients.split('\n').join(', ')

    console.log(entrie.ingridients.split('\n'))

    card.innerHTML = `
      <h1 class="card_title">${entrie.name}</h1>
      <p class="card_ingridiensts">${ingridientsFormat}</p>
      <p class="card_instructions">${entrie.instructions}</p>
      <p class="card_category">${entrie.category}</p>
    `
    cards.appendChild(card)
  })
}

function clearHTML() {
  cards.innerHTML = ''
}
