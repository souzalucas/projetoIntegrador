import axios from 'axios'

//backend
const URL = 'http://localhost:8080'

const create = (nome, descricao) => {
	const url = `${URL}/areas`

	return axios.post(url, { nome, descricao }).then(response => response.data)
}

const findAll = () => {
	const url = `${URL}/areas`

	return axios.get(url).then(response => response.data)
}

const remove = (id) => {
	const url = `${URL}/areas/${id}`
	
	return axios.delete(url).then(response => response.data)
}

export {
	create,
	findAll,
	remove
}