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

Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})



Vue.component('modelstats', {
  props: ['model'],
  template: `<table>
 <tr>
   <td>Move</td>
   <td>WS</td>
   <td>BS</td>
   <td>S</td>
   <td>T</td>
   <td>W</td>
   <td>A</td>
   <td>LD</td>
   <td>SV</td>
   <td>INSV</td>
 </tr>
 <tr>
   <td>{{model.move}}</td>
   <td>{{model.ws}}</td>
   <td>{{model.bs}}</td>
   <td>{{model.strength}}</td>
   <td>{{model.toughness}}</td>
   <td>{{model.wounds}}</td>
   <td>{{model.attacks}}</td>
   <td>{{model.leadership}}</td>
   <td>{{model.save}}</td>
   <td>{{model.invulsave}}</td>
 </tr>
 </table>`
})

var builder = new Vue({
  el: '#builder',
  data: {
    armies:library,
    units:library.fallenangels.units,
    selected: 'inquisition',
    // army:armies[{{selected}}],
    // units:army.units,
  }
})

// var unitlist = new Vue({
//   el: '#unitlist',
//   data: {
//     // armies:library,
//     // army:library.fallenangels,
//     // units:library.fallenangels.units,
//     // ourmodel:library.fallenangels.units.cypher
//   }
// })

/*
<div class="chars">
  <div class="name">

  </div>
  <table cellpadding="0px" cellspacing="0px" width="100%" class="topborder">
    
  </table>
</div>
<div class="weapon">

</div>
<div class="abilities">

</div>
<div class="keywords">

</div>







 var table = $('<table />')
table.attr('cellpadding',"0px")
table.attr('cellspacing','0px')
table.attr('width','100%')
table.attr('class','topborder')
table.attr('id',rosterarr[i]+'-'+i+'-statstable')
$('#'+rosterarr[i]+'-'+i+'-chars').append(table)
var tr = $('<tr />');
var td1 = $('<td />',{class:'weapon-stats-header',text:'move"'})
var td2 = $('<td />',{class:'weapon-stats-header',text:'WS'})
var td3 = $('<td />',{class:'weapon-stats-header',text:'BS'})
// var td4 = $('<td />',{class:'weapon-stats-header smallstat',text:'S'})
var td4 = $('<td />',{class:'weapon-stats-header',text:'S'})
var td5 = $('<td />',{class:'weapon-stats-header smallstat',text:'T'})
var td6 = $('<td />',{class:'weapon-stats-header',text:'W'})
var td7 = $('<td />',{class:'weapon-stats-header',text:'A'})
var td8 = $('<td />',{class:'weapon-stats-header smallstat',text:'Ld'})
var td9 = $('<td />',{class:'weapon-stats-header',text:'Sv'})
var td10 = $('<td />',{class:'weapon-stats-header',text:'InvSv'})
var statsinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9).append(td10)
$('#'+rosterarr[i]+'-'+i+'-statstable').append(statsinfo)
var tr = $('<tr />');
var td1 = $('<td />',{class:'weapon-stats-text',text:move})
var td2 = $('<td />',{class:'weapon-stats-text',text:ws})
var td3 = $('<td />',{class:'weapon-stats-text',text:bs})
var td4 = $('<td />',{class:'weapon-stats-text smallstat',text:strength})
var td5 = $('<td />',{class:'weapon-stats-text smallstat',text:toughness})
var td6 = $('<td />',{class:'weapon-stats-text',text:wounds})
var td7 = $('<td />',{class:'weapon-stats-text',text:attacks})
var td8 = $('<td />',{class:'weapon-stats-text smallstat',text:leadership})
var td9 = $('<td />',{class:'weapon-stats-text',text:save})
var td10 = $('<td />',{class:'weapon-stats-text',text:invulsave})
var statsinfo = tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9).append(td10)
$('#'+rosterarr[i]+'-'+i+'-statstable').append(statsinfo)
*/






// // example 1
// var app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Привет, мир Vue!'
//   }
// })

// // example 2
// // v-bind
// var app2 = new Vue({
//   el: '#app-2',
//   data: {
//     message: 'Вы загрузили эту страницу в: ' + new Date().toLocaleString()
//   }
// })

// // example 3
// // v-if
// var app3 = new Vue({
//   el: '#app-3',
//   data: {
//     seen: true
//   }
// })

// // example 4
// // v-for
// var app4 = new Vue({
//   el: '#app-4',
//   data: {
//   	message: 'Дела на сегодня',
//     todos: [
//       { text: 'Изучить JavaScript' },
//       { text: 'Изучить Vue', color:'red'},
//       { text: 'Создать что-нибудь классное', color:'Skyblue' }
//     ]
//   }
// })

// // example 5
// // v-on
// var app5 = new Vue({
//   el: '#app-5',
//   data: {
//     message: 'Отзеркаленный текст становится музыкой.'
//   },
//   methods: {
//     reverseMessage: function () {
//       this.message = this.message.split('').reverse().join('')
//     }
//   }
// })

// // example 6
// // v-model
// var app6 = new Vue({
//   el: '#app-6',
//   data: {
//     message: 'Введенный вами текст!'
//   }
// })

// // todo list
// Vue.component('todo-item', {
//   template: '\
//     <li>\
//       {{ title }}\
//       <button v-on:click="$emit(\'remove\')">Удалить</button>\
//     </li>\
//   ',
//   props: ['title']
// })

// new Vue({
//   el: '#todo-list-example',
//   data: {
//     newTodoText: '',
//     todos: [
//       {
//         id: 1,
//         title: 'Помыть посуду'
//       },
//       {
//         id: 2,
//         title: 'Вынести мусор'
//       },
//       {
//         id: 3,
//         title: 'Подстричь газон'
//       }
//     ],
//     nextTodoId: 4
//   },
//   methods: {
//     addNewTodo: function () {
//       this.todos.push({
//         id: this.nextTodoId++,
//         title: this.newTodoText
//       })
//       this.newTodoText = ''
//     }
//   }
// })