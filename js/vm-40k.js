/*
Компоненты:
Армия
  -метод: посчитать очки всей армии
  Детачменты
  -метод: посчитать очки детачмента
    Отряд
    -метод: посчитать очки юнита
      Модель
      -данные: стоимость модели, доступное снаряжение
      -метод: посчитать очки модели

*/

// var model = {
//   name:'Cypher',
//   role:'HQ',
//   move:'7',
//   ws:'2+',
//   bs:'2+',
//   strength:'4',
//   toughness:'4',
//   wounds:'5',
//   degradate : ['5'],
//   attacks:'4',
//   leadership:'9',
//   save:'3+',
//   invulsave:'4+',
//   models : [1,1],
//   powerpoints:'6',
//   pointspermodel:'110',
//   weaponbasic : ['Basic melee','Frag grenade','Krak grenade','Cypher\'s bolt pistol','Cypher\'s plasma pistol'],
//   abilities : {
//     'Blazing weapons' : 'Cypher can use his pistols in your Shooting phase even if he has Advanced or Fallen Back in the same turn.',
//     'Lord Cypher' : 'You can re-roll hit rolls of 1 made for friendly FALLEN units within 6" of Cypher.',
//     'Mysterious Protection' : 'Cypher has a 4+ invulnerable save. In addition, roll a D6 if Cypher is slain, on roll of 2+, Cypher\'s model is still removed from play, but he is not considered to have been slain for the purposes of any mission victory conditions.',
//     'No-one\'s Puppet' : 'Cypher cannot use the Daemonic Ritual ability, even though he has the Chaos and Character keywords.',
//     },
//   factionkeywords : 'IMPERIUM, CHAOS, FALLEN',
//   keywords:'CHARACTER, INFANTRY, CYPHER',
// }

Vue.component('modelstats', {
  props: ['model'],
  template: `<table class="topborder" cellpadding="0px" cellspacing="0px">
 <tr>
   <td class="stats-header">Move</td>
   <td class="stats-header">WS</td>
   <td class="stats-header">BS</td>
   <td class="stats-header">S</td>
   <td class="stats-header">T</td>
   <td class="stats-header">W</td>
   <td class="stats-header">A</td>
   <td class="stats-header">LD</td>
   <td class="stats-header">SV</td>
   <td class="stats-header">INSV</td>
 </tr>
 <tr>
   <td  class="stats-text">{{model.move}}</td>
   <td  class="stats-text">{{model.ws}}</td>
   <td  class="stats-text">{{model.bs}}</td>
   <td  class="stats-text">{{model.strength}}</td>
   <td  class="stats-text">{{model.toughness}}</td>
   <td  class="stats-text">{{model.wounds}}</td>
   <td  class="stats-text">{{model.attacks}}</td>
   <td  class="stats-text">{{model.leadership}}</td>
   <td  class="stats-text">{{model.save}}</td>
   <td  class="stats-text">{{model.invulsave}}</td>
 </tr>
 </table>`
})

Vue.component('weaponstats', {
  props: ['weapon','weapons'],
  template: `<tr>
   <td  class="stats-text">{{weapon}}</td>
   <td  class="stats-text">{{weapons[weapon].range}}</td>
   <td  class="stats-text">{{weapons[weapon].type}}</td>
   <td  class="stats-text">{{weapons[weapon].strength}}</td>
   <td  class="stats-text">{{weapons[weapon].ap}}</td>
   <td  class="stats-text">{{weapons[weapon].damage}}</td>
   <td  class="stats-text">{{weapons[weapon].ability}}</td>
   <td  class="stats-text">{{weapons[weapon].points}}</td>
 </tr>`
})

Vue.component('modelabilities', {
  props: ['ability','abilitytext'],
  template: `<table class="topborder" cellpadding="0px" cellspacing="0px">
 <tr>
   <td class="abilityheader">{{ability}}</td>
   <td class="abilitytext">{{abilitytext}}</td>
 </tr>
 </table>`
})

Vue.component('modelkeywords', {
  props: ['model'],
  template: `<table class="topborder" cellpadding="0px" cellspacing="0px">
 <tr>
   <td class="abilityheader table-header">FACTION KEYWORDS</td>
   <td class="abilitytext">{{model.factionkeywords}}</td>
 </tr>
 <tr>
   <td class="abilityheader table-header">KEYWORDS</td>
   <td class="abilitytext">{{model.keywords}}</td>
 </tr>
 </table>`
})

var builder = new Vue({
  el: '#builder',
  data: {
    armies:library,
    // units:library.fallenangels.units,
    units:library.inquisition.units,
    selected: 'inquisition',
    army:Object,
    weapons:Object,
    abilities:Object,
    specialrules:Object,
    traits:Object,
    relics:Object,
    adaptation:Object,
    magic:Object,
    units:Object,
  },
  methods:{
    getArmy: function (){
      this.army = library[this.selected]
      // console.log('army')
      // console.log(this.army)
      // console.log('')
      // console.log('weapons')
      this.weapons = library[this.selected].weapons
      // console.log(this.weapons)
      // console.log('')
      // console.log('abilities')
      this.abilities = library[this.selected].abilities
      // console.log(this.abilities)
      // console.log('')
      // console.log('specialrules')
      this.specialrules = library[this.selected].specialrules
      // console.log(this.specialrules)
      // console.log('')
      // console.log('traits')
      this.traits = library[this.selected].traits
      // console.log(this.traits)
      // console.log('')
      // console.log('relics')
      this.relics = library[this.selected].relics
      // console.log(this.relics)
      // console.log('')
      // console.log('adaptation')
      this.adaptation = library[this.selected].adaptation
      // console.log(this.adaptation)
      // console.log('')
      // console.log('magic')
      this.magic = library[this.selected].magic
      // console.log(this.magic)
      // console.log('')
      // console.log('units')
      this.units = library[this.selected].units
      // console.log(this.units)
      // console.log('')
    },
  },
})