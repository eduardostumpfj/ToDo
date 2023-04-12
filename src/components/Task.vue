<template>
    <div class="-shadow--double bg-white relative rounded-lg min-h-[58px]" >
        <div class="grid -grid-cols-task gap-3 p-2 relative h-full">
            <!-- Buttons Container  -->
            <div class="relative h-full ml-0">
                <ColorButton :color="task.color" :canOpenColor="canOpenColor" :changeColor="changeColor"/>
            </div>
            <input 
                v-model="taskName"
                type="text"
                :disabled="isDisabled"
                class="border rounded-xl h-[80%] w-full m-auto px-2 border-dashed border-secondary-gray text-secondary-gray
                     disabled:bg-white disabled:border-white">
            <div class="m-auto" @click="activate" v-if="!canOpenColor"> ... </div>
            <button class="bg-main rounded-full -shadow-md border-2 border-white h-8 w-8 grid place-items-center m-auto" @click="updateItem" v-if="canOpenColor">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                    <rect x="8.50348" width="1.45949" height="8.21381" rx="0.729745" transform="rotate(45 8.50348 0)" fill="white"/>
                    <rect y="3.11255" width="1.44023" height="5.27143" rx="0.720116" transform="rotate(-45 0 3.11255)" fill="white"/>
                </svg>
            </button>
        </div>

        <div 
            v-if="isActive"
            class="-shadow--double rounded-lg absolute flex z-10 bg-white w-[calc(100%-1rem)] h-[calc(100%-1rem)] top-[calc(0px+.5rem)] left-[calc(0px+.5rem)] justify-between px-3">
                <button class="font-bold text-secondary-gray text-sm" @click="$emit( 'closeItem', task.id, taskName, taskColor )"> concluir tarefa </button>
                <button class="font-bold text-secondary-gray text-sm" @click="$emit( 'deleteItem', task.id )"> excluir </button>
                <button class="font-bold text-secondary-gray text-sm" @click="editTask"> editar  </button>
        </div>
    </div>
</template>

<script>
import ColorButton from './ColorButton.vue'
export default{
    components: { ColorButton },
    props: {
        updateTask: { type: Function},
        task: { type: Object },
    },
    data(){
        return {
            canOpenColor: false,
            taskColor: this.task.color,
            taskName:this.task.name,
            isActive : false,
            isDisabled:true,
            canSave: false,
        }
    },
    methods: {
        activate(){
            this.isActive = true
        },  
        editTask(){
            this.canOpenColor = true
            this.isDisabled = false
            this.isActive = false
            this.canSave = true
        },
        updateItem(){
            if(!this.canSave){ return }
            console.log(this.canOpenColor)
            this.isActive = false
            this.canOpenColor = false
            this.isDisabled = true
            this.updateTask(this.task.id, this.taskName,  this.taskColor)    
        },
        closeItem( id, newName, newColor ){
            this.$emit('closeItem', id, newName, newColor)
        },
        changeColor(color, value){
           color ? this.taskColor = color : null
           this.canSave = value
        }, 
        deleteItem( name ){
            this.$emit('deleteItem', name)
        },
    }
}
</script>

<style scoped>
.-grid-cols-task{
    grid-template-columns: 20px 1fr 40px;
}
.teste {
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}
.teste-filho{
    grid-column:1/2 ;
    grid-row: 1/2;
    display: flex;
    align-items: center;
    gap: 1rem;
}
.teste-bts{
    grid-column: 2/3;
}
.btss{
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: red;
    right: 0;
    top: 0;
    z-index: 20;

}
</style>