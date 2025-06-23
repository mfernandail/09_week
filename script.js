const form = document.querySelector('.form')
const cards = document.getElementById('recipes')

let entries = JSON.parse(localStorage.getItem('entriesRecipe')) || []
let editRecipe = false
let editingId

createCard()

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(form)

  const data = {
    id: Date.now(),
    name: formData.get('recipeName'),
    ingridients: formData.get('ingridients'),
    instructions: formData.get('instructions'),
    category: formData.get('category'),
  }

  let entryEditAdd

  console.log(editingId)

  if (editingId) {
    entryEditAdd = entries.map((entry) =>
      entry.id === editingId ? data : entry
    )
  } else {
    entries.push(data)
    entryEditAdd = entries
  }

  localStorage.setItem('entriesRecipe', JSON.stringify(entryEditAdd))

  createCard()

  editingId = ''

  form.reset()
})

function createCard() {
  clearHTML()

  const savedentries = JSON.parse(localStorage.getItem('entriesRecipe')) || []

  savedentries.forEach((entry) => {
    const card = document.createElement('article')
    card.classList.add('card_recipes')

    //const ingridientsFormat = entry.ingridients.split('\n').join(', ')
    const ingridientsFormat = entry.ingridients
      .split('\n')
      .map((item) => `• ${item.trim()}`)
      .join('<br>')

    card.innerHTML = `
      <h1 class="card_title">${entry.name}</h1>
      <h2 class="card_ingridients_title">Ingrideients:</h2>
      <p class="card_ingridients">${ingridientsFormat}</p>
      <h2 class="card_ingridients_title">Instructions:</h2>
      <p class="card_instructions">${entry.instructions}</p>
      <p class="card_category">${entry.category}</p>
      <section class="card_btns">
        <button data-id=${entry.id} class="card_btn card_btn_delete">Delete</button>
        <button data-id=${entry.id} class="card_btn card_btn_edit">Edit</button>
      </section>
    `
    cards.appendChild(card)

    const deleteBtn = card.querySelector('.card_btn_delete')
    const editBtn = card.querySelector('.card_btn_edit')
    const id = parseInt(deleteBtn.dataset.id)

    deleteBtn.addEventListener('click', () => handleDelete(id))
    editBtn.addEventListener('click', () => handleEdit(id))
  })

  form.querySelector('#btn_submit').textContent = 'Add recipe'
}

function handleDelete(id) {
  const confirmMsg = confirm('Are you sure you want to delete this recipe?')

  if (confirmMsg) {
    const updateentries = entries.filter((entry) => entry.id !== id)
    localStorage.setItem('entriesRecipe', JSON.stringify(updateentries))
    entries = JSON.parse(localStorage.getItem('entriesRecipe'))
    createCard()
  }
}

function handleEdit(id) {
  editRecipe = true

  const entryToEdit = entries.find((entry) => entry.id === id)

  form.recipeName.value = entryToEdit.name
  form.ingridients.value = entryToEdit.ingridients
  form.instructions.value = entryToEdit.instructions
  form.category.value = entryToEdit.category

  form.querySelector('#btn_submit').textContent = 'Edit'

  console.log(editingId)

  editingId = id

  editRecipe = false
}

function clearHTML() {
  cards.innerHTML = ''
}