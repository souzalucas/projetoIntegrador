import axios from 'axios'

//backend
const URL = 'http://localhost:8080'
//data_nascimento,tipo
const create = (cpf,nome,telefone,data_nascimento,sexo) => {
	const url = `${URL}/aluno`
	//data_nascimento,tipo
	return axios.post(url, { cpf, nome, telefone,data_nascimento ,sexo }).then(response => response.data)
}

const findAll = () => {
	const url = `${URL}/aluno`

	return axios.get(url).then(response => response.data)
}

const remove = (cpf) => {
	const url = `${URL}/aluno/${cpf}`
	
	return axios.delete(url).then(response => response.data)
}

const update = (cpf, nome, telefone,data_nascimento, sexo) => {
	const url = `${URL}/aluno/${cpf}`
	
	return axios.put(url, { nome, telefone,data_nascimento, sexo }).then(response => response.data)
}

export {
	create,
	findAll,
	remove,
	update,
}