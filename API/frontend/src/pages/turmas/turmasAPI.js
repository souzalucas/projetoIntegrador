import axios from 'axios'

const URL = 'http://localhost:8080'

const create = (data, horario_inicio, horario_fim) => {
	const url = `${URL}/turmas`

	return axios.post(url, { data, horario_inicio, horario_fim }).then(response => response.data)
}

const findAll = () => {
	const url = `${URL}/turmas`

	return axios.get(url).then(response => response.data)
}

const remove = (id) => {
	const url = `${URL}/turmas/${id}`
	
	return axios.delete(url).then(response => response.data)
}

const update = (id, data, horario_inicio, horario_fim) => {
	const url = `${URL}/turmas/${id}`
	
	return axios.put(url, { data, horario_inicio, horario_fim }).then(response => response.data)
}

export {
	create,
	findAll,
	remove,
	update
}