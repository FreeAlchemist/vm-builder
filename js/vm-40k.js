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
   <td class="stats-header w-100">Move</td>
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

// Vue.component('weaponheader', {
//   template: `   <div class="h-25">         
//                <span class="stats-header float-left">weapon</span>
//                <span class="stats-header float-left">rng</span>
//                <span class="stats-header float-left">type</span>
//                <span class="stats-header float-left">S</span>
//                <span class="stats-header float-left">AP</span>
//                <span class="stats-header float-left">dmg</span>
//                <span class="stats-header float-left">Ability</span>
//                <span class="stats-header float-left">pts</span>
//              </div>`
// })

// Vue.component('weaponstats', {
//   props: ['weapon','weapons'],
//   template: `<div class="h-25">
//    <span  class="stats-text  float-left">{{weapon}}</span>
//    <span  class="stats-text  float-left">{{weapons[weapon].range}}</span>
//    <span  class="stats-text  float-left">{{weapons[weapon].type}}</span>
//    <span  class="stats-text  float-left">{{weapons[weapon].strength}}</span>
//    <span  class="stats-text  float-left">{{weapons[weapon].ap}}</span>
//    <span  class="stats-text  float-left">{{weapons[weapon].damage}}</span>
//    <span  class="stats-text  float-left">{{weapons[weapon].ability}}</span>
//    <span  class="stats-text  float-left">{{weapons[weapon].points}}</span>
//  </div>`
// })

Vue.component('weaponheader', {
  template: `            <tr>
               <td class="stats-header w-100">weapon</td>
               <td class="stats-header w-30">rng</td>
               <td class="stats-header w-45">type</td>
               <td class="stats-header w-20">S</td>
               <td class="stats-header">AP</td>
               <td class="stats-header">dmg</td>
               <td class="stats-header w-430">Ability</td>
               <td class="stats-header">pts</td>
             </tr>`
})

Vue.component('weaponstats', {
  props: ['weapon','weapons','modelname'],
  template: `<tr>
   <td  class="stats-text">{{weapon}}</td>
   <td  class="stats-text">{{weapons[weapon].range}}</td>
   <td  class="stats-text">{{weapons[weapon].type}}</td>
   <td  class="stats-text">{{weapons[weapon].strength}}</td>
   <td  class="stats-text">{{weapons[weapon].ap}}</td>
   <td  class="stats-text">{{weapons[weapon].damage}}</td>
   <td  class="stats-text">{{weapons[weapon].ability}}</td>
   <td  class="stats-text">{{weapons[weapon].points}}</td>
   <modelinput v-bind:name="modelname+'-'+weapon" v-bind:value="1"></modelinput>
 </tr>`
})

Vue.component('modelinput', {
  data:function(){
    return{
      modelnum:'1',
      // pts:pts,
    }
  },
  props: ['model','weapon','weapons','pts'],
  template: `<span><input v-model="modelnum" class="modelnum noprint" type="number" min="0" max="10" value="5"></input><span class="modelpts noprint">{{modelnum}}|{{ptsUnit}}|{{pts}}</span></span>`,
  computed:{
    ptsUnit:function(){
      return parseInt(this.modelnum)*parseInt(2)
    }
  }
  // methods:{
  //   getPoints: function (){
  //     this.army = library[this.selected]
  //   },
  // },
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
    units:library.fallenangels.units,
    selected: 'fallenangels',
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
      this.weapons = library[this.selected].weapons
      this.abilities = library[this.selected].abilities
      this.specialrules = library[this.selected].specialrules
      this.traits = library[this.selected].traits
      this.relics = library[this.selected].relics
      this.adaptation = library[this.selected].adaptation
      this.magic = library[this.selected].magic
      this.units = library[this.selected].units
    },
  },
})



/*
https://ru.vuejs.org/v2/guide/forms.html
http://css3generator.com/
https://www.alt-codes.net/arrow_alt_codes.php
https://habr.com/company/mailru/blog/273267/
http://jquery.com/
http://php.net/manual/en/
https://htmlweb.ru/php/example/download.php
http://www.w3schools.com/xml/xml_elements.asp
http://www.artlebedev.ru/tools/decoder/
https://regex101.com/
http://xmlhttprequest.ru/
https://webref.ru/html
https://html5book.ru/css3-animation/
http://sass-lang.com/documentation/file.SASS_REFERENCE.html
*/