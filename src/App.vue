<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form>
          <div class="mb-3">
            <label class="form-label">Nome</label>
            <input type="text" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Preço</label>
            <input type="number" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Quantidade</label>
            <input type="number" class="form-control">
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
            <tr>
              <td></td>
              <td></td>
              <td>R$ </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
