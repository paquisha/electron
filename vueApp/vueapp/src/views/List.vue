<template>
  <div>
    <md-button v-on:click="itemCreate" class="md-raised md-primary">Crear</md-button>
    <md-list class="md-elevation-2">
      <md-list-item v-for="(item, key) in items" v-bind:key="item.id">
        <md-icon class="md-accent">done</md-icon>
        <span class="md-list-item-text">{{ item.name }}</span>

        <md-button @click="itemUpdate(key)" class="md-icon-button md-list-action">
          <md-icon class="md-primary">create</md-icon>
          <md-tooltip md-direction="top">Editar: {{ item.name }}</md-tooltip>
        </md-button>

        <md-button @click="itemDelete(key)" class="md-icon-button md-list-action">
          <md-icon class="md-accent">delete</md-icon>
          <md-tooltip md-direction="top">Borrar</md-tooltip>
        </md-button>
      </md-list-item>
      <md-divider class="md-inset"></md-divider>
    </md-list>

    <md-button @click="itemCreate" class="md-fab md-plain md-primary md-fab-bottom-right">
      <md-icon>add</md-icon>
      <md-tooltip md-direction="top">Crear</md-tooltip>
    </md-button>

    <md-dialog-prompt
      :md-active.sync="showModal"
      v-model="task"
      md-title="Ingrese Tarea"
      md-input-maxlength="30"
      md-input-placeholder="Ingrese Tarea"
      md-confirm-text="Guardar"
      @md-confirm="saveTask"
    />
  </div>
</template>

<script>
//var { ipcRenderer } = require('electron')

export default {
  data: function() {
    return {
      items: [],
      itemsIndex: -1,
      showModal: false,
      task: ""
    };
  },
  created() {
    const { ipcRenderer } = window.require("electron");
    ipcRenderer.send("item-send");
    ipcRenderer.on("item-all", (event, data) => {
      this.items = data;
    });
  },
  methods: {
    itemCreate: function() {
      this.itemsIndex = -1;
      this.showModal = true;
    },
    saveTask() {

      if (this.task.trim() == "")
        return

      const { ipcRenderer } = window.require("electron");

      if (this.itemsIndex == -1){
        //this.items.push(this.task);
        ipcRenderer.send('item-save',this.task)
      }else{
        //this.items[this.itemsIndex] = this.task;
        ipcRenderer.send('item-update',this.items[this.itemsIndex].id, this.task)
      }
      ipcRenderer.send('item-send')
      this.task = "";
    },
    itemDelete(index) {
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.send('item-delete',this.items[index].id)
      this.items.splice(index, 1);
    },
    itemUpdate(index) {
      this.itemsIndex = index;
      this.showModal = true;
      this.task = this.items[this.itemsIndex].name;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>