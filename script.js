const btnAjouter = document.getElementById('Ajouter');
const modal = document.getElementById('modal');

btnAjouter.addEventListener('click', () => {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
});