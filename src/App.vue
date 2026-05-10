<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Produto from './models/Produto';
import http from './http';
import { AxiosError } from 'axios';

const produto = ref({} as Produto)
const lista = ref([] as Produto[])
const filtro = ref('')
const loading = ref(false)

async function carregaProdutos() {
  try {
    loading.value = true
    const response = await http.get('/produtos')
    lista.value = response.data
  } catch (error) {
    alert('Erro ao carregar produtos')
    console.log((<AxiosError>error).response?.data)
  } finally {
    loading.value = false
  }
}

async function cadastraProduto() {
  try {
    await http.post('/produtos', produto.value)
    alert('Produto cadastrado com sucesso')
    produto.value = {} as Produto
    await carregaProdutos()
  } catch (error) {
    alert('Erro ao cadastrar produto')
    console.log((<AxiosError>error).response?.data)
  }
}

async function excluirProduto(p: Produto) {
  await http.delete(`/produtos/${p.id}`)
  alert(`Produto ${p.nome} excluído com sucesso`)
  await carregaProdutos()
}

onMounted(carregaProdutos)

const listaFiltrada = computed(() => lista.value.filter(p => !filtro.value || p.nome.includes(filtro.value)))

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form @submit.prevent="cadastraProduto">
          <div class="mb-3">
            <label class="form-label">Nome</label>
            <input v-model="produto.nome" type="text" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Preço</label>
            <input v-model="produto.preco" type="number" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Quantidade</label>
            <input v-model="produto.quantidade" type="number" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary mb-3">
            Salvar
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <input type="text" placeholder="Filtro" v-model="filtro" class="form-control">
        </div>
        <div class="spinner-border text-success" role="status" v-show="loading">
          <span class="visually-hidden">Loading...</span>
        </div>
        <table class="table" v-show="!loading">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in listaFiltrada" :key="p.id">
              <td>{{ p.id }}</td>
              <td>{{ p.nome }}</td>
              <td>R$ {{ p.preco }}</td>
              <td>{{ p.quantidade }}</td>
              <td>
                <button @click="excluirProduto(p)" class="btn btn-danger">
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
