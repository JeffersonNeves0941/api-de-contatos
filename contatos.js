'use strict'

const url = "https://bakcend-fecaf-render.onrender.com/contatos"


export async function getContatos () {
    const response = await fetch(url)
    if(!response.ok) throw new Error("Erro ao buscar os contatos!")
    return response.json()
}


export async function getContato (id) {
    const response = await fetch(`${url}/${id}`)
    if(!response.ok) throw new Error(`Erro ao listar o contato ${id}`)
    return response.json()
}


export async function postContato (contato) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar um novo contato")
    return response.json()
}


export async function putContato (id, contato) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar Contato!")
    return response.json()
}


export async function deleteContato (id) {
    const options = {
        method: "DELETE"
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error(`Erro ao deletar o contato ${id}`)
    return response.json() 
}