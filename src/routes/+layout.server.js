export const csr = true;

export const load = async ({ fetch }) => {
  const res = await fetch('https://script.google.com/macros/s/AKfycbyI1zS_-2zAga9_KQ-EiRUEr9mvA0l-WFixe8sPD1HzpGl42xCC7N45gZMPhDjf-zS8ew/exec?api=json')
  const json = await res.json()

  return { trans: json }
}