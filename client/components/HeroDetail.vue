<template>
  <div class="editarea">
    <div>
      <div class="editfields">
        <div>
          <label>id: </label>
          <input v-if="addingHero" type="number" v-model="editingHero.id" ref="id" placeholder="id" />
          <label v-if="!addingHero" class="value">{{editingHero.id}}</label>
        </div>
        <div>
          <label>name: </label>
          <input v-model="editingHero.name" ref="name" placeholder="name" />
        </div>
        <div>
          <label>saying: </label>
          <input v-model="editingHero.saying" placeholder="saying" @keyup.enter="save"/>
        </div>
      </div>
      <button @click="clear">Cancel</button>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import Component from 'vue-class-component';
import { Component, Prop, Watch } from 'vue-property-decorator';

// The @Component decorator indicates the class is a Vue component
@Component({})
export default class HeroDetail extends Vue {
  @Prop() hero: { type: Object };
  addingHero = !this.hero;
  editingHero: {} | undefined = this.cloneIt();

  @Watch('hero')
  onHeroChanged(value: string, oldValue: string) {
    this.editingHero = this.cloneIt();
  }

  addHero() {
    let hero = this.editingHero;
    this.emitRefresh('add');
  }
  clear() {
    this.$emit('unselect');
    this.editingHero = undefined;
  }
  cloneIt() {
    return Object.assign({}, this.hero);
  }
  emitRefresh(mode) {
    this.$emit('heroChanged', { mode: mode, hero: this.editingHero });
    this.clear();
  }
  mounted() {
    if (this.addingHero && this.editingHero) {
      this.$refs.id.focus();
    } else {
      this.$refs.name.focus();
    }
  }
  save() {
    if (this.addingHero) {
      this.addHero();
    } else {
      this.updateHero();
    }
  }
  updateHero() {
    let hero = this.editingHero;
    this.emitRefresh('update');
  }

  $refs: {
    id: HTMLElement;
    name: HTMLElement;
  };
}
</script>

<style lang="scss" scoped>
.editarea {
  float: left;
  input {
    margin: 4px;
    height: 20px;
    color: rgb(0, 120, 215);
  }
  button {
    margin: 8px;
  }
  .editfields {
    margin-left: 12px;
  }
}
</style>
