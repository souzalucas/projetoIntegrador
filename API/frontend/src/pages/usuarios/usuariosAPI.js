import axios from 'axios'

//backend
const URL = 'http://localhost:8080'
//data_nascimento,tipo
const create = (cpf,nome,telefone,sexo,profissao) => {
	const url = `${URL}/usuario`
	//data_nascimento,tipo
	return axios.post(url, { cpf, nome, telefone, sexo, profissao }).then(response => response.data)
}

const findAll = () => {
	const url = `${URL}/usuario`

	return axios.get(url).then(response => response.data)
}

const remove = (cpf) => {
	const url = `${URL}/usuario/${cpf}`
	
	return axios.delete(url).then(response => response.data)
}

const update = (cpf, nome, telefone, sexo, profissao) => {
	const url = `${URL}/usuario/${cpf}`
	
	return axios.put(url, { nome, telefone, sexo, profissao }).then(response => response.data)
}

export {
	create,
	findAll,
	remove,
	update,
}