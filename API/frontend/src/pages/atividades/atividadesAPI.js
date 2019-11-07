import axios from 'axios'

//backend
const URL = 'http://localhost:8080'

const create = (nome, descricao) => {
	const url = `${URL}/atividades`

	return axios.post(url, { nome, descricao }).then(response => response.data)
}

const findAll = () => {
	const url = `${URL}/atividades`

	return axios.get(url).then(response => response.data)
}

const remove = (id) => {
	const url = `${URL}/atividades/${id}`
	
	return axios.delete(url).then(response => response.data)
}

const update = (id, nome, descricao) => {
	const url = `${URL}/atividades/${id}`
	
	return axios.put(url, { nome, descricao }).then(response => response.data)
}

export {
	create,
	findAll,
	remove,
	update
}