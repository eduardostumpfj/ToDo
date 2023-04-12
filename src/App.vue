<template>
  <div class="-shadow--lg -glass overflow-hidden rounded-2x w-full h-100svh grid grid-rows-[max-content_repeat(2,min-content)]">
    <section class="bg-main p-5 grid grid-cols-2 gap-y-4">
      <div class="font-bold text-white text-sm self-center">Lista de Tarefas</div>
      <div>
        <div class="text-xs text-white flex justify-between">
          <p>Tarefas Feitas</p>
          <p class="font-bold">{{ percentage }}%</p>
        </div>
        <div class="w-100 h-2 border border-white rounded-full overflow-hidden">
          <div 
            class="h-full bg-white"
            :style="{ width: `${percentage}%` }"
          ></div>
        </div>
      </div>
      
      <div class="col-span-2 grid grid-cols-[28px_1fr_40px] gap-2 p-2 relative">
        <!-- Buttons Container  -->
        <div class="relative h-full">
          <ColorButton
            :color="defaultColor"
            :changeColor="changeColor"
            :canOpenColor="canOpenColor"/>      
        </div>

        <input 
          v-model="taskName" 
          type="text" 
          placeholder="Nova tarefa"
          class="bg-main rounded-lg border border-white border-dashed text-center text-white placeholder-main-100"  
        >

        <button 
          @click="addNewTask"
          class="rounded-full border-2 border-white w-[42px] h-[42px] grid place-items-center"
          >         
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <rect x="7" width="2" height="15" rx="1" fill="white"/>
              <rect x="15.5" y="6.5" width="2" height="15" rx="1" transform="rotate(90 15.5 6.5)" fill="white"/>
            </svg>
        </button>

      </div>
    </section>

    <section class="p-5 flex flex-col gap-2">
      <div class="text-secondary-gray text-sm">Tarefas abertas</div>
      <Task v-for="task in openedTasks"
        :key="task.id"
        :changeColor="changeColor"
        :task="task"
        :updateTask="updateTask"
        @closeItem="closeTask"
        @deleteItem="deleteTask"
      />
    </section>

    <section class="p-5 flex flex-col gap-2">
      <div class="text-secondary-gray text-sm">Tarefas fechadas</div>
      <Task v-for="task in closedTasks"
        :key="task.id"
        :task="task"
        :changeColor="changeColor"
        :updateTask="updateTask"
        @handleTask="openTask"
        style="opacity:50%;"
      />
    </section>
  </div>
</template>

<script>
  import Task from './components/Task.vue'
  import ColorButton from './components/ColorButton.vue'
  export default{
    components:{ Task, ColorButton },
    data(){
      return{
        canOpenColor: true,
        defaultColor: '#9BEAD2',
        percentage: 0,
        taskName:'',
        taskColor:'',
        openedTasks :  [
          { id:'1234', name: 'tarefa1', color: '#9BEAD2'},
          { id:'1235', name: 'tarefa2', color: '#9BEAD2'},
          { id:'1236', name: 'tarefa3', color: '#9BEAD2'}
        ],
        closedTasks : [],
      }
    },
    methods: {
      addNewTask(){
        if(this.taskName === ''){
          return
        }
        const task = {}
        let tempList = [...this.openedTasks]
        task.id = `123${this.taskName}`
        task.name = this.taskName
        task.color = this.taskColor !== '' ? this.taskColor : this.defaultColor
        
        tempList.push(task)
        tempList = this.orderList(tempList)

        this.openedTasks = [...tempList]
        this.taskName = ''
        this.calcPercentage()        
      },
      updateTask(id, newName, newColor){
        this.openedTasks.forEach( e=> {
          if(e.id === id){
            e.name = newName
            e.color = newColor
          }
        })
      },
      closeTask(id, newName, newColor){ 
        this.updateTask(id, newName, newColor)
        let indexElement = null
        let tempList = [...this.closedTasks]
        // Colocar a tarefa nas fechadas
        this.openedTasks.forEach( (element, index) => {
          if(element.name === newName){
            tempList.push( element )
            indexElement = index
          }
        })
        // ordenar lista
        tempList = this.orderList(tempList)
        this.closedTasks = [...tempList]
        
        // Tirar a tarefa das abertas
        if(indexElement === 0){
          this.openedTasks.shift()
        } else if(indexElement > 0 ){
          this.openedTasks.splice(indexElement, 1)
        } 
        this.calcPercentage()
      },
      openTask(name){
        let indexElement = null
        let tempList = [...this.openedTasks]
        // Colocar a tarefa nas abertas
        this.closedTasks.forEach( (element, index) => {
          if(element.name === name){
            tempList.push( element )
            indexElement = index
          }
        })
        // ordernar Lista
        tempList = this.orderList( tempList )
        this.openedTasks = [...tempList]

        // Tirar a tarefa das abertas
        if(indexElement === 0){
          this.closedTasks.shift()
        } else if(indexElement > 0 ){
          this.closedTasks.splice(indexElement, 1)
        } 

        this.calcPercentage()
      },
      orderList( arr ){
        // Order by Color
        arr.sort( (a,b) => {
          if(a.color < b.color){ return -1}
          if(a.color > b.color){ return 1}
          return 0
        })      
        return arr
      },
      calcPercentage(){
        const total = this.openedTasks.length + this.closedTasks.length
        total < 1 ? this.percentage = 0 : this.percentage = ((this.closedTasks.length / total) * 100).toFixed() 
      },
      deleteTask(name){
        let indexElement
        this.openedTasks.forEach( (e, i)=> {
          e.name === name ? indexElement = i : null
        })
        this.openedTasks.splice(indexElement, 1)
        this.calcPercentage()
      },
      changeColor(color){
        if(color){
          this.taskColor = color
        }
      }
    }

  }
</script>