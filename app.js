'use strict'

import { getContatos, getContato, postContato, putContato, deleteContato } from "./contatos.js"

let idAtual = null

async function salvarContato() {
    const contato = {
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        foto: document.getElementById("foto").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value
    }

    if (!contato.nome || !contato.telefone || !contato.foto || !contato.email || !contato.endereco || !contato.cidade) {
        alert("Informe todos os dados!")
    } else {
        if (idAtual == null) {
            await postContato(contato)
        } else {
            await putContato(idAtual, contato)
            idAtual = null
            document.getElementById('btn').textContent = 'Cadastrar'
        }

        limparCampos()
        await get()
    }
}

async function get() {
    const contatos = await getContatos()
    const linhas = await Promise.all(contatos.map(criarLinha))
    document.getElementById("tbody").replaceChildren(...linhas)
}

async function put(id) {
    const contato = await getContato(id)
    idAtual = contato.id

    document.getElementById('nome').value     = contato.nome
    document.getElementById('telefone').value = contato.telefone
    document.getElementById('foto').value     = contato.foto
    document.getElementById('email').value    = contato.email
    document.getElementById('endereco').value = contato.endereco
    document.getElementById('cidade').value   = contato.cidade

    document.getElementById('btn').textContent = "Atualizar"
}

async function del(id) {
    await deleteContato(id)
    await get()
}

function criarLinha(contato) {
    const tr = document.createElement("tr")

    const id = document.createElement("td")
    id.textContent = contato.id

    const nome = document.createElement("td")
    nome.textContent = contato.nome

    const telefone = document.createElement("td")
    telefone.textContent = contato.telefone

    const foto = document.createElement("td")
    const img = document.createElement("img")
    img.src = contato.foto
    foto.appendChild(img)

    const email = document.createElement("td")
    email.textContent = contato.email

    const endereco = document.createElement("td")
    endereco.textContent = contato.endereco

    const cidade = document.createElement("td")
    cidade.textContent = contato.cidade

    const botaoEditar = document.createElement("td")
    const editar = document.createElement("button")
    editar.classList.add("bt-editar")
    editar.addEventListener("click", () => put(contato.id))
    editar.textContent = "Editar"
    botaoEditar.appendChild(editar)

    const botaoExcluir = document.createElement("td")
    const excluir = document.createElement("button")
    excluir.classList.add("bt-excluir")
    excluir.addEventListener("click", () => del(contato.id))
    excluir.textContent = "Excluir"
    botaoExcluir.appendChild(excluir)

    tr.replaceChildren(id, nome, telefone, foto, email, endereco, cidade, botaoEditar, botaoExcluir)

    return tr
}

function limparCampos() {
    document.getElementById('nome').value     = ''
    document.getElementById('telefone').value = ''
    document.getElementById('foto').value     = ''
    document.getElementById('email').value    = ''
    document.getElementById('endereco').value = ''
    document.getElementById('cidade').value   = ''
}

document.getElementById('btn')
    .addEventListener("click", salvarContato)

document.addEventListener("DOMContentLoaded", get)