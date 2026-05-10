<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Produto from './models/Produto';
import http from './http';

const produto = ref({} as Produto)

const lista = ref([] as Produto[])

async function carregaProdutos() {
  const response = await http.get('/produtos')
  lista.value = response.data
}

async function cadastraProduto() {
  await http.post('/produtos', produto.value)
  alert('Produto cadastrado com sucesso')
  produto.value = {} as Produto
  await carregaProdutos()
}

onMounted(carregaProdutos)

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
          <button type="submit" class="btn btn-primary">
            Salvar
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in lista" :key="p.id">
              <td>{{ p.id }}</td>
              <td>{{ p.nome }}</td>
              <td>R$ {{ p.preco }}</td>
              <td>{{ p.quantidade }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
